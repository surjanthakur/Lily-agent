from langgraph.graph import END, START

from .nodes import input_query_optimizer
from .state_graph import GRAPH_BUILDER

# add nodes
GRAPH_BUILDER.add_node(input_query_optimizer, "input_query_optimizer")

# add edges
GRAPH_BUILDER.add_edge(START, "input_query_optimizer")
GRAPH_BUILDER.add_edge("input_query_optimizer", END)

# compile graph
COMPILED_GRAPH = GRAPH_BUILDER.compile()
