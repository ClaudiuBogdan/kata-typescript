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
    const prev: number[] = new Array(graph.length).fill(-1);
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    const getPath = (target: number): number[] => {
        let node = target;
        for (let i = 0; i < prev.length; i++) {
            if (node === -1) {
                return path.reverse();
            }
            path.push(node);
            node = prev[node];
        }
        throw new Error("Invalid prev array.");
    };

    const search = (node: number): number[] | null => {
        seen[node] = true;
        if (node === target) {
            return getPath(node);
        }
        for (let edge of graph[node]) {
            if (seen[edge.to]) {
                continue;
            }
            prev[edge.to] = node;
            search(edge.to);
        }
        return path
    };
    search(source);
    return path.length > 0 ? path : null;
}
