import httpx
from fastapi import HTTPException, Request, status
from jose import JWTError
from sqlmodel.ext.asyncio.session import AsyncSession

from ..core.logginig import get_logger
from ..repository.auth_repository import (
    create_new_oauth_account,
    create_new_user,
    get_user_by_google_id,
)
from ..schemas.user_req import UserRequest
from ..utils.auth import create_auth_response, create_session, oauth_client

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
            google_response.raise_for_status()

        user_info: dict = google_response.json()
        logger.info("extracted user info successfully")

    except httpx.HTTPError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Failed to retrieve Google user information.",
        )

    user: dict = token_info.get("userinfo")

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google authentication failed.",
        )
    user_google_id = user.get("sub")
    oauth_provider = user.get("iss")
    user_email = user.get("email")

    user_name = user_info.get("name")
    user_pic = user_info.get("picture")

    # Verifies that the token was actually issued by Google
    if (
        oauth_provider not in ["https://accounts.google.com", "accounts.google.com"]
        and not user_google_id
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google user information.",
        )

    existing_user = await get_user_by_google_id(
        google_id=user_google_id, session=db_session
    )

    if not existing_user:
        new_user = UserRequest(
            username=user_name,
            google_id=user_google_id,
            email_id=user_email,
            profile_picture=user_pic,
        )
        logger.info("creating new user...")

        new_user = await create_new_user(new_user, db_session)

        # create new oauth account in db
        logger.info("creating new oauth account...")
        await create_new_oauth_account(
            new_user_id=new_user.user_id,
            provider_name="google",
            google_id=user_google_id,
            session=db_session,
        )
        # create new session
        logger.info("creating new session..")

        new_session_id = await create_session(user_id=new_user.user_id)

        redirect_url = req.session.pop("login_redirect", "")

        res = create_auth_response(redirect_url, new_session_id)
        return res

    else:
        new_session_id = await create_session(user_id=existing_user.user_id)
        redirect_url = req.session.pop("login_redirect", "")
        res = create_auth_response(redirect_url, new_session_id)
        return res
