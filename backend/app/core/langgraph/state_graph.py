import operator
from typing import Annotated, Literal, TypedDict

from langgraph.graph import StateGraph, add_messages


class Source(TypedDict, total=False):
    title: str
    url: str
    score: float
    level: str
    type: Literal["easy", "hard", "medium"]
    description: str


class AgentState(TypedDict):
    topic: str
    found_resources: list[Source]  # founded resources with title, url, score only.
    scraped_resources: Annotated[
        list[Source], operator.add
    ]  # after scrapted add metadata: title , url , score , level , type , description.
    optimized_query: str
    messages: Annotated[list, add_messages]  # store recent messages state


GRAPH_BUILDER = StateGraph(AgentState)
