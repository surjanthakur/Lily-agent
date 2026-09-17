from fastapi import APIRouter, status
from pydantic import BaseModel, Field

from ..services.agent_services import call_langgraph_agent

router = APIRouter(tags=["agent"])


class AgentReq(BaseModel):
    user_query: str = Field(title="user query", min_length=1, max_length=100)


# Route to get agent response
@router.get("/asks", status_code=status.HTTP_200_OK)
def get_agent_response(requests: AgentReq) -> dict:
    res = call_langgraph_agent(query=requests.user_query)

    return {"response": res}
