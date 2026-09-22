from fastapi import APIRouter, Request

from ..core.settings import settings
from ..services.auth_services import authenticate_user
from ..utils.auth import oauth_client

router = APIRouter()


@router.get("/login")
async def login(request: Request):
    """
    endpoints for logging in and authenticating users\n
    redirect user to google oauth endpoint.
    """

    request.session.clear()

    frontend_redirect_url = settings.FRONTEND_REDIRECT_UR
    auth_redirect_url = settings.AUTH_REDIRECT_URL

    request.session["login_redirect"] = frontend_redirect_url

    return await oauth_client.google_auth.authorize_redirect(
        request, auth_redirect_url, prompt="consent"
    )


@router.route("/auth/callback")
async def auth(request: Request):
    """
    endpoint for authenticate user based on token\n
    get token -> validate -> create access token -> extract user info -> store in db -> redict user url
    """
    res = await authenticate_user(req=request)
    return res
