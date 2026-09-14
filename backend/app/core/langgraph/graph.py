from langgraph.graph import END, START

from .nodes import fan_out_query, query_optimizer_node, resource_search_node
from .state_graph import GRAPH_BUILDER

# add nodes
GRAPH_BUILDER.add_node("query_optimizer", query_optimizer_node)
GRAPH_BUILDER.add_node("resource_search", resource_search_node)

# add edges
GRAPH_BUILDER.add_edge(START, "query_optimizer")
GRAPH_BUILDER.add_conditional_edges("query_optimizer", fan_out_query)
GRAPH_BUILDER.add_edge("resource_search", END)


# compile graph
COMPILED_GRAPH = GRAPH_BUILDER.compile()
