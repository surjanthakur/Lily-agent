from operator import add
from typing import Annotated, TypedDict

from langgraph.graph import StateGraph


class AgentState(TypedDict):
    topic: str
    optimized_queries: list[str]
    found_resources: Annotated[list[dict], add]


GRAPH_BUILDER = StateGraph(AgentState)
