from langchain.tools import tool
from tavily import TavilyClient

from .settings import settings

tavily = TavilyClient(api_key=settings.TRAVILY_API_KEY)


@tool
def web_search(query: str, max_results: int = 2) -> dict:
    """Search the web for current information on a topic.

    Use this tool whenever you need up-to-date facts, news, or information
    that may have changed after your training data.

    Args:
        query: The search query
        max_results: Number of results to return (default 5)
    """
    response = tavily.search(
        query,
        exact_match=True,
        max_results=max_results,
        search_depth="ultra-fast",
        topic="general",
        include_domains=[],
        exclude_domains=[],
        include_favicon=False,
        include_images=False,
        include_answer=False,
        include_raw_content=False,
        include_domains_mode="boost",
        include_usage=False,
    )
    return response
