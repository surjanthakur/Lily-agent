import asyncio
from pathlib import Path

from ...schemas.llm_validation import LlmSchemaValidation
from ..llm_provider import llm_provider
from ..logginig import get_logger
from .state_graph import AgentState

logger = get_logger(__name__)


QUERY_OPTIMIZER_PROMPT = (
    Path(__file__).resolve().parent[1] / "prompts" / "query_optimizer_skill.md"
)


# query optimizer node
def input_query_optimizer(state: AgentState):
    """
    takes user input query and optimizes it into smillar sub query's
    """
    input_query = state["topic"]

    try:
        validation_config = LlmSchemaValidation(
            user_input=input_query,
            model_name="gemini-3.5-flash",
            thinking_level="medium",
            system_prompt=Path.read_text(QUERY_OPTIMIZER_PROMPT, encoding="utf-8"),
        )
        result = llm_provider(validation_config)

    except asyncio.TimeoutError:
        raise

    except Exception:
        logger.exception("Query optimizer model call failed")
        raise

    return {"optimized_query": result}


def web_search_resource(state: AgentState):
    state["optimized_query"]
