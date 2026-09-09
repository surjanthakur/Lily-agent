from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession

from ..config.settings import settings

#  creating async engine
create_engine = create_async_engine(
    url=settings.db_url,
    echo=True,  # set False in production
    pool_pre_ping=True,  # Detect and handle idle pool disconnects
)


# Async session generator (useful for FastAPI dependency injection)
async def get_session_db() -> AsyncGenerator[AsyncSession, None]:
    """
    create the DB session connection
    """
    async_session = sessionmaker(
        create_engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )
    async with async_session as session_connection:
        yield session_connection


# async helper to create table's [while starting the app]
async def create_db_tables():
    async with create_engine.begin() as async_connection:
        await async_connection.run_sync(SQLModel.metadata.create_all)
