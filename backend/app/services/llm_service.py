from ..core.langchain.llm import GeminiModelsFactory


def call_llm(query: str):
    result = GeminiModelsFactory.flash_model(query)
    print(result)
