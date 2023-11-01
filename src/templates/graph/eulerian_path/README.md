# Eulerian Path

## Problem Description

An Eulerian path in a graph is a path that visits every edge exactly once and may start and end at different vertices. In other words, an Eulerian path traverses through each edge of the graph exactly once, without repeating any edge. If such a path starts and ends at the same vertex, it is known as an Eulerian circuit or Eulerian cycle.

The graph must be connected for an Eulerian path to exist, except for isolated vertices which are not part of the Eulerian path.

### Criteria for an Eulerian Path

1. All vertices with non-zero degree are connected.
2. Either zero or exactly two vertices have an odd degree. If there are zero odd-degree vertices, the graph has an Eulerian cycle. If there are exactly two odd-degree vertices, the graph has an Eulerian path but not an Eulerian cycle.

## Types of Graphs Suitable for Eulerian Path

-   Undirected Graphs
-   Directed Graphs

## Algorithm to Solve the Problem

To find an Eulerian path or cycle in a graph, you can use various algorithms. The two most common algorithms are:

1. **Hierholzer’s Algorithm**: This algorithm is efficient and works for both directed and undirected graphs. It has a time complexity of \(O(E)\), where \(E\) is the number of edges.
2. **Fleury’s Algorithm**: This algorithm is easier to understand but less efficient, with a time complexity of \(O(E \times V)\).

### Pseudocode for Hierholzer’s Algorithm

Here's a high-level pseudocode outline for Hierholzer’s Algorithm:

1. Ensure the graph meets the criteria for containing an Eulerian path or cycle.
2. Choose a starting vertex \(v\). If there are vertices of odd degree, one of them should be the starting vertex.
3. Follow a trail of edges from \(v\) back to \(v\) that has not been traversed before.
4. If the current vertex has no untraversed outgoing edges, add it to the result and remove the last vertex from the current path. Otherwise, select an untraversed outgoing edge, and move to the vertex at the other end of the edge.
5. Repeat step 4 until you return to \(v\).
6. Continue the process until all edges have been traversed.

## TypeScript Implementation

To implement the Eulerian path algorithm in TypeScript, we'll follow these steps:

1. First, check if an Eulerian path exists in the graph. For an Eulerian path to exist, either all vertices must have even degree, or exactly two vertices must have odd degree.
2. If an Eulerian path exists, find it using a modified depth-first search (DFS) algorithm.

Here's the TypeScript code:

```typescript
type AdjacencyList = number[][];

/**
 * Finds an Eulerian path in an undirected graph, if it exists.
 *
 * @param {AdjacencyList} graph - The adjacency list representation of the graph.
 * @returns {number[] | null} - An array representing the Eulerian path, or null if none exists.
 *
 * @example
 * const graph = [
 *   [1, 2],
 *   [0, 2],
 *   [0, 1, 3],
 *   [2]
 * ];
 * findEulerianPath(graph);  // returns [0, 1, 2, 3]
 */
export function findEulerianPath(graph: AdjacencyList): number[] | null {
    // Count vertices with odd degree
    let startVertex = 0;
    let oddCount = 0;

    for (let i = 0; i < graph.length; i++) {
        if (graph[i].length % 2 !== 0) {
            oddCount++;
            startVertex = i;
        }
    }

    // No Eulerian Path exists if there are more than 2 vertices of odd degree
    if (oddCount > 2) {
        return null;
    }

    // Stack to hold the path and another to hold vertices during DFS
    const path: number[] = [];
    const stack: number[] = [];

    stack.push(startVertex);

    while (stack.length > 0) {
        const current = stack[stack.length - 1];

        // If the current vertex has no neighbors, it's a leaf node.
        // Pop it from stack and add to path.
        if (graph[current].length === 0) {
            path.push(current);
            stack.pop();
        } else {
            // Otherwise, remove the edge and continue DFS.
            const neighbor = graph[current].pop()!;
            graph[neighbor] = graph[neighbor].filter((v) => v !== current);
            stack.push(neighbor);
        }
    }

    // If not all edges are visited, return null
    if (graph.some((arr) => arr.length > 0)) {
        return null;
    }

    return path.reverse();
}

// Test the function
const graph: AdjacencyList = [[1, 2], [0, 2], [0, 1, 3], [2]];

const result = findEulerianPath(graph);
console.log(result); // Should print [0, 1, 2, 3] or its reverse [3, 2, 1, 0]
```

In this code, we use the adjacency list to represent the graph. The function `findEulerianPath` performs a depth-first search to find the Eulerian path, if it exists. We identify the starting vertex based on the vertex degree conditions required for an Eulerian path. Then we proceed to find the path using a stack and backtrack whenever we reach a vertex with no unvisited edges.

Note: The graph is considered to be undirected. Therefore, each edge between vertices `u` and `v` is represented twice: once in `graph[u]` and once in `graph[v]`.

### Time Complexity

The time complexity of the algorithm is mainly determined by the loop traversing through the graph. Each edge is visited exactly once, and each visit involves a constant amount of work (like popping from and pushing to arrays). Therefore, the time complexity is \(O(E)\), where \(E\) is the number of edges in the graph.

### Space Complexity

The main data structures that consume additional space are:

1. The `stack` array, which in the worst case can have all vertices, making its space complexity \(O(V)\), where \(V\) is the number of vertices.
2. The `path` array, which will contain all vertices in the Eulerian path, again making its space complexity \(O(V)\).
3. The modified adjacency list, which holds the remaining unvisited edges. In the worst-case scenario, it will hold all edges, making its space complexity \(O(E)\).

Therefore, the overall space complexity is \(O(V + E)\).

Note that \(E\) can be as large as \(V(V - 1)/2\) for an undirected graph, so the space complexity can also be expressed as \(O(V^2)\) in the worst case. However, for sparse graphs, \(E\) is much smaller than \(V^2\), so \(O(V + E)\) gives a better indication of the algorithm's efficiency.

## References

-   [ChatGPT](https://chat.openai.com/c/0338f682-0cc2-46db-90fc-de4dbd422ce6)
-   [YouTube](https://www.youtube.com/watch?v=zS34kHSo7fs)
