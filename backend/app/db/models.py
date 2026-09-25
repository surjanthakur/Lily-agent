from datetime import datetime, timedelta
from typing import Optional
from uuid import UUID, uuid4

from sqlmodel import Field, Relationship, SQLModel


# user table
class User(SQLModel, table=True):
    user_id: UUID = Field(
        default_factory=uuid4,
        title="unique id of the user",
        primary_key=True,
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
        title="google id of the user",
    )
    email_id: str = Field(
        default=None,
        unique=True,
        title="email of the user",
    )
    profile_picture: str = Field(
        default=None,
        title="picture of the user",
    )
    created_at: datetime = Field(
        default_factory=datetime.now,
        title="date and time the user was created",
    )
    oauth_account: Optional["OAuthAccount"] = Relationship(
        back_populates="user", cascade_delete=True
    )


# Oauth account
class OAuthAccount(SQLModel, table=True):
    OAuth_id: UUID = Field(
        default_factory=uuid4,
        title="unique id of the oauth account",
        primary_key=True,
    )
    user_id: UUID = Field(foreign_key="user.user_id", ondelete="CASCADE", unique=True)
    provider: str
    provider_user_id: str
    access_token: str
    expires_at: timedelta
    created_at: datetime = Field(
        default_factory=datetime.now,
        title="date and time the user was created",
    )
    user: "User" = Relationship(back_populates="oauth_account")
