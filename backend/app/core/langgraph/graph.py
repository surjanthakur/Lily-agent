from langgraph.graph import END, START

from .nodes import query_optimizer_node
from .state_graph import GRAPH_BUILDER

# add nodes
GRAPH_BUILDER.add_node(query_optimizer_node, "query_optimizer_node")

# add edges
GRAPH_BUILDER.add_edge(START, "query_optimizer_node")
GRAPH_BUILDER.add_edge("query_optimizer_node", END)

# compile graph
COMPILED_GRAPH = GRAPH_BUILDER.compile()
