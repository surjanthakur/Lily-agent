from typing import Annotated, TypedDict

from langgraph.graph import START, StateGraph


# create state schema structure
class StateSchema(TypedDict):
    question: str
    research: str
    is_good: Annotated[bool, "only true and false value"]
    attempts: int


# create stategeaph
graph_builder = StateGraph(StateSchema)


def do_research(state: StateSchema):
    ans = (
        "langgraph is a graph/workflow architecture that builds agents by connecting nodes nd edges",
    )

    return {
        "research": ans,
        "attempts": state["attempts"] + 1,
    }


def do_fallback(state: StateSchema):
    print(
        f"question: {state['question']} answer:{state['research']} attempts:{state['attempts']} is_good: {state['is_good']}"
    )


def do_answer(state: StateSchema):
    print(f"question: {state['question']} answer: {state['research']}")


def do_check(state: StateSchema):
    if state["research"]:
        return {"is_good": True}


def do_route(state: StateSchema):

    if state["attempts"] >= 3:
        return "fallback"

    elif state["is_good"] == True:
        return "answer"

    else:
        return "research"


# define nodes
graph_builder.add_node("research", do_research)
graph_builder.add_node("fallback", do_fallback)
graph_builder.add_node("answer", do_answer)
graph_builder.add_node("check", do_check)
graph_builder.add_node("route", do_route)

# define edges
graph_builder.add_edge(START, "research")
graph_builder.add_edge("research", "check")
graph_builder.add_conditional_edges(
    "check",
    do_route,
    {"fallback", "answer", "research"},
)

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
