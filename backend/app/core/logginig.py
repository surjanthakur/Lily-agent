import logging
import logging.config

from .settings import settings


def setup_logging() -> None:
    """Configure application logs for local development and production."""
    log_level = (settings.LOG_LEVEL or "INFO").upper()

    logging.config.dictConfig(
        {
            "version": 1,
            "disable_existing_loggers": False,
            "formatters": {
                "default": {
                    "format": "%(asctime)s | %(levelname)s | %(name)s | %(message)s",
                    "datefmt": "%Y-%m-%d %H:%M:%S",
                }
            },
            "handlers": {
                "console": {
                    "class": "logging.StreamHandler",
                    "formatter": "default",
                    "stream": "ext://sys.stdout",
                },
                "file": {
                    "class": "logging.FileHandler",
                    "filename": "app.log",
                    "formatter": "default",
                    "encoding": "utf-8",
                    "mode": "a",
                },
            },
            "loggers": {
                "app": {
                    "handlers": ["console", "file"],
                    "level": log_level,
                    "propagate": False,
                }
            },
            "root": {"level": log_level, "handlers": ["console", "file"]},
        }
    )


def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)
