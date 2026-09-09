from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

env_path = Path(__file__).parent[2] / ".env"


class Settings(BaseSettings):
    db_url: str = Field(validation_alias="NEON_DB_URL")

    model_config = SettingsConfigDict(
        env_file=env_path,
        extra=False,
    )


settings = Settings()
