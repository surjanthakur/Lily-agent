import asyncio

from ..langchain.llm import GeminiModelsFactory
from ..logginig import get_logger
from .state_graph import AgentState

logger = get_logger(__name__)


# query optimizer node
def input_query_optimizer(state: AgentState):
    """
    takes user input query and optimizes it into smillar sub query's
    """
    input_query = state["topic"]

    try:
        result = GeminiModelsFactory.flash_model(query=input_query)

    except asyncio.TimeoutError:
        raise
    except Exception:
        logger.exception("Query optimizer model call failed")
        raise
    return {"optimized_query": result}


def web_search_reosurces(state: AgentState):
    state["optimized_query"]
