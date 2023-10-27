# Cycle Detection in a Directed Graph

## Problem Description

Given a directed graph represented as an adjacency list, the task is to determine whether or not the graph contains a cycle. A cycle in a directed graph exists if there are at least three vertices \(a*1, a_2, ..., a_n\) such that \(a_1 = a_n\) and there exists a directed edge between \(a_i\) and \(a*{i+1}\) for \(1 \leq i < n\).

## Algorithm Types to Solve This Problem

1. **Depth-First Search (DFS)**: The most commonly used approach is Depth-First Search. The idea is to traverse through the graph using DFS and use a stack to keep track of the vertices in the current recursion stack. If a vertex is reached that is already in the recursion stack, then there is a cycle.

2. **Breadth-First Search (BFS)**: Also known as Kahn's algorithm, this approach works by taking in-degree of each vertex and removes nodes with zero in-degree until either all nodes are removed, or a cycle is detected.

3. **Union-Find Algorithm**: This algorithm isn't as natural to apply to directed graphs as it is for undirected graphs but can be adapted. It mainly combines or "unions" connected components and checks for cycles during this process.

4. **Tarjan’s Algorithm**: This is another algorithm based on DFS, but it's more specialized for strongly connected components. It can also be used to find cycles.

### Depth-First Search (DFS) Algorithm for Cycle Detection in TypeScript

To start with, you can use a Depth-First Search (DFS) based algorithm for cycle detection. The algorithm uses a color-coding scheme (or visitation states) for nodes:

-   **White**: The node is unvisited.
-   **Gray**: The node is in the recursion stack (DFS is visiting the node or its descendants).
-   **Black**: DFS has visited the node and all its descendants, and they are popped from the recursion stack. Certainly! Below is an implementation of the cycle detection algorithm using Depth-First Search (DFS) in TypeScript with the function signature you've provided. I've used an enumeration `NodeColor` to keep track of the state (color) of each node:

-   **WHITE (0)**: The node is unvisited.
-   **GRAY (1)**: The node is in the recursion stack (DFS is visiting the node or its descendants).
-   **BLACK (2)**: DFS has visited the node and all its descendants, and they are popped from the recursion stack.

Here's the code:

```typescript
type AdjacencyList = number[][];

enum NodeColor {
    WHITE, // unvisited
    GRAY, // in recursion stack
    BLACK, // visited
}

/**
 * Helper function to perform DFS and detect a cycle.
 *
 * @param {number} node - The current node.
 * @param {AdjacencyList} graph - The adjacency list.
 * @param {NodeColor[]} color - The color of each node.
 * @returns {boolean} - True if a cycle exists from the current node, otherwise false.
 */
function hasCycleDFS(
    node: number,
    graph: AdjacencyList,
    color: NodeColor[],
): boolean {
    // Mark the current node as being visited
    color[node] = NodeColor.GRAY;

    // Visit all neighbors
    for (const neighbor of graph[node]) {
        // If the neighbor is in the recursion stack, then we have found a cycle
        if (color[neighbor] === NodeColor.GRAY) {
            return true;
        }

        // If the neighbor is unvisited and we find a cycle starting from it, return true
        if (
            color[neighbor] === NodeColor.WHITE &&
            hasCycleDFS(neighbor, graph, color)
        ) {
            return true;
        }
    }

    // After visiting all neighbors, mark the current node as visited
    color[node] = NodeColor.BLACK;

    return false;
}

/**
 * Detects if a cycle exists in a directed graph.
 *
 * @param {AdjacencyList} graph - The adjacency list representation of the directed graph.
 * @returns {boolean} - True if a cycle exists, otherwise false.
 */
export function detectCycle(graph: AdjacencyList): boolean {
    // Initialize all nodes as WHITE (unvisited)
    const color: NodeColor[] = Array(graph.length).fill(NodeColor.WHITE);

    // Loop through all nodes
    for (let i = 0; i < graph.length; i++) {
        // If the node is unvisited and a cycle is found starting from it, return true
        if (color[i] === NodeColor.WHITE && hasCycleDFS(i, graph, color)) {
            return true;
        }
    }

    // No cycle found
    return false;
}

// Example usage:
const graph = [[1], [2], [0]];
console.log(detectCycle(graph)); // Output: true
```

In this example, the `detectCycle` function initializes the color array and iteratively checks each node for cycles using the helper function `hasCycleDFS`.

### Time Complexity

The time complexity of this Depth-First Search (DFS) based cycle detection algorithm is \(O(V + E)\), where \(V\) is the number of vertices (nodes) and \(E\) is the number of edges in the graph.

The reasoning for this is as follows:

-   Each vertex is visited once, contributing \(O(V)\) to the time complexity.
-   Each edge is also visited once during the traversal, contributing \(O(E)\) to the time complexity.

### Space Complexity

The space complexity is mainly determined by:

1. The space required for the `color` array, which is \(O(V)\).
2. The recursion stack, which in the worst-case could go as deep as \(V\) levels (for a degenerate graph like a linked list), contributing another \(O(V)\).

So the space complexity is \(O(V)\).

### Alternative Approaches

1. **Breadth-First Search (Kahn's algorithm)**: This algorithm is used for topological sorting and can also be used for cycle detection in directed graphs. Its time complexity is also \(O(V + E)\), and it also uses \(O(V)\) extra space, but it doesn't rely on recursion, which might be beneficial in environments with limited stack space.

2. **Tarjan’s Strongly Connected Components Algorithm**: This algorithm is also \(O(V + E)\) but is more involved and generally used when you need to find strongly connected components, not just cycles.

3. **Union-Find**: This is generally more applicable to undirected graphs and has a time complexity of \(O(V \cdot \alpha(V))\), where \(\alpha\) is the inverse Ackermann function. This is practically constant time but usually less intuitive to implement for directed graphs.

4. **Floyd's Tortoise and Hare**: This technique can also be used for cycle detection but is typically used in a context where the graph is implicitly defined (like linked lists) rather than in an adjacency list or matrix representation.

In summary, the \(O(V + E)\) time complexity of the DFS approach is pretty much the best you can do for this problem for general graphs. The choice between DFS, BFS (Kahn's algorithm), or another approach mainly depends on the specific requirements and constraints of your application.

## References

-   [ChatGPT](https://chat.openai.com/c/36b52e67-127b-4a23-8a37-a3d3b8ee8893)
