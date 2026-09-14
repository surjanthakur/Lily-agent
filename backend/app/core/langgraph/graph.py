from langgraph.graph import END, START

from .nodes import input_query_optimizer, web_search_resource
from .state_graph import GRAPH_BUILDER

# add nodes
GRAPH_BUILDER.add_node(input_query_optimizer, "input_query_optimizer")
GRAPH_BUILDER.add_node(web_search_resource, "web_search_resource")

# add edges
GRAPH_BUILDER.add_edge(START, "input_query_optimizer")
GRAPH_BUILDER.add_edge("input_query_optimizer", "web_search_resource")
GRAPH_BUILDER.add_edge("web_search_resource", END)

# compile graph
COMPILED_GRAPH = GRAPH_BUILDER.compile()
