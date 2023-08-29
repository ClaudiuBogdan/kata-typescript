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
    const queue: number[] = [];
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);
    let node = source;
    queue.push(source);
    while (node !== target && queue.length > 0) {
        node = queue.shift()!;
        seen[node] = true;
        for (let edge of graph[node]) {
            if (!seen[edge.to]) {
                prev[edge.to] = node;
                queue.push(edge.to);
            }
        }
    }
    if (node === target) {
        const path = getPath(prev, node);
        return path;
    } else {
        return null;
    }
}

function getPath(prev: number[], target: number): number[] {
    const path: number[] = [];
    let node = target;
    for (let i = 0; i < prev.length; i++) {
        const parent = prev[node];
        path.push(node);
        if (parent === -1) {
            return path.reverse();
        }
        node = parent;
    }
    throw new Error("Invalid prev array");
}
