/**
 * @function DepthFirstSearch - Depth first search on graph
 * @description
 * @link https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/
 * @param graph WeightedAdjacencyList
 * @param source
 * @param needle
 */
export default function depthFirstSearch(
    graph: WeightedAdjacencyList,
    source: number,
    target: number,
): number[] | null {
    const path: number[] = [];
    const seen: boolean[] = [];
    const hasFound = dfs(graph, source, target, seen, path);
    if (!hasFound) {
        return null;
    }
    return path.reverse();
}

function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    target: number,
    seenNodes: boolean[],
    nodesPath: number[],
): boolean {
    const isVisited = seenNodes[source];
    if (isVisited) {
        return false;
    } else {
        seenNodes[source] = true;
    }
    if (source === target) {
        nodesPath.push(source);
        return true;
    }
    const edges = graph[source];
    for (let edge of edges) {
        const hasFoundTarget = dfs(
            graph,
            edge.to,
            target,
            seenNodes,
            nodesPath,
        );
        if (hasFoundTarget) {
            nodesPath.push(source);
            return true;
        }
    }

    return false;
}
