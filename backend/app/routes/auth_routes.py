from fastapi import APIRouter, Depends, Request
from sqlmodel.ext.asyncio.session import AsyncSession

from ..core.settings import settings
from ..services.auth_services import authenticate_user
from ..utils.auth import oauth_client
from ..utils.get_db_session import get_db_session

router = APIRouter()


@router.get("/login")
async def login(request: Request):
    """
    endpoints for logging in and authenticating users\n
    redirect user to google oauth endpoint.
    """

    request.session.clear()

    frontend_redirect_url = settings.FRONTEND_REDIRECT_URL
    auth_redirect_url = settings.AUTH_REDIRECT_URL

    request.session["login_redirect"] = frontend_redirect_url

    return await oauth_client.google_auth.authorize_redirect(
        request, auth_redirect_url, prompt="consent"
    )


@router.get("/auth/callback")
async def auth(
    request: Request,
    db_session: AsyncSession = Depends(get_db_session),  # noqa: B008
):
    """
    endpoint for authenticate user based on token\n
    get token -> validate -> create access token -> extract user info -> store in db -> redict user url
    """
    res = await authenticate_user(req=request, db_session=db_session)
    return res
