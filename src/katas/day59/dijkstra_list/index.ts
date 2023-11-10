/**
 * @function Dijkstra
 * @description Dijkstra's algorithm is a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge weights, producing a shortest-path tree. This algorithm is used to find the minimum distance from the starting vertex to all other vertices in the given graph.
 * @link https://www.programiz.com/dsa/dijkstra-algorithm
 * @param target
 * @param sink
 * @param arr
 */
export default function dijkstra_list(
    source: number,
    target: number,
    graph: WeightedAdjacencyList,
): number[] {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const distances: number[] = new Array(graph.length).fill(Infinity);
    const prev: number[] = new Array(graph.length).fill(-1);

    distances[source] = 0;

    while (hasAvailableNode(seen, distances)) {
        const node = getMinNode(seen, distances);
        seen[node] = true;
        if (node === target) {
            return getPath(prev, target);
        }
        for (const edge of graph[node]) {
            if (seen[edge.to]) {
                continue;
            }
            const distance = distances[node] + edge.weight;
            if (distance < distances[edge.to]) {
                prev[edge.to] = node;
                distances[edge.to] = distance;
            }
        }
    }
    return [];
}

function hasAvailableNode(seen: boolean[], distances: number[]): boolean {
    return distances.some(
        (distance, node) => !seen[node] && distance < Infinity,
    );
}

function getMinNode(seen: boolean[], distances: number[]): number {
    let node = -1;
    let minDistance = Infinity;
    for (let i = 0; i < distances.length; i++) {
        if (!seen[i] && distances[i] < minDistance) {
            node = i;
            minDistance = distances[i];
        }
    }
    return node;
}

function getPath(prev: number[], target: number): number[] {
    const path: number[] = [];
    let node = target;
    while (node !== -1) {
        path.push(node);
        node = prev[node];
    }
    return path.reverse();
}
