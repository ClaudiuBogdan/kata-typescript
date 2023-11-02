# Floyd-Warshall Algorithm

## Problem Description

The Floyd-Warshall algorithm is used to find the shortest paths between all pairs of vertices in a weighted, directed graph. The graph may contain negative weight edges, but it should not contain any negative weight cycles (cycles in a graph where the total sum of the edge weights is negative) as the shortest path is not defined in the presence of negative weight cycles.

Given:

-   A graph \( G = (V, E) \) where \( V \) is the set of vertices and \( E \) is the set of edges.
-   A weight function \( w: E \to \mathbb{R} \) that assigns a real-valued weight to each edge of the graph.

The goal is to determine the shortest path from every vertex to every other vertex in the graph.

## Solution - Floyd-Warshall Algorithm

The Floyd-Warshall algorithm is a dynamic programming solution to the all-pairs shortest path problem. It works by systematically trying all possible paths between every pair of vertices and updating the shortest path if a shorter path is found. The algorithm maintains a matrix \( D \) where \( D[i][j] \) represents the shortest path from vertex \( i \) to vertex \( j \).

### Algorithm Pseudocode:

1. Initialize the distance matrix \( D \) such that:

    - \( D[i][j] = \text{weight of edge from i to j} \) if there is an edge from \( i \) to \( j \)
    - \( D[i][j] = \infty \) if vertices \( i \) and \( j \) are not connected directly.
    - \( D[i][i] = 0 \) for all \( i \).

2. For each vertex \( k \) from 1 to \( |V| \) (number of vertices): For each vertex \( i \) from 1 to \( |V| \): For each vertex \( j \) from 1 to \( |V| \): \( D[i][j] = \min(D[i][j], D[i][k] + D[k][j]) \)

3. After the above steps, \( D \) will have the shortest paths between all pairs of vertices.

The time complexity of the Floyd-Warshall algorithm is \( O(V^3) \), where \( V \) is the number of vertices in the graph.

Now, let's see a simple implementation in TypeScript.

Here's a simple implementation of the Floyd-Warshall algorithm in TypeScript:

```typescript
function floydWarshall(graph: number[][]): number[][] {
    const V = graph.length;
    let dist: number[][] = [...Array(V)].map((row) =>
        [...Array(V)].map(() => Infinity),
    );

    // Step 1: Initialize the distance matrix
    for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
            if (i === j) dist[i][j] = 0;
            else if (graph[i][j] !== 0) dist[i][j] = graph[i][j];
        }
    }

    // Step 2: Calculate shortest paths
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }

    return dist;
}
```

This function takes as input a graph represented as a 2D matrix, where `graph[i][j]` represents the weight of the edge from vertex `i` to vertex `j`. If there's no direct edge between the vertices, it is represented as `0`.

The function returns a 2D matrix `dist` where `dist[i][j]` gives the shortest distance from vertex `i` to vertex `j`.
