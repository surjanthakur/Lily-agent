from operator import add
from typing import Annotated, TypedDict

from langgraph.graph import StateGraph


class AgentState(TypedDict):
    topic: str
    optimized_queries: list[str]
    found_resources: Annotated[
        list[dict], add
    ]  # founded resources with title, url, score only.
    scraped_resources: Annotated[
        list[dict], add
    ]  # after scrapted add metadata: title , url , score , level , type , description.


GRAPH_BUILDER = StateGraph(AgentState)
