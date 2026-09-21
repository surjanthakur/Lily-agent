from datetime import timedelta

import httpx
from fastapi import Depends, HTTPException, Request, status
from fastapi.responses import RedirectResponse
from jose import JWTError
from sqlmodel.ext.asyncio.session import AsyncSession

from ..repository.auth_repo import create_new_user, get_user_by_google_id
from ..schemas.user_req import UserRequest
from ..utils.auth import create_access_token, oauth_client
from ..utils.get_db_session import get_db_session


async def authenticate_user(
    req: Request,
    db_session: AsyncSession = Depends(get_db_session),  # noqa: B008
):
    try:
        token: dict = await oauth_client.google_auth.authorize_access_token(req)

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google authentication failed.",
        )

    try:
        user_info_endpoint = "https://www.googleapis.com/oauth2/v2/userinfo"

        headers = {"Authorization": f"Bearer {token['access_token']}"}

        async with httpx.AsyncClient() as client:
            google_response = await client.get(user_info_endpoint, headers=headers)

        user_info: dict = google_response.json()

    except Exception:  # noqa: BLE001
        raise HTTPException(status_code=401, detail="Google authentication failed.")

    user: dict = token.get("userinfo")

    expires_in = token.get("expires_in")
    user_google_id = user.get("sub")
    iss = user.get("iss")
    user_email = user.get("email")

    user_name = user_info.get("name")
    user_pic = user_info.get("picture")

    # Verifies that the token was actually issued by Google
    if iss not in ["https://accounts.google.com", "accounts.google.com"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google authentication failed.",
        )

    if user_google_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google authentication failed.",
        )

    existing_user = await get_user_by_google_id(
        google_id=user_google_id, session=db_session
    )

    if existing_user:
        # update the  existing oauth account: access_token , expirey date
        # create new session
        pass
    else:

        new_user = UserRequest(
            username=user_name,
            google_id=user_google_id,
            email_id=user_email,
            profile_picture=user_pic,
        )
        await create_new_user(new_user, db_session)
        access_token_expires = timedelta(seconds=expires_in)

        # Creates a JWT token containing the user's ID and email
        access_token = create_access_token(
            data={"sub": user_google_id, "email": user_email},
            expires_delta=access_token_expires,
        )

        redirect_url = req.session.pop("login_redirect", "")
        response = RedirectResponse(
            redirect_url, status_code=status.HTTP_307_TEMPORARY_REDIRECT
        )
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,  # Ensure you're using HTTPS
            samesite="none",  # Set the SameSite attribute to None
        )
        return response
