from fastapi import HTTPException, status
from langchain.messages import HumanMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI

from ..schemas.llm_validation import LlmSchemaValidation
from .settings import settings


def llm_provider(model_validation: LlmSchemaValidation):
    try:
        model = ChatGoogleGenerativeAI(
            model=model_validation.model_name,
            api_key=settings.GOOGLE_GEMINI_API_KEY,
            thinking_level=model_validation.thinking_level,
            max_output_tokens=1024,
        )

        messages = [
            SystemMessage(content=model_validation.system_prompt),
            HumanMessage(content=model_validation.user_input),
        ]
        response = model.invoke(messages)
        return response.text

    except RuntimeWarning:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="This model is currently experiencing high demand. Spikes in demand are usually temporary. please again later. ",
        )
