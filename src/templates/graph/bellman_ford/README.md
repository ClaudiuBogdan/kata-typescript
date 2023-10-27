# Bellman-Ford Algorithm

## Problem Description

The Bellman-Ford algorithm is used to find the shortest paths from a source vertex to all other vertices in a weighted, directed graph. The graph may contain negative weight edges but should not contain any negative weight cycles (cycles in the graph for which the total sum of the edge weights is negative), as this would imply that the shortest path is undefined since it could be reduced indefinitely.

The algorithm can handle graphs where some of the edge weights are negative, unlike Dijkstra's algorithm, which assumes all edge weights are non-negative. It also returns a boolean value that indicates whether or not a negative weight cycle reachable from the source vertex exists in the graph.

## Input:

-   A graph \( G = (V, E) \), where \( V \) is a set of vertices and \( E \) is a set of edges.
-   A source vertex \( s \) from which the shortest paths to all other vertices will be calculated.
-   A weight function \( w: E \to \mathbb{R} \), mapping edges to real-valued weights.

## Output:

-   The shortest path distances from the source vertex \( s \) to all other vertices in \( V \).
-   Predecessor information to reconstruct the shortest paths.
-   A boolean flag indicating the presence of a negative weight cycle reachable from \( s \).

## Algorithm Type

The Bellman-Ford algorithm is a dynamic programming algorithm. It iteratively relaxes distances to all vertices, taking advantage of previous computations to update the shortest path estimates.

Here's a high-level overview of the algorithm:

1. Initialize the distance to the source vertex as 0, and the distances to all other vertices as infinity.
2. For each vertex, apply relaxation for all edges. Repeat this step \( |V| - 1 \) times.
3. Check for negative-weight cycles by attempting to relax all edges once more. If we can get a shorter path for any vertex, then a negative-weight cycle exists.

## Implementation

Below is an implementation of the Bellman-Ford algorithm in TypeScript. This function adheres to your function signature and aims to provide a clear and descriptive example of how the algorithm works.

```typescript
declare type GraphEdge = { to: number; weight: number };
declare type WeightedAdjacencyList = GraphEdge[][];

/**
 * Finds the shortest paths from a source vertex to all other vertices in a weighted, directed graph using the Bellman-Ford Algorithm.
 *
 * @param {WeightedAdjacencyList} graph - The graph represented as a weighted adjacency list.
 * @param {number} source - The source vertex from which to find the shortest paths.
 * @returns {number[]} An array representing the shortest path lengths from the source vertex to all other vertices. Returns null if a negative weight cycle is detected.
 *
 */
export function bellmanFord(
    graph: WeightedAdjacencyList,
    source: number,
): number[] | null {
    // Initialize distance array and set the distance to the source vertex to 0
    const distances: number[] = Array(graph.length).fill(Infinity);
    distances[source] = 0;

    // Relax edges |V| - 1 times
    for (let i = 1; i < graph.length; i++) {
        for (let u = 0; u < graph.length; u++) {
            for (const edge of graph[u]) {
                const newDistance = distances[u] + edge.weight;
                if (newDistance < distances[edge.to]) {
                    distances[edge.to] = newDistance;
                }
            }
        }
    }

    // Check for negative weight cycles
    for (let u = 0; u < graph.length; u++) {
        for (const edge of graph[u]) {
            if (distances[u] + edge.weight < distances[edge.to]) {
                // Negative weight cycle detected
                return null;
            }
        }
    }

    return distances;
}
```

### Explanation:

1. **Initialization**: We start by initializing a `distances` array where `distances[i]` will store the shortest distance from the `source` vertex to vertex `i`. The distance from the `source` to itself is 0, and the distance to all other vertices is initialized to `Infinity`.

2. **Edge Relaxation**: The core of the Bellman-Ford algorithm is edge relaxation. We go through all the vertices and for each vertex, we update all its adjacent vertices. This is done `|V| - 1` times, where `|V|` is the number of vertices in the graph.

3. **Negative Cycle Detection**: Finally, we run one more iteration of edge relaxation to check for negative weight cycles. If we are still able to update any `distances`, then a negative weight cycle is present, and we return `null`.

4. **Return Result**: If no negative cycles are detected, the `distances` array will have the shortest path lengths from the source vertex to all other vertices, which we then return.

### Time Complexity:

The Bellman-Ford algorithm has a time complexity of \(O(V \times E)\), where \(V\) is the number of vertices and \(E\) is the number of edges in the graph.

Here's the breakdown:

1. Initialization takes \(O(V)\) time to set up the distance array.
2. The main loop iterates \(|V|-1\) times. In each iteration, it goes through all the edges \(E\). This results in \(O((V - 1) \times E) = O(V \times E)\).
3. Checking for negative weight cycles involves another pass through all the edges, which is \(O(E)\).

Adding these together gives \(O(V) + O(V \times E) + O(E) = O(V \times E)\).

### Space Complexity:

The space complexity of the Bellman-Ford algorithm is \(O(V)\).

The main data structures used are:

1. The `distances` array, which stores the shortest path distances from the source vertex to every other vertex. This takes \(O(V)\) space.

No additional data structures with significant space requirements are used, so the total space complexity remains \(O(V)\).
