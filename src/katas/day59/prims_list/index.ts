/**
 * @function Prims - Prim's algorithm for Minimum Spanning Tree
 * @description Prim's algorithm is a minimum spanning tree algorithm that takes a graph as input and finds the subset of the edges of that graph which form a tree that includes every vertex, and has the minimum sum of weights among all the trees that can be formed from the graph
 * @link https://www.programiz.com/dsa/prim-algorithm
 * @link https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/
 * @param graph
 */
export default function prims(
    graph: WeightedAdjacencyList,
): WeightedAdjacencyList | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const distances: number[] = new Array(graph.length).fill(Infinity);
    const prev: number[] = new Array(graph.length).fill(-1);
    const mst: WeightedAdjacencyList = Array.from(
        { length: graph.length },
        () => [],
    );
    distances[0] = 0; // Starting node

    while (hasAvailableNode(seen, distances)) {
        const node = getMinDistanceNode(seen, distances);
        seen[node] = true;
        if (prev[node] !== -1) {
            const parent = prev[node];
            mst[parent].push({ to: node, weight: distances[node] });
            mst[node].push({ to: parent, weight: distances[node] });
        }
        for (const edge of graph[node]) {
            if (seen[edge.to]) {
                continue;
            }
            const distance = edge.weight;
            if (distance < distances[edge.to]) {
                prev[edge.to] = node;
                distances[edge.to] = distance;
            }
        }
    }

    return mst;
}

function hasAvailableNode(seen: boolean[], distances: number[]): boolean {
    return distances.some(
        (distance, node) => !seen[node] && distance < Infinity,
    );
}

function getMinDistanceNode(seen: boolean[], distances: number[]): number {
    let node = -1;
    let minDistance = Infinity;
    for (let i = 0; i < distances.length; i++) {
        if (!seen[i] && distances[i] < minDistance) {
            node = i;
            minDistance = distances[i];
        }
    }
    if (node === -1) {
        throw new Error("Unable to get min distance node");
    }
    return node;
}
