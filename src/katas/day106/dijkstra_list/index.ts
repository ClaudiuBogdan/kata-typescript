import { PriorityQueue } from "@utils/dsa/priority_queue";

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
    const prev: number[] = new Array(graph.length).fill(-1);
    const dist: number[] = new Array(graph.length).fill(Infinity);
    const queue: PriorityQueue<{ node: number; distance: number }> =
        new PriorityQueue((a, b) => a.distance - b.distance);
    queue.enqueue({ node: source, distance: 0 });
    dist[source] = 0;

    while (!queue.isEmpty()) {
        const { node } = queue.dequeue()!;

        if (node === target) {
            return getPath(prev, target);
        }

        for (const edge of graph[node]) {
            const distance = dist[node] + edge.weight;
            if (distance < dist[edge.to]) {
                queue.enqueue({ node: edge.to, distance });
                prev[edge.to] = node;
                dist[edge.to] = distance;
            }
        }
    }
    return [];
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
