from pathlib import Path

from langchain.messages import HumanMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI

from ..settings import settings

QUERY_OPTIMIZER_PROMPT_PATH = (
    Path(__file__).resolve().parents[1] / "prompts" / "query_optimizer_skill.md"
)


def llm_model_provider()