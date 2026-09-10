from datetime import datetime
from enum import Enum
from typing import Optional
from uuid import UUID, uuid4

from sqlmodel import Field, Relationship, SQLModel


# user's table
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

    Conversations: list["Conversation"] = Field(
        Relationship(
            back_populates="user",
            cascade_delete=True,
        )
    )


# user's conversation history
class Conversation(SQLModel, table=True):
    conversation_id: UUID = Field(
        default_factory=uuid4,
        primary_key=True,
        title="unique id of the conversation",
    )
    user_id: UUID = Field(
        foreign_key="user.user_id",
        index=True,
        ondelete="CASCADE",
        title="user who owns the conversation",
    )
    created_at: datetime = Field(
        default_factory=datetime.now,
        title="date and time the conversation was created",
    )

    user: Optional["User"] = Field(Relationship(back_populates="conversations"))

    messages: list["Message"] = Field(
        Relationship(back_populates="conversation", cascade_delete=True)
    )


class MessageRole(str, Enum):
    AGENT = "agent"
    USER = "user"


# conversation's history messages
class Message(SQLModel, table=True):
    message_id: UUID = Field(
        default_factory=uuid4,
        primary_key=True,
        title="unique id of the message",
    )
    conversation_id: UUID = Field(
        foreign_key="conversation.conversation_id",
        index=True,
        title="user who owns the conversation",
        ondelete="CASCADE",
    )
    role: MessageRole = Field(
        title="message sender role",
    )
    content: str = Field(
        title="message content",
    )
    conversation: Optional["Conversation"] = Field(
        Relationship(back_populates="messages", cascade_delete=True)
    )
    created_at: datetime = Field(
        default_factory=datetime.now,
        title="date and time the message was created",
    )
