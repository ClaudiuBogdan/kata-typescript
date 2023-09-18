/**
 * @function Prims - Prim's algorithm for Minimum Spanning Tree
 * @description Prim's algorithm is a minimum spanning tree algorithm that takes a graph as input and finds the subset of the edges of that graph which form a tree that includes every vertex, and has the minimum sum of weights among all the trees that can be formed from the graph
 * @link https://www.programiz.com/dsa/prim-algorithm
 * @link https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/
 * @param list
 */
export default function prims(
    list: WeightedAdjacencyList,
): WeightedAdjacencyList | null {
    const dist: number[] = new Array(list.length).fill(Infinity);
    const seen: boolean[] = new Array(list.length).fill(false);
    const prev: number[] = new Array(list.length).fill(-1);
    const mst: WeightedAdjacencyList = Array.from(
        { length: list.length },
        () => [],
    );
    dist[0] = 0;
    while (hasUnvisitedNodes(seen, dist)) {
        const node = getMinNode(seen, dist);
        seen[node] = true;
        const parent = prev[node];

        if (parent !== -1) {
            mst[node].push({ to: parent, weight: dist[node] });
            mst[parent].push({ to: node, weight: dist[node] });
        }

        for (const edge of list[node]) {
            if (seen[edge.to]) {
                continue;
            }
            const distance = edge.weight;
            if (distance < dist[edge.to]) {
                dist[edge.to] = distance;
                prev[edge.to] = node;
            }
        }
    }
    return mst;
}

function hasUnvisitedNodes(seen: boolean[], dist: number[]): boolean {
    return dist.some((distance, node) => distance < Infinity && !seen[node]);
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
        throw new Error("No min node available");
    }
    return node;
}
