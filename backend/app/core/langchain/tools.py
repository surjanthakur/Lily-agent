from langchain.tools import tool
from tavily import TavilyClient

from ..settings import settings

tavily_client = TavilyClient(api_key=settings.TRAVILY_API_KEY)


@tool
def Web_search_tool(queries: str):
    response = tavily_client.search(
        query=queries,
        max_results=5,
        include_domains=[
            "https://x.com/home",
            "https://medium.com/",
            "https://www.reddit.com/",
            "https://thehackernews.com/",
            "https://www.w3schools.com/",
            "https://research.ibm.com/blog",
            "https://scholar.google.com/",
            "https://billiondollartweets.com/",
        ],
        include_images=False,
        include_favicon=False,
        exclude_domains=["https://instagram.com/reels", "https://www.youtube.com/"],
    )
    return response
