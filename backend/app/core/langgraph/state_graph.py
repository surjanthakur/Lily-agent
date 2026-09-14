from operator import add
from typing import Annotated, Literal, TypedDict

from langgraph.graph import StateGraph
from pydantic import AnyUrl


class Source(TypedDict):
    title: str
    url: AnyUrl
    score: float
    level: Literal["easy", "medium", "hard"]
    type: Literal["blog", "article", "other"]
    description: str


class AgentState(TypedDict):
    topic: str
    optimized_queries: list[str]
    found_resources: Annotated[
        list[Source], add
    ]  # founded resources with title, url, score only.
    scraped_resources: Annotated[
        list[Source], add
    ]  # after scrapted add metadata: title , url , score , level , type , description.


GRAPH_BUILDER = StateGraph(AgentState)
