from pathlib import Path

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
            system_prompt=QUERY_OPTIMIZER_PROMPT.read_text(encoding="utf-8"),
        )
        logger.info("llm calling....")
        result = llm_provider(validation_config)
        logger.info("llm return response....")

    except TimeoutError:
        raise

    except Exception:
        logger.exception("Query optimizer model call failed")
        raise

    else:
        logger.info("updating [ optimized_query ] state")
        return {"optimized_query": result}


def web_search_resource(state: AgentState):
    queries = state["optimized_query"]

    result = web_search(queries)

    print(result)
