import traceback
from datetime import datetime, timedelta

from authlib.integrations.starlette_client import OAuth
from fastapi import Cookie, HTTPException, status
from jose import ExpiredSignatureError, JWTError, jwt

from ..core.settings import settings

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
    redirect_uri="http://127.0.0.1:8000/auth",
    jwks_uri="https://www.googleapis.com/oauth2/v3/certs",
    client_kwargs={"scope": "openid profile email"},
)


# JWT Configurations
SECRET_KEY = settings.JWT_SECRET_KEY

# encoding and decoding jwt token
ALGORITHM = "HS256"


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    "return a jwt string"

    to_encode = data.copy()

    expiry_time = datetime.now(datetime.timetz()) + (
        expires_delta or timedelta(minutes=30)
    )

    to_encode.update({"exp": expiry_time})

    jwt_token_str = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return jwt_token_str


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
