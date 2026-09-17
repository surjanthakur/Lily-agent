from tavily import AsyncTavilyClient

from .settings import settings

Client = AsyncTavilyClient(api_key=settings.TRAVILY_API_KEY)


async def web_search(query: str) -> dict:
    """Search the web for current information on a topic.

    Use this tool whenever you need up-to-date facts, news, or information
    that may have changed after your training data.

    Args:
        query: The search query
        max_results: Number of results to return
    """
    response = await Client.search(
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
        timeout=20,
        include_answer="basic",
        include_favicon=False,
        include_images=False,
        include_domains_mode="boost",
        include_usage=False,
        language="en",
        include_raw_content=False,
        include_generated_markdown=False,
        include_published_date=True,
    )

    return response
