import { PriorityQueue } from "@utils/dsa/priority_queue";

export default function dijkstra_list(
    source: number,
    target: number,
    graph: WeightedAdjacencyList,
): number[] {
    const dist: number[] = new Array(graph.length).fill(Infinity);
    const prev: number[] = new Array(graph.length).fill(-1);
    const pq = new PriorityQueue<{ node: number; distance: number }>(
        (a, b) => a.distance - b.distance,
    );

    dist[source] = 0;
    pq.enqueue({ node: source, distance: 0 });

    while (!pq.isEmpty()) {
        const { node } = pq.dequeue()!;
        if (node === target) {
            return getPath(prev, target);
        }

        for (const edge of graph[node]) {
            const distance = dist[node] + edge.weight;
            if (distance < dist[edge.to]) {
                dist[edge.to] = distance;
                prev[edge.to] = node;
                pq.enqueue({ node: edge.to, distance });
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
