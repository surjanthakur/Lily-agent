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
from sqlmodel.ext.asyncio.session import AsyncSession

from ..core.logginig import get_logger
from ..db.databse import async_session_maker

logger = get_logger(__name__)


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
