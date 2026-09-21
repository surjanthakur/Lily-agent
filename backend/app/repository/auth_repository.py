from datetime import datetime
from uuid import UUID

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from ..db.models import OAuthAccount, Session, User
from ..schemas.user_req import UserRequest


async def get_user_by_google_id(google_id: str, session: AsyncSession):

    statement = select(User).where(User.google_id == google_id)
    result = await session.exec(statement)

    return result.one_or_none()


async def update_oauth_account(
    google_id: str,
    access_token: str,
    expires_at: datetime,
    session: AsyncSession,
):
    statement = (
        select(OAuthAccount)
        .join(User, OAuthAccount.user_id == User.user_id)
        .where(User.google_id == google_id)
    )
    result = await session.exec(statement)
    oauth_account = result.one_or_none()

    if not oauth_account:
        return

    oauth_account.access_token = access_token
    oauth_account.expires_at = expires_at

    await session.commit()
    await session.refresh(oauth_account)

    return oauth_account


async def create_new_user(user: UserRequest, session: AsyncSession):
    new_user = User(
        google_id=user.google_id,
        email_id=user.email_id,
        username=user.username,
        profile_picture=user.profile_picture,
    )

    session.add(new_user)
    await session.commit(new_user)
    await session.refresh(new_user)

    return new_user


async def create_new_session(
    session: AsyncSession,
    user_id: UUID,
    expiry_date: datetime,
):
    new_session = Session(user_id=user_id, expires_at=expiry_date)
    session.add(new_session)
    await session.commit(new_session)
    await session.refresh(new_session)

    return new_session


async def create_new_oauth_account(
    session: AsyncSession,
    user_id: UUID,
    provider: str,
    google_id: str,
    access_token: str,
    expiry_date: datetime,
):
    new_oauth_account = OAuthAccount(
        user_id=user_id,
        provider=provider,
        provider_user_id=google_id,
        access_token=access_token,
        expires_at=expiry_date,
    )

    session.add(new_oauth_account)
    await session.commit(new_oauth_account)
    await session.refresh(new_oauth_account)

    return new_oauth_account
