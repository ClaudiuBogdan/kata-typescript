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
    const totalVertices = list.length;
    const initialNode = 0;
    const seen: boolean[] = new Array(totalVertices).fill(false);
    const dist: number[] = new Array(totalVertices).fill(Infinity);
    const prev: number[] = new Array(totalVertices).fill(-1)
    const mst: WeightedAdjacencyList = new Array(totalVertices).fill([]);
    dist[initialNode] = 0;

    for (let totalSeen = 0; totalSeen < totalVertices; totalSeen++) {
        const lo = getLowestDistanceNode(dist, seen);
        seen[lo] = true;
        const parent = prev[lo]
        if(parent >= 0){
            mst[parent] = mst[parent].concat(list[parent].filter(edge => edge.to === lo))
            mst[lo] = mst[lo].concat(list[lo].filter(edge => edge.to === parent))
        }

        for (let edge of list[lo]) {
            const distance = edge.weight;
            if (!seen[edge.to] && distance < dist[edge.to]) {
                dist[edge.to] = distance;
                prev[edge.to] = lo;
            }
        }
    }

    return mst;
}

function getLowestDistanceNode(dist: number[], seen: boolean[]): number {
    let minVertex = -1;
    let minDistance = Infinity;
    for (let i = 0; i < dist.length; i++) {
        if (!seen[i] && dist[i] < minDistance) {
            minVertex = i;
            minDistance = dist[i];
        }
    }
    return minVertex;
}
