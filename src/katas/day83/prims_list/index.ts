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
    const dist: number[] = new Array(graph.length).fill(Infinity);
    const prev: number[] = new Array(graph.length).fill(-1);
    const mst: WeightedAdjacencyList = Array.from(
        { length: graph.length },
        () => [],
    );
    dist[0] = 0;
    while (hasAvailableNode(seen, dist)) {
        const node = getMinNode(seen, dist);
        seen[node] = true;
        const parent = prev[node];
        if (parent !== -1) {
            mst[parent].push({ to: node, weight: dist[node] });
            mst[node].push({ to: parent, weight: dist[node] });
        }
        for (const edge of graph[node]) {
            if (seen[edge.to]) {
                continue;
            }
            const distance = edge.weight;
            if (distance < dist[edge.to]) {
                prev[edge.to] = node;
                dist[edge.to] = distance;
            }
        }
    }
    return mst;
}

function hasAvailableNode(seen: boolean[], dist: number[]) {
    return dist.some((distance, node) => !seen[node] && distance < Infinity);
}

function getMinNode(seen: boolean[], dist: number[]): number {
    let minNode = -1;
    let minDist = Infinity;
    for (let i = 0; i < dist.length; i++) {
        if (!seen[i] && dist[i] < minDist) {
            minNode = i;
            minDist = dist[i];
        }
    }
    return minNode;
}