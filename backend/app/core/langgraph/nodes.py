import json
from pathlib import Path

from langgraph.types import Send

# from langchain.agents import create_agent
from ...schemas.llm_validation import LlmSchemaValidation
from ..llm_provider import llm_provider
from ..logginig import get_logger
from ..tools_provider import web_search
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

    return {"optimized_queries": queries}


def resource_search_node(state: dict):
    query = state["query"]

    logger.info("Calling resource search model...")

    response = web_search(query)

    source = [
        {
            "title": result.get("title", ""),
            "url": result.get("url"),
            "score": result.get("score", 0.0),
            "content": result.get("content", ""),
            # Tavily does not always return a publication date for every result.
            # Use a safe fallback so the app does not crash on missing metadata.
            "published_on": result.get("published_date", ""),
        }
        for result in response.get("results", [])
    ]

    logger.info("resource search model returned successfully")
    return {"found_resources": source}


# send query one by one to resource_search node
def fan_out_query(state: AgentState):
    return [Send("resource_search", {"query": q}) for q in state["optimized_queries"]]
