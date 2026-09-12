from fastapi import APIRouter, status

from ..services.llm_service import call_llm

router = APIRouter(prefix="/lily-agent/ask", tags=["agent call"])


@router.get("/query", status_code=status.HTTP_200_OK)
def get_agent_res_route(user_query: str):
    try:
        call_llm(user_query)
    except Exception as err:  # noqa: BLE001
        print(f"error: {err}")
