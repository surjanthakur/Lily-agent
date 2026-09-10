from collections.abc import AsyncGenerator

from sqlalchemy.exc import (
    DatabaseError,
    DisconnectionError,
    IntegrityError,
    OperationalError,
    ProgrammingError,
    SQLAlchemyError,
    TimeoutError,
)
from sqlalchemy.ext.asyncio import AsyncEngine, async_sessionmaker, create_async_engine
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession

from ..core.logginig import get_logger
from ..core.settings import settings

logger = get_logger(__name__)


# --------------------------------------------------
# 1. Async Engine
# --------------------------------------------------

async_engine: AsyncEngine = create_async_engine(
    settings.DB_URL,
    echo=True,  # set False in production
    pool_size=10,
    max_overflow=20,
    pool_timeout=30,
    pool_pre_ping=True,  # Detect and handle idle pool disconnects
)


# --------------------------------------------------
# 2. Async Session Maker
# --------------------------------------------------

async_session_maker = async_sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    autoflush=False,
    expire_on_commit=False,
)


# --------------------------------------------------
# 3. FastAPI DB Dependency
# --------------------------------------------------


async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    """
    ### SQLAlchemy Connection Pool:
    - existing idle connection ──► reuse.
    - no available connection ──► create one
    """

    async with async_session_maker() as session:
        try:
            # open and pause the session conn
            yield session

        except (IntegrityError, OperationalError, ProgrammingError) as err:
            await session.rollback()
            logger.warning("database operation failed: %s", err)
            raise

        except DatabaseError as err:
            await session.rollback()
            logger.warning("database error: %s", err)
            raise

        except DisconnectionError as err:
            await session.rollback()
            logger.warning("database connection lost: %s", err)
            raise

        except TimeoutError as err:
            await session.rollback()
            logger.warning("database operation timed out: %s", err)
            raise

        except SQLAlchemyError as err:
            await session.rollback()
            logger.warning("SQLAlchemy error: %s", err)
            raise

        finally:
            await session.close()
            logger.info("session closed now!!")


# --------------------------------------------------
# 4. Create Tables
# --------------------------------------------------


async def create_db_tables():
    try:

        async with async_engine.begin() as conn:
            await conn.run_sync(SQLModel.metadata.create_all)

    except DatabaseError:
        logger.exception("Database error while creating tables")
        raise

    except SQLAlchemyError:
        logger.exception("SQLAlchemy error while creating tables")
        raise

    except Exception:
        logger.exception("Unexpected error while creating database tables")
        raise

    else:
        logger.info("Database tables created successfully")
