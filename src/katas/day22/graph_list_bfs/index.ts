/**
 * @function dfs - Breadth first search
 * @description Searches for a path from source to target in a graph. Breadth first search means that we search the graph layer by layer, starting from the source adding the next layer of nodes to the queue.
 * @param graph
 * @param source
 * @param target
 */
export default function bfs(
    graph: WeightedAdjacencyList,
    source: number,
    target: number,
): number[] | null {
    const q: number[] = [source];
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);
    while (q.length > 0) {
        const node = q.shift() as number;
        seen[node] = true;
        if (node === target) {
            return getPath(node, prev);
        }
        for (let edge of graph[node]) {
            if (seen[edge.to]) {
                continue;
            }
            prev[edge.to] = node;
            q.push(edge.to);
        }
    }
    return null;
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
    throw new Error("Invalid prev array.");
}
