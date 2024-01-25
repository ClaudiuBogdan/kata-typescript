/**
 * @function Dijkstra
 * @description Dijkstra's algorithm is a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge weights, producing a shortest-path tree. This algorithm is used to find the minimum distance from the starting vertex to all other vertices in the given graph.
 * @link https://www.programiz.com/dsa/dijkstra-algorithm
 * @param target
 * @param sink
 * @param graph
 */
export default function dijkstra_list(
    source: number,
    target: number,
    graph: WeightedAdjacencyList,
): number[] {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const dist: number[] = new Array(graph.length).fill(Infinity);
    const prev: number[] = new Array(graph.length).fill(-1);

    dist[source] = 0;

    while (hasAvailableNode(seen, dist)) {
        const node = getAvailableNode(seen, dist);
        seen[node] = true;
        if (node === target) {
            return getPath(prev, target);
        }

        for (const edge of graph[node]) {
            if (seen[edge.to]) {
                continue;
            }
            const distance = dist[node] + edge.weight;
            if (distance < dist[edge.to]) {
                dist[edge.to] = distance;
                prev[edge.to] = node;
            }
        }
    }
    return [];
}

function hasAvailableNode(seen: boolean[], dist: number[]): boolean {
    return dist.some((distance, node) => !seen[node] && distance < Infinity);
}

function getAvailableNode(seen: boolean[], dist: number[]): number {
    let minNode = -1;
    let minDist = Infinity;
    for (let node = 0; node < dist.length; node++) {
        if (!seen[node] && dist[node] < minDist) {
            minNode = node;
            minDist = dist[node];
        }
    }
    return minNode;
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
