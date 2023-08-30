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
    const prev: number[] = new Array(arr.length).fill(-1);
    const seen: boolean[] = new Array(arr.length).fill(false);

    dist[source] = 0;
    let node = source;
    while (checkHasUnvisitedNodes(seen, dist)) {
        node = getMinDistanceNode(seen, dist);
        seen[node] = true;
        if (node === target) {
            return getPath(prev, node);
        }
        // Update the distance
        for (let edge of arr[node]) {
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

function checkHasUnvisitedNodes(seen: boolean[], dist: number[]): boolean {
    for (let i = 0; i < dist.length; i++) {
        if (!seen[i] && dist[i] < Infinity) {
            return true;
        }
    }
    return false;
}

function getMinDistanceNode(seen: boolean[], dist: number[]): number {
    let minDist = Infinity;
    let node = -1;
    for (let i = 0; i < dist.length; i++) {
        if (!seen[i] && dist[i] < minDist) {
            minDist = dist[i];
            node = i;
        }
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
    throw new Error("Invalid prev array.");
}
