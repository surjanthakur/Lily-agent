from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class USER(SQLModel, table=True):
    user_id: UUID = Field(
        default_factory=uuid4,
        unique=True,
        title="unique id of the user",
        primary_key=True,
        index=True,
    )
    username: str = Field(
        default=None,
        min_length=3,
        max_length=50,
        title="name of the user",
    )
    google_id: str = Field(
        default=None,
        unique=True,
        title="google id for auth user",
    )
    email_id: str = Field(
        default=None,
        unique=True,
        title="email of the auth user",
    )
    profile_picture: str = Field(
        default=None,
        title="pictutre of the auth user",
    )
    created_at: datetime = Field(
        default_factory=datetime.now,
        title="date and time the user was created",
    )
