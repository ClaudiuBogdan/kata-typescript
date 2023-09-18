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
    arr: WeightedAdjacencyList,
): number[] {
    const dist: number[] = new Array(arr.length).fill(Infinity);
    const seen: boolean[] = new Array(arr.length).fill(false);
    const prev: number[] = new Array(arr.length).fill(-1);
    dist[source] = 0;

    while (hasUnvisitedNodes(seen, dist)) {
        const node = getMinNode(seen, dist);
        seen[node] = true;
        if (node === target) {
            return getPath(prev, target);
        }

        for (const edge of arr[node]) {
            if (seen[edge.to]) {
                continue;
            }
            const distance = dist[node] + edge.weight; // TODO: use the weight of the edge instead of edge.to 🤣
            if (distance < dist[edge.to]) {
                dist[edge.to] = distance;
                prev[edge.to] = node;
            }
        }
    }
    return [];
}

function hasUnvisitedNodes(seen: boolean[], dist: number[]): boolean {
    return dist.some((d, idx) => d < Infinity && !seen[idx]);
}

function getMinNode(seen: boolean[], dist: number[]): number {
    let node = -1;
    let minDist = Infinity;
    for (let i = 0; i < dist.length; i++) {
        if (seen[i]) {
            continue;
        }
        const distance = dist[i];
        if (distance < minDist) {
            node = i;
            minDist = distance;
        }
    }
    if (node === -1) {
        throw new Error("No unvisited nodes available");
    }
    return node;
}

function getPath(prev: number[], target: number): number[] {
    const path: number[] = [];
    let node = target;
    for (let i = 0; i <= prev.length; i++) {
        if (node === -1) {
            return path.reverse();
        }
        path.push(node);
        node = prev[node];
    }
    throw new Error("Enable to get path from prev array");
}
