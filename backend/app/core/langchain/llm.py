from langchain.messages import HumanMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI

from ...schemas.llm_validation import LlmSchemaValidation
from ..settings import settings


def llm_model_provider(model_validation: LlmSchemaValidation):

    llm = ChatGoogleGenerativeAI(
        model=model_validation.model_name,
        api_key=settings.GOOGLE_GEMINI_API_KEY,
        thinking_level=model_validation.thinking_level,
    )

    messages = [
        SystemMessage(content=model_validation.system_prompt),
        HumanMessage(content=model_validation.user_input),
    ]
