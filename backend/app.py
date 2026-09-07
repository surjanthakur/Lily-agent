from typing import Literal, TypedDict

from langgraph.graph import END, START, StateGraph
from langgraph.types import Command


# create state schema structure
class StateSchema(TypedDict):
    question: str
    research: str
    is_good: bool
    attempts: int


# create stategeaph
graph_builder = StateGraph(StateSchema)


def do_research(state: StateSchema):
    return {
        "research": "langgraph is a graph/workflow architecture that builds agents by connecting nodes nd edges",
        "attempts": state["attempts"] + 1,
    }


def do_fallback(state: StateSchema):
    print(
        f"question: {state['question']} answer:{state['research']} attempts:{state['attempts']} is_good: {state['is_good']}"
    )
    return {}


def do_answer(state: StateSchema):
    print(f"question: {state['question']} answer: {state['research']}")
    return {}


def do_check(state: StateSchema) -> Command[Literal["answer", "research"]]:
    if state["is_good"]:
        return Command(
            update={"is_good": True},
            goto="answer",
        )
    return Command(
        update={"is_good": False},
        goto="research",
    )


def do_route(state: StateSchema):
    if state["attempts"] >= 3:
        return "fallback"


# define nodes
graph_builder.add_node("research", do_research)
graph_builder.add_node("fallback", do_fallback)
graph_builder.add_node("answer", do_answer)
graph_builder.add_node("check", do_check)

# define edges
graph_builder.add_edge(START, "research")
graph_builder.add_edge("research", "check")
graph_builder.add_conditional_edges(
    "check",
    do_route,
    {
        "fallback": "fallback",
        "answer": "answer",
        "research": "research",
    },
)

graph_builder.add_edge("answer", END)
graph_builder.add_edge("fallback", END)

# compile graph
agent = graph_builder.compile()


# invoke graph
agent.invoke(
    input={
        "question": "what is langgraph",
        "attempts": 0,
        "is_good": False,
        "research": "",
    }
)
