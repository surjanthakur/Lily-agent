from contextlib import asynccontextmanager

from fastapi import FastAPI

from .db.databse import create_db_tables
from .models.Conversations import Conversation  # noqa: F401
from .models.Messages import Message  # noqa: F401
from .models.Users import USER  # noqa: F401


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await create_db_tables()
        print("db tables created successfully🔥")
    except Exception as err:  # noqa: BLE001
        print(err)
    else:
        yield


app = FastAPI(lifespan=lifespan)
