from ..core.langgraph.graph import COMPILED_GRAPH


def call_langgraph_agent_workflow(query: str):
    result = COMPILED_GRAPH.invoke(
        {
            "topic": query,
            "found_resources": [],
            "messages": [],
            "optimized_query": "",
            "scraped_resources": [],
        }
    )
    return result
