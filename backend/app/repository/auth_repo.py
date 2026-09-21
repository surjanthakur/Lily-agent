from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from ..db.models import User
from ..schemas.user_req import UserRequest


async def get_user_by_google_id(google_id: str, session: AsyncSession):

    statement = select(User).where(User.google_id == google_id)
    result = await session.exec(statement)

    return result.one_or_none()


async def insert_user(user: UserRequest, session: AsyncSession):
    new_user = User(
        google_id=user.google_id,
        email_id=user.email_id,
        username=user.username,
        profile_picture=user.profile_picture,
    )

    session.add(new_user)
    await session.commit(new_user)
    await session.refresh(new_user)

    return new_user.username
