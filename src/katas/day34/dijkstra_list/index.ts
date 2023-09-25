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
    const seen: boolean[] = new Array(arr.length).fill(false);
    const dist: number[] = new Array(arr.length).fill(Infinity);
    const prev: number[] = new Array(arr.length).fill(-1);
    //Set starting node with dist 0
    dist[source] = 0;
    while (hasUnseenNodes(seen, dist)) {
        const node = getMinNode(seen, dist);
        seen[node] = true;
        if (node === target) {
            return getPath(prev, target);
        }
        for (const edge of arr[node]) {
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

function hasUnseenNodes(seen: boolean[], dist: number[]): boolean {
    return dist.some((d, i) => d < Infinity && !seen[i]);
}

function getMinNode(seen: boolean[], dist: number[]): number {
    let node = null;
    let minDist = Infinity;
    for (let i = 0; i < dist.length; i++) {
        if (!seen[i] && dist[i] < minDist) {
            node = i;
            minDist = dist[i];
        }
    }
    if (node === null) {
        throw new Error("No min node available");
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
    throw new Error("Unable to get path. Invalid prev array.");
}
