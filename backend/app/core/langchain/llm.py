from pathlib import Path

from langchain.messages import HumanMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI

from ..settings import settings

QUERY_OPTIMIZER_PROMPT_PATH = (
    Path(__file__).resolve().parents[1] / "prompts" / "query_optimizer_skill.md"
)


class GeminiModelsFactory:
    """Provide ready-to-use LangChain chat model configurations.

    Use the class methods to select the Gemini model required by a service,
    for example ``GeminiModelsFactory.gemini_2_flash("Hello")``.
    """

    @classmethod
    def flash_model(cls, query: str):
        """Send a query to Gemini 3.5 Flash and return its response."""

        llm = ChatGoogleGenerativeAI(
            model="gemini-3.5-flash",
            google_api_key=settings.GOOGLE_GEMINI_API_KEY,
            max_tokens=None,
            thinking_level="low",
        )
        system_prompt = QUERY_OPTIMIZER_PROMPT_PATH.read_text(encoding="utf-8")
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=query),
        ]

        response = llm.invoke(messages)

        return response.text

    def flash_lite_model(cls, query: str):
        """
        get the model gemini-3.5-flash-lite for better agentic work +reasoning.
        """
        model = ChatGoogleGenerativeAI(
            model="gemini-3.5-flash-lite",
            max_tokens=None,
        )
        return model
