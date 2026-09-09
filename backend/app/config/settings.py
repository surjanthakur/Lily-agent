import os
from pathlib import Path

from dotenv import load_dotenv

env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(env_path)


class Settings:
    def __init__(self) -> None:
        db_url = os.getenv("NEON_DB_URL")
        if not db_url:
            raise RuntimeError(f"NEON_DB_URL is missing from {env_path}")
        self.db_url = db_url


settings = Settings()
