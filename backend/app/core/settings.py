from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

env_path = Path(__file__).resolve().parents[2] / ".env"


class Settings(BaseSettings):
    DB_URL: str
    LOG_LEVEL: str

    model_config = SettingsConfigDict(
        env_file=env_path,
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
