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
    const parentDist: number[] = new Array(list.length).fill(-1);
    const seen: boolean[] = new Array(list.length).fill(false);
    const prev: number[] = new Array(list.length).fill(-1);
    const mst: WeightedAdjacencyList = Array.from(
        { length: list.length },
        () => [],
    );
    const getMinNode = (): number => {
        let minDist = Infinity;
        let node = -1;
        for (let i = 0; i < dist.length; i++) {
            const distance = dist[i];
            if (!seen[i] && distance < minDist) {
                minDist = distance;
                node = i;
            }
        }
        return node;
    };
    dist[0] = 0;
    for (let i = 0; i < list.length; i++) {
        const node = getMinNode();
        seen[node] = true;
        const parent = prev[node];
        if (parent !== -1) {
            const distance = parentDist[node];
            mst[node].push({ to: parent, weight: distance });
            mst[parent].push({ to: node, weight: distance });
        }
        for (let edge of list[node]) {
            if (seen[edge.to]) {
                continue;
            }
            const distance = edge.weight;
            if (distance < dist[edge.to]) {
                dist[edge.to] = distance;
                prev[edge.to] = node;
                parentDist[edge.to] = edge.weight;
            }
        }
    }
    return mst;
}
