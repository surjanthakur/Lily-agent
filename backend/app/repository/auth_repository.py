from uuid import UUID

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from ..db.models import OAuthAccount, User
from ..schemas.user_req import UserRequest


# FIND user
async def get_user_by_google_id(google_id: str, session: AsyncSession):
    statement = select(User).where(User.google_id == google_id)
    result = await session.exec(statement)

    return result.one_or_none()


async def get_user_by_user_id(user_id: UUID, session: AsyncSession):
    statement = select(User).where(User.user_id == user_id)
    result = await session.exec(statement)

    return result.one_or_none()


# CREATE user
async def create_new_user(user: UserRequest, session: AsyncSession):
    new_user = User(
        google_id=user.google_id,
        email_id=user.email_id,
        username=user.username,
        profile_picture=user.profile_picture,
    )

    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)

    return new_user


# CREATE oauth_account
async def create_new_oauth_account(
    new_user_id: UUID,
    provider_name: str,
    google_id: str,
    session: AsyncSession,
):
    new_oauth_account = OAuthAccount(
        user_id=new_user_id,
        provider=provider_name,
        provider_id=google_id,
    )

    session.add(new_oauth_account)
    await session.commit()
    await session.refresh(new_oauth_account)

    return new_oauth_account
