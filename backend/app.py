from typing import TypedDict

from langgraph.graph import END, START, StateGraph


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
