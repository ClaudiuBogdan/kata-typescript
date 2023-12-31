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
    if (graph.length === 0) {
        return [];
    }

    const distances = new Array(graph.length).fill(Infinity);
    distances[source] = 0;

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

    for (let u = 0; u < graph.length; u++) {
        for (const edge of graph[u]) {
            if (distances[u] + edge.weight < distances[edge.to]) {
                return null;
            }
        }
    }
    
    return distances;
}
