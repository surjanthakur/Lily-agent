from pathlib import Path

from langgraph.types import Send

from ...schemas.llm_validation import LlmSchemaValidation
from ...utils.json_parser import parse_optimized_queries
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


# optimize user queries
def query_optimizer_node(state: AgentState) -> dict:
    """
    Expands the user's topic into multiple focused search queries.
    """
    try:
        input_query = state["topic"]

        # validating llm config's
        validation_config = LlmSchemaValidation(
            user_input=input_query,
            model_name="gemini-3.5-flash-lite",
            thinking_level="high",
            system_prompt=QUERY_OPTIMIZER_PROMPT.read_text(encoding="utf-8"),
        )

        logger.info("Calling query optimizer...")

        # calling model...
        resposne = llm_provider(validation_config)

        logger.info("Query optimizer returned repsonse successfully...")

        logger.info("Loading optimizer result into JSON...")
        queries = parse_optimized_queries(resposne)

        logger.info("getting list of queries from loaded json data...")

    except Exception:
        logger.exception("Query optimizer call failed...")
        raise

    logger.info("Updating state...")
    return {"optimized_queries": queries}


# send query one by one to resource_search node
def fan_out_query_node(state: AgentState):
    """
    send optmized list of queries one by one to reosurce_search node
    """
    return [Send("resource_search", {"query": q}) for q in state["optimized_queries"]]


# find resource based on query
def resource_search_node(state: dict) -> dict:
    """
    return structured dict source {title , url , score , content}
    """
    try:

        query = state["query"]

        logger.info("Calling Travily api...")
        response = web_search(query)
        logger.info("api executed successfully")

        source = [
            {
                "title": result["title"],
                "url": result["url"],
                "score": result["score"],
                "content": result["content"],
            }
            for result in response.get("results", [])
        ]
        return {"found_resources": source}

    except Exception:
        logger.exception("reosurce search call failed...")
        raise
