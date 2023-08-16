/**
 * @function Dijkstra
 * @description Dijkstra's algorithm is a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge weights, producing a shortest-path tree. This algorithm is used to find the minimum distance from the starting vertex to all other vertices in the given graph.
 * @link https://www.programiz.com/dsa/dijkstra-algorithm
 * @param source
 * @param target
 * @param arr
 */
export default function dijkstra_list(
    source: number,
    target: number,
    arr: WeightedAdjacencyList,
): number[] {
    const seen: boolean[] = new Array(arr.length).fill(false);
    const prev: number[] = new Array(arr.length).fill(-1);
    const dist: number[] = new Array(arr.length).fill(Infinity);
    dist[source] = 0;
    while (hasUnvisitedNodes(dist, seen)) {
        const lo = getLowestDistanceNode(dist, seen);
        seen[lo] = true;
        
        for (let vertex of arr[lo]) {
            const node = vertex.to;
            const distance = dist[lo] + vertex.weight;
            if (!seen[node] && distance < dist[node]) {
                dist[node] = distance;
                prev[node] = lo;
            }
            if (node === target) {
                return getPath(prev, target);
            }
        }
    }
    return [];
}

function hasUnvisitedNodes(dist: number[], seen: boolean[]): boolean {
    return dist.some((distance, node) => !seen[node] && distance < Infinity);
}

// This can be optimized by using a min heap
function getLowestDistanceNode(dist: number[], seen: boolean[]): number {
    let lowestDistance = Infinity;
    let lowestNode = -1;
    for (let i = 0; i < dist.length; i++) {
        if (!seen[i] && dist[i] < lowestDistance) {
            lowestNode = i;
            lowestDistance = dist[i];
        }
    }
    return lowestNode;
}

function getPath(prev: number[], target: number): number[] {
    const path: number[] = [];
    let node = target;
    path.push(node);
    for (let i = 0; i < prev.length; i++) {
        node = prev[node];
        if (node === -1) {
            return path.reverse();
        }
        path.push(node);
    }
    throw new Error("Invalid prev array");
}
