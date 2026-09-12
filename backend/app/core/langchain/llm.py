from langchain.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI


class GeminiModelsFactory:
    """Provide ready-to-use LangChain chat model configurations.

    Use the class methods to select the Gemini model required by a service,
    for example ``LlmRegistery.gemini_2_flash()``.
    """

    @classmethod
    def gemini_2_flash(cls, query: str):
        """
        get the model gemini-2.5-flash for better reasoning.

        input: role:str , query:str
        output: llm response: llm take query and generate response  and return it.
        """

        llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            max_tokens=None,
            thinking_level="low",
        )
        messages = [HumanMessage(query)]

        return llm.invoke(messages)

    def gemini_3_flash_lite(cls, query: str):
        """
        get the model gemini-3.5-flash-lite for better agentic work +reasoning.
        """
        model = ChatGoogleGenerativeAI(
            model="gemini-3.5-flash-lite",
            max_tokens=None,
        )
        return model
