from datetime import timedelta

import httpx
from fastapi import HTTPException, Request, status
from fastapi.responses import RedirectResponse
from jose import JWTError
from sqlmodel.ext.asyncio.session import AsyncSession

from ..core.logginig import get_logger
from ..repository.auth_repository import (
    create_new_oauth_account,
    create_new_session,
    create_new_user,
    get_user_by_google_id,
    update_oauth_account,
)
from ..schemas.user_req import UserRequest
from ..utils.auth import create_access_token, oauth_client

logger = get_logger(__name__)


async def authenticate_user(
    req: Request,
    db_session: AsyncSession,
):
    try:
        logger.info("authorizing access_token from request...")
        token_info: dict = await oauth_client.google_auth.authorize_access_token(req)

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google authentication failed.",
        )

    try:
        user_info_endpoint = "https://www.googleapis.com/oauth2/v2/userinfo"

        headers = {"Authorization": f"Bearer {token_info['access_token']}"}

        async with httpx.AsyncClient() as client:
            logger.info("getting info from google with autorizing user acess_token")
            google_response = await client.get(user_info_endpoint, headers=headers)

        user_info: dict = google_response.json()
        logger.info("extracted user info successfully")

    except Exception:  # noqa: BLE001
        raise HTTPException(status_code=401, detail="Google authentication failed.")

    user: dict = token_info.get("userinfo")
    user_google_id = user.get("sub")
    oauth_provider = user.get("iss")
    user_email = user.get("email")

    user_name = user_info.get("name")
    user_pic = user_info.get("picture")
    access_token_expiry = timedelta(minutes=60)

    # Verifies that the token was actually issued by Google
    if oauth_provider not in ["https://accounts.google.com", "accounts.google.com"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google authentication failed.",
        )

    if user_google_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google authentication failed.",
        )

    # Creates a JWT token containing the user's ID and email
    new_access_token = create_access_token(
        data={"sub": user_google_id, "email": user_email},
        expires_delta=access_token_expiry,
    )

    existing_user = await get_user_by_google_id(
        google_id=user_google_id, session=db_session
    )

    if existing_user:

        # update the  existing oauth account
        logger.info("updating oauth account...")
        await update_oauth_account(
            google_id=user_google_id,
            access_token=new_access_token,
            expires_at=access_token_expiry,
            session=db_session,
        )

    else:

        new_user = UserRequest(
            username=user_name,
            google_id=user_google_id,
            email_id=user_email,
            profile_picture=user_pic,
        )
        logger.info("creating new user...")
        user_id = await create_new_user(new_user, db_session)

        # create new oauth account in db
        logger.info("creating new oauth account")
        await create_new_oauth_account(
            user_id=user_id,
            provider=oauth_provider,
            google_id=user_google_id,
            access_token=new_access_token,
            expiry_date=access_token_expiry,
            session=db_session,
        )

    # create new session in db
    logger.info("creating new session..")
    new_session_id = await create_new_session(
        user_id=user_id,
        expiry_date=access_token_expiry,
        session=db_session,
    )

    redirect_url = req.session.pop("login_redirect", "")
    logger.info("redirecting to the frontend redirect url...")
    response = RedirectResponse(
        redirect_url, status_code=status.HTTP_307_TEMPORARY_REDIRECT
    )

    # return cookie
    logger.info("setting cookies...")
    response.set_cookie(
        key="session_id",
        value=new_session_id,
        httponly=True,
        secure=True,  # Ensure you're using HTTPS
        samesite="none",  # Set the SameSite attribute to None
    )
    return response
