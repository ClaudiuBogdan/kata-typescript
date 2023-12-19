/**
 * @function DepthFirstSearch - Depth first search on graph
 * @description 
 * @link https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/
 * @param graph WeightedAdjacencyList
 * @param source 
 * @param needle 
 */
export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    target: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);

    const search = (node: number): number[] | null => {
        seen[node] = true;
        if (node === target) {
            return getPath(prev, target);
        }
        for (let edge of graph[node]) {
            if (seen[edge.to]) {
                continue;
            }
            prev[edge.to] = node;
            const path = search(edge.to);
            if (path) {
                return path;
            }
        }
        return null;
    };

    return search(source);
}

function getPath(prev: number[], target: number): number[] {
    const path: number[] = [];
    let node = target;
    while (node !== -1) {
        path.push(node);
        node = prev[node];
    }
    return path.reverse();
}