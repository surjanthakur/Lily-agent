from tavily import TavilyClient

from .settings import settings

tavily = TavilyClient(api_key=settings.TRAVILY_API_KEY)


def web_search(query: str) -> dict:
    """Search the web for current information on a topic.

    Use this tool whenever you need up-to-date facts, news, or information
    that may have changed after your training data.

    Args:
        query: The search query
        max_results: Number of results to return
    """
    response = tavily.search(
        query=query,
        max_results=1,
        search_depth="ultra-fast",
        include_domains=[
            "medium.com/",
            "reddit.com/",
        ],
        exclude_domains=[
            "youtube.com/",
            "instagram.com/",
        ],
        include_favicon=False,
        include_images=False,
        include_raw_content=False,
        include_domains_mode="boost",
        include_usage=False,
    )
    return response
