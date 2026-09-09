from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class Conversation(SQLModel, table=True):
	conversation_id: UUID = Field(
		default_factory=uuid4,
		primary_key=True,
		unique=True,
		index=True,
		title="unique id of the conversation",
	)
	user_id: UUID = Field(
		foreign_key="user.user_id",
		index=True,
		title="user who owns the conversation",
	)
	created_at: datetime = Field(
		default_factory=datetime.now,
		title="date and time the conversation was created",
	)
    