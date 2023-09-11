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
    const prev: number[] = new Array(arr.length).fill(-1);
    const dist: number[] = new Array(arr.length).fill(Infinity);
    //Set sources' distance to 0, as is the starting point of the path.
    dist[source] = 0;
    while (hasUnseenNodes(seen, dist)) {
        const node = getMinDistNode(seen, dist);
        seen[node] = true;
        if (node === target) {
            return getPath(prev, target);
        }
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

function hasUnseenNodes(seen: boolean[], dist: number[]): boolean {
    return dist.some((distance, node) => !seen[node] && distance < Infinity);
}

function getMinDistNode(seen: boolean[], dist: number[]): number {
    let minDist = Infinity;
    return dist.reduce((acc, distance, node) => {
        if (!seen[node] && distance < minDist) {
            minDist = distance;
            return node;
        }
        return acc;
    }, -1);
}

function getPath(prev: number[], target: number): number[] {
    const path: number[] = [];
    let node = target;
    for (let i = 0; i <= prev.length; i++) {
        path.push(node);
        if (prev[node] === -1) {
            return path.reverse();
        }
        node = prev[node];
    }
    throw new Error("Invalid prev array.");
}
