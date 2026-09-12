from ..langchain.llm import GeminiModelsFactory
from .state_graph import AgentState


# query optimizer node
def input_query_optimizer(
    state: AgentState,
):
    """
    takes user input query and optimizes it into smillar sub query's
    """
    input_query = state["topic"]

    result = GeminiModelsFactory.flash_model(query=input_query)

    return {"optimized_query": result}
