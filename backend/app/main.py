from contextlib import asynccontextmanager

from fastapi import FastAPI

from .db.databse import create_db_tables
from .models.Conversations import Conversation  # noqa: F401
from .models.Messages import Message  # noqa: F401
from .models.Users import USER  # noqa: F401


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_tables()
    print("db tables created successfully🔥")
    yield


app = FastAPI(lifespan=lifespan)


# health check route
@app.get("/health", status_code=200)
def health_checks_route():
    return {"status": "ok"}
