from uuid import UUID

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from ..db.models import OAuthAccount, User
from ..schemas.user_req import UserRequest


# INSERT user
async def get_user_by_google_id(google_id: str, session: AsyncSession):

    statement = select(User).where(User.google_id == google_id)
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

    return new_user.user_id


# CREATE oauth_account
async def create_new_oauth_account(
    new_user_id: UUID,
    provider_name: str,
    google_id: str,
    new_access_token: str,
    session: AsyncSession,
):
    new_oauth_account = OAuthAccount(
        user_id=new_user_id,
        provider=provider_name,
        provider_id=google_id,
        access_token=new_access_token,
    )

    session.add(new_oauth_account)
    await session.commit()
    await session.refresh(new_oauth_account)

    return new_oauth_account


# UPDATE oauth_account
async def update_oauth_account(
    google_id: str,
    access_token: str,
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

    await session.commit()
    await session.refresh(oauth_account)

    return oauth_account
