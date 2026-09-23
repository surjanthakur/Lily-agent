from pydantic import BaseModel, EmailStr, Field


class UserRequest(BaseModel):
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
    email_id: EmailStr = Field(
        default=None,
        unique=True,
        title="email of the user",
    )
    profile_picture: str = Field(
        default=None,
        title="picture of the user",
    )
