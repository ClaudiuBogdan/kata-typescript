# Topological Sort

Topological sorting is an algorithm used in graph theory, specifically for directed acyclic graphs (DAGs). The goal of topological sorting is to arrange the vertices of a DAG in a linear order such that for every directed edge from vertex \( u \) to vertex \( v \), \( u \) comes before \( v \) in the ordering. This is particularly useful in scenarios where you need to determine the sequence of tasks when some tasks must be completed before others.

### Problem Description

-   **Input**: A Directed Acyclic Graph (DAG), which means a graph that is directed and has no cycles.
-   **Output**: A linear ordering of its vertices such that for every directed edge \( uv \) from vertex \( u \) to vertex \( v \), \( u \) comes before \( v \) in the ordering.

### Applications

Topological sorting is widely used in scenarios such as:

1. **Determining Build Order**: In software development, especially in managing project dependencies.
2. **Scheduling Problems**: Like course scheduling or job scheduling in manufacturing.
3. **Precedence Problems**: Where tasks have dependencies (like tasks in a project).

### Algorithms to Solve Topological Sort

There are primarily two algorithms used to perform a topological sort:

1. **Kahn's Algorithm**:

    - This algorithm iteratively removes nodes with no incoming edges and adds them to the sorted list.
    - It involves the following steps:
        - Find vertices with no incoming edges.
        - Remove these vertices and their outgoing edges from the graph.
        - Repeat the process until no such vertices are found.
    - If the graph is not a DAG, some vertices will be left in the graph, indicating a cycle.

2. **Depth-First Search (DFS)**:
    - This algorithm involves performing a DFS on the graph and producing a stack of vertices.
    - The key steps are:
        - Start a DFS traversal from each unvisited node.
        - On visiting a node, start a recursive DFS for its adjacent vertices.
        - On the return path (backtracking), push the vertex onto a stack.
        - The stack, when completely built, represents the topological order.

Topological sorting is possible only for DAGs. If a graph has a cycle, a valid topological ordering cannot exist, as there is no way to linearly order the vertices.

## References

- [ChatGPT]()