from typing import Annotated, TypedDict

from langgraph.graph import StateGraph


# create state schema structure
class StateSchema(TypedDict):
    question: str
    research: str
    is_good: Annotated[bool, "only true and false value"]
    attempts: int = 0


# create stategeaph
graph_builder = StateGraph(StateSchema)


def do_research(state: StateSchema):
    return {
        state[
            "research":"langgraph is a graph/workflow architecture that builds agents by connecting nodes nd edges"
        ],
        state["attempts"] + 1,
    }


def do_fallback(state: StateSchema):
    print(
        f"question: {state['question']} answer:{state['research']} attempts:{state['attempts']} is_good: {state['is_good']}"
    )


def do_answer(state: StateSchema):
    print(f"question: {state['question']} answer: {state['research']}")


def do_check(state: StateSchema):

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
# compile graph
# invoke graph
