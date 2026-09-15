from fastapi import APIRouter, status

from ..services.agent_services import call_langgraph_agent_workflow

router = APIRouter(tags=["agent call"])


# Route to get llm response
@router.get("/ask", status_code=status.HTTP_200_OK)
def get_agent_res_route(user_query: str):
    return {"response": call_langgraph_agent_workflow(user_query)}
