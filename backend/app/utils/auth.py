import traceback
import uuid
from datetime import timedelta

from authlib.integrations.starlette_client import OAuth
from fastapi import Cookie, HTTPException, status
from fastapi.responses import RedirectResponse
from jose import ExpiredSignatureError, JWTError, jwt

from ..core.logginig import get_logger
from ..core.settings import settings
from ..db.redis_db import redis_client

logger = get_logger(__name__)

# OAuth Setup
oauth_client = OAuth()

oauth_client.register(
    name="google_auth",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorize_params=None,
    access_token_url="https://accounts.google.com/o/oauth2/token",
    access_token_params=None,
    refresh_token_url=None,
    authorize_state=settings.JWT_SECRET_KEY,
    redirect_uri=settings.AUTH_REDIRECT_URL,
    jwks_uri="https://www.googleapis.com/oauth2/v3/certs",
    client_kwargs={"scope": "openid profile email"},
)


# JWT Configurations
SECRET_KEY = settings.JWT_SECRET_KEY
SESSION_EXPIRY = timedelta(minutes=1440)

# encoding and decoding jwt token
ALGORITHM = "HS256"


async def create_session(user_id: str, expiry_time: timedelta):
    session_id = str(uuid.uuid4())
    await redis_client.set(
        name=f"session:{session_id}",
        value=user_id,
        ex=SESSION_EXPIRY,
    )

    return session_id


def create_auth_response(
    redirect_url: str,
    session_id: str,
) -> RedirectResponse:
    response = RedirectResponse(
        redirect_url,
        status_code=status.HTTP_307_TEMPORARY_REDIRECT,
    )

    response.set_cookie(
        key="session_id",
        value=session_id,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=SESSION_EXPIRY,
    )

    return response


def get_current_user(token: str = Cookie(None)):
    "validate current user with token if token return dict data"

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated yet!"
        )

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        user_google_id: str = payload.get("sub")
        user_email: str = payload.get("email")

        if user_google_id is None or user_email is None:
            raise credentials_exception

        return {"user_id": user_google_id, "user_email": user_email}

    except ExpiredSignatureError:
        # Specifically handle expired tokens
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired. Please login again.",
        )

    except JWTError:
        # Handle other JWT-related errors
        traceback.print_exc()
        raise credentials_exception

    except Exception:  # noqa: BLE001
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated"
        )
