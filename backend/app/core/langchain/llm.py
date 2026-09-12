from langchain.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI


class GeminiModelsFactory:
    """Provide ready-to-use LangChain chat model configurations.

    Use the class methods to select the Gemini model required by a service,
    for example ``GeminiModelsFactory.gemini_2_flash("Hello")``.
    """

    @classmethod
    def flash_model(cls, query: str):
        """Send a query to Gemini 2.5 Flash and return its response."""

        llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            max_tokens=None,
            thinking_level="low",
        )
        messages = [HumanMessage(content=query)]

        response = llm.invoke(messages)

        return response

    def flash_lite_model(cls, query: str):
        """
        get the model gemini-3.5-flash-lite for better agentic work +reasoning.
        """
        model = ChatGoogleGenerativeAI(
            model="gemini-3.5-flash-lite",
            max_tokens=None,
        )
        return model
