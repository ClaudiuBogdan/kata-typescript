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
    const seen: boolean[] = new Array(list.length).fill(false);
    const dist: number[] = new Array(list.length).fill(Infinity);
    const prev: number[] = new Array(list.length).fill(-1);
    const mst: WeightedAdjacencyList = Array.from(
        { length: list.length },
        () => [],
    );

    dist[0] = 0;

    while (hasUnseenNodes(seen, dist)) {
        const node = getMinDistNode(seen, dist);
        seen[node] = true;
        if (prev[node] !== -1) {
            const parent = prev[node];
            mst[node].push({ to: parent, weight: dist[node] });
            mst[parent].push({ to: node, weight: dist[node] });
        }
        for (let edge of list[node]) {
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

function hasUnseenNodes(seen: boolean[], dist: number[]): boolean {
    return dist.some((distance, node) => !seen[node] && distance < Infinity);
}

function getMinDistNode(seen: boolean[], dist: number[]): number {
    let minDistance = Infinity;
    return dist.reduce((acc, distance, node) => {
        if (!seen[node] && distance < minDistance) {
            minDistance = distance;
            return node;
        }
        return acc;
    }, -1);
}
