from redis.asyncio import Redis
from redis.exceptions import (
    ConnectionError,
    DataError,
    RedisClusterException,
    RedisError,
    ResponseError,
)

from ..core.logginig import get_logger
from ..core.settings import settings

logger = get_logger(__name__)

redis_client = Redis.from_url(
    url=settings.REDIS_DB_URL,
    encoding="utf-8",
    decode_responses=True,
    max_connections=10,
    port=19221,
    username="default",
    password="a40uFO3WHQbvKuEuWMFvMbhtKi9G3z8b",
)


async def check_redis_connection() -> bool:
    try:
        response = await redis_client.ping()
        if response:
            logger.info("redis db connected successfully ✅")

    except (
        ConnectionError,
        DataError,
        RedisClusterException,
        ResponseError,
        RedisError,
    ):
        logger.exception("Redis DB network or connection issue ❌")
        return False
