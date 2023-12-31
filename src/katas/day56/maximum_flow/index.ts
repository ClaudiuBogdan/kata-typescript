/**
 * Finds the maximum flow from source to sink in a weighted, directed graph.
 *
 * @param {WeightedAdjacencyList} graph - The adjacency list representation of the graph.
 * @param {number} source - The source vertex.
 * @param {number} sink - The sink vertex.
 * @returns {number} - The maximum flow from source to sink.
 *
 * @example
 * const graph = [
 *   [{ to: 1, wight: 10}, { to: 2, wight: 5 }],
 *   [{ to: 2, wight: 15 }],
 *   [{ to: 3, wight: 10 }],
 *   [{}]
 * };
 * findMaximumFlow(graph, 0, 3);  // returns 10
 */
export function findMaximumFlow(
    graph: WeightedAdjacencyList,
    source: number,
    sink: number,
): number {
    if (graph.length === 0) {
        return 0;
    }
    const n = graph.length;
    const capacity = Array.from({ length: n }, (_) => new Array(n).fill(0));
    const parent: number[] = new Array(n).fill(-1);
    let maxFlow = 0;

    // Construct the capacity matrix
    for (let u = 0; u < n; u++) {
        for (const edge of graph[u]) {
            capacity[u][edge.to] = edge.weight;
        }
    }

    while (bfs(capacity, graph, parent, source, sink)) {
        // Find the minimum residual capacity of the edges along the path
        let pathFlow = Infinity;
        for (let v = sink; v !== source; v = parent[v]) {
            pathFlow = Math.min(pathFlow, capacity[parent[v]][v]);
        }

        // Update the residual capacity of the edges and reverse edges
        for (let v = sink; v !== source; v = parent[v]) {
            const u = parent[v];
            capacity[u][v] -= pathFlow;
            capacity[v][u] += pathFlow;
        }

        maxFlow += pathFlow;
    }

    return maxFlow;
}

function bfs(
    capacity: number[][],
    graph: WeightedAdjacencyList,
    parent: number[],
    source: number,
    sink: number,
): boolean {
    const visited: boolean[] = new Array(graph.length).fill(false);
    const queue: number[] = [];
    queue.push(source);
    visited[source] = true;
    parent[source] = -1;

    while (queue.length > 0) {
        const u = queue.shift()!;

        for (const edge of graph[u]) {
            if (!visited[edge.to] && capacity[u][edge.to] > 0) {
                parent[edge.to] = u;
                visited[edge.to] = true;
                queue.push(edge.to);
                if (edge.to === sink) {
                    return true;
                }
            }
        }
    }
    return false;
}
