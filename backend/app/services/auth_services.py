import uuid
from datetime import datetime, timedelta

import httpx
from fastapi import HTTPException, Request, status
from fastapi.responses import RedirectResponse
from jose import JWTError

from ..utils.auth import create_access_token, oauth_client


async def authenticate_user(req: Request):
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
    google_user_id = user.get("sub")
    iss = user.get("iss")
    user_email = user.get("email")
    first_logged_in = datetime.now(datetime.timetz())
    last_accessed = datetime.now(datetime.timetz())

    user_name = user_info.get("name")
    user_pic = user_info.get("picture")

    # Verifies that the token was actually issued by Google
    if iss not in ["https://accounts.google.com", "accounts.google.com"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google authentication failed.",
        )

    if google_user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google authentication failed.",
        )

    access_token_expires = timedelta(seconds=expires_in)

    # Creates a JWT token containing the user's ID and email
    access_token = create_access_token(
        data={"sub": google_user_id, "email": user_email},
        expires_delta=access_token_expires,
    )

    session_id = str(uuid.uuid4())

    # add user in db here

    redirect_url = req.session.pop("login_redirect", "")
    response = RedirectResponse(redirect_url)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,  # Ensure you're using HTTPS
        samesite="none",  # Set the SameSite attribute to None
    )

    return response
