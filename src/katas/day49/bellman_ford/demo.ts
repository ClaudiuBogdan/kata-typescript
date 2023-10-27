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
    // Handle empty graph
    if (graph.length === 0) {
        return [];
    }

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
