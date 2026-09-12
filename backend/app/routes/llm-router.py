from fastapi import APIRouter, HTTPException, Request, Response, status

router = APIRouter(prefix="/lily-agent/ask", tags=["agent call"])


@router.get("/query", status_code=status.HTTP_200_OK)
def get_agent_res_route(user_query: str):
    pass
