from collections.abc import AsyncGenerator

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncEngine, async_sessionmaker, create_async_engine
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession

from ..config.settings import settings

#  creating async engine
async_engine: AsyncEngine = create_async_engine(
    settings.DB_URL,
    echo=True,  # set False in production
    pool_timeout=30,
    pool_pre_ping=True,  # Detect and handle idle pool disconnects
)

async_session_maker = async_sessionmaker(
    async_engine,
    class_=AsyncSession,
    autoflush=False,
    expire_on_commit=False,
)


# Async session generator (useful for FastAPI dependency injection)
async def get_session_db() -> AsyncGenerator[AsyncSession, None]:
    """
    create the DB session connection
    """
    async with async_session_maker() as session:
        try:
            yield session
        except SQLAlchemyError as err:
            session.rollback()
            print(err)
        finally:
            await session.close()


# async helper to create table's [while starting the app]
async def create_db_tables():
    async with async_engine.begin() as async_connection:
        await async_connection.run_sync(SQLModel.metadata.create_all)
