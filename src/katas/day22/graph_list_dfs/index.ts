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
    const seen: boolean[] = [];
    const path: number[] = [];

    const search = (node: number): boolean => {
        if (node === target) {
            path.push(node);
            return true;
        }
        seen[node] = true;
        for (let edge of graph[node]) {
            if (seen[edge.to]) {
                continue;
            }
            const found = search(edge.to);
            if (found) {
                path.push(node);
                return true;
            }
        }
        return false;
    };

    search(source);
    return path.length === 0 ? null : path.reverse();
}
