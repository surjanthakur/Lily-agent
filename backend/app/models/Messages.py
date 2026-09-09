from datetime import datetime
from enum import Enum
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class MessageRole(str, Enum):
    AGENT = "agent"
    USER = "user"


class Message(SQLModel, table=True):
    message_id: UUID = Field(
        default_factory=uuid4,
        primary_key=True,
        unique=True,
        index=True,
        title="unique id of the message",
    )
    conversation_id: UUID = Field(
        foreign_key="conversation.conversation_id",
        index=True,
        title="conversation containing the message",
    )
    role: MessageRole = Field(
        title="message sender role",
    )
    content: str = Field(
        title="message content",
    )
    created_at: datetime = Field(
        default_factory=datetime.now,
        title="date and time the message was created",
    )
