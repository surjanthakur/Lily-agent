from langgraph.graph import END, START

from .nodes import query_optimizer_node
from .state_graph import GRAPH_BUILDER

# add nodes
GRAPH_BUILDER.add_node("query_optimizer", query_optimizer_node)

# add edges
GRAPH_BUILDER.add_edge(START, "query_optimizer")
GRAPH_BUILDER.add_edge("query_optimizer", END)

# compile graph
COMPILED_GRAPH = GRAPH_BUILDER.compile()
