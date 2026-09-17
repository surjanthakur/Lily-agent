from contextlib import asynccontextmanager

from fastapi import FastAPI

from .core.logginig import get_logger, setup_logging
from .core.settings import settings
from .db.databse import create_db_tables
from .routes import llm_router

setup_logging()
logger = get_logger(__name__)


# to perform app startup and shutdown task's
@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_tables()
    yield


app = FastAPI(
    lifespan=lifespan,
    version=settings.VERSION,
)

# include routes to app
app.include_router(router=llm_router.router, prefix="api/v1/lily-agent")


# health check route
@app.get("/health", status_code=200)
def health_checks_route():
    return {"status": "ok"}
