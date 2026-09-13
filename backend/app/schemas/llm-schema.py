from pydantic import BaseModel, Field


class LLMSchema(BaseModel):
    user_input: str = Field(min_length=20, max_length=100)
