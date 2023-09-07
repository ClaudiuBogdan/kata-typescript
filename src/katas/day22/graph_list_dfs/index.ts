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
        if (node === target) {
            return getPath(node, prev);
        }
        seen[node] = true;
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

function getPath(initialNode: number, prev: number[]): number[] {
    const path: number[] = [];
    let node = initialNode;
    for (let i = 0; i <= prev.length; i++) {
        if (node === -1) {
            return path.reverse();
        }
        path.push(node);
        node = prev[node];
    }
    throw new Error("Invalid path.");
}
