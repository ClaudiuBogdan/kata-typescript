/**
 * Finds the shortest paths between all pairs of vertices in a weighted, directed graph using the Floyd-Warshall Algorithm.
 *
 * @param {number[][]} graph - A 2D array representing the adjacency matrix of the graph. graph[i][j] represents the weight of the edge from vertex i to vertex j. Infinity indicates no edge.
 * @returns {number[][]} A 2D array representing the shortest path lengths between all pairs of vertices.
 *
 * @example
 * floydWarshall([[0, 5, Infinity, 10], [Infinity, 0, 3, Infinity], [Infinity, Infinity, 0, 1], [Infinity, Infinity, Infinity, 0]]);
 * returns [[0, 5, 8, 9], [Infinity, 0, 3, 4], [Infinity, Infinity, 0, 1], [Infinity, Infinity, Infinity, 0]]
 */
export function floydWarshall(graph: number[][]): number[][] {
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
