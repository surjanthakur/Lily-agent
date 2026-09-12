from fastapi import APIRouter, HTTPException, status

from ..services.llm_service import call_llm

router = APIRouter(tags=["agent call"])


@router.get("/query", status_code=status.HTTP_200_OK)
def get_agent_res_route(user_query: str):
    try:
        return {"response": call_llm(user_query)}
    except Exception as error:
        raise HTTPException(
            status_code=502,
            detail=f"LLM request failed: {error}",
        ) from error
