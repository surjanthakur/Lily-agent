from pydantic import BaseModel, Field


class LlmSchemaValidation(BaseModel):
    user_input: str = Field(min_length=20, max_length=100, title="user req query")
    model_name: str = Field(min_length=10, max_length=50, title="name of the model")
    thinking_level: str = Field(
        min_length=4,
        max_length=10,
        title="thinking level of the model",
    )
