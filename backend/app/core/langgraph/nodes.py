import json
from pathlib import Path

from langgraph.types import Send

# from langchain.agents import create_agent
from ...schemas.llm_validation import LlmSchemaValidation
from ..llm_provider import llm_provider
from ..logginig import get_logger
from .state_graph import AgentState

logger = get_logger(__name__)


QUERY_OPTIMIZER_PROMPT = (
    Path(__file__).resolve().parent.parent / "prompts" / "query_optimizer_skill.md"
)

RESOURCE_SEARCH_PROMPT = (
    Path(__file__).resolve().parent.parent / "prompts" / "resource_search_skill.md"
)


# query optimizer node
def query_optimizer_node(state: AgentState):
    """
    Expands the user's topic into multiple focused search queries.
    """

    input_query = state["topic"]

    try:
        validation_config = LlmSchemaValidation(
            user_input=input_query,
            model_name="gemini-3.5-flash-lite",
            thinking_level="medium",
            system_prompt=QUERY_OPTIMIZER_PROMPT.read_text(encoding="utf-8"),
        )

        logger.info("Calling query optimizer model...")
        result = llm_provider(validation_config)

        logger.info("Query optimizer model returned successfully")

    except Exception:
        logger.exception("Query optimizer model call failed")
        raise

    logger.info("Updating [optimized_query] state")

    data = json.loads(result)

    queries: list[str] = data["queries"]

    return {"optimized_query": queries}


def fan_out_query(state: AgentState):
    return [Send("resource_search", {"query": q}) for q in state["optimized_queries"]]


def resource_search_node(state: dict):
    query = state["query"]

    validation_config = LlmSchemaValidation(
        user_input=query,
        model_name="gemini-3.5-flash",
        thinking_level="low",
        system_prompt=RESOURCE_SEARCH_PROMPT.read_text(encoding="utf-8"),
    )

    logger.info("Calling resource search model...")

    result = llm_provider(validation_config)
    print(result)
    logger.info("Query optimizer model returned successfully")
