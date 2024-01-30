/**
 * @function DepthFirstSearch - Depth first search on graph
 * @description 
 * @link https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/
 * @param graph WeightedAdjacencyList
 * @param source 
 * @param needle 
 */
export default function dfs(graph: WeightedAdjacencyList, source: number, target: number): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    const search = (node: number): boolean => {
        seen[node] = true;
        if (node === target) {
            path.push(node);
            return true;
        }
        for (const edge of graph[node]) {
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

    return search(source) ? path.reverse() : null;
}