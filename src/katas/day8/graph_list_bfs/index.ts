/**
 * @function bfs - Breadth first search
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
    // 1. Deque or exit if queue is empty.
    // 2. Set the prev value to the node from where we visited the node. This will be used to get the path.
    // 2. Check if the node is equal to the target
    // 2. If not equal, set seen flag and queue the node children that are note visited.
    // 3. If is equal,
    // 3. Repeat
    const q: number[] = [];
    const seen: boolean[] = [];
    const prev: number[] = [];

    q.push(source);
    prev[source] = -1;
    do {
        const node = q.shift()!;
        seen[node] = true;
        if (node === target) {
            return getPath(node, prev);
        }
        // Do we overwrite the prev array if the node is not a solution?
        const edges = graph[node];
        for (let edge of edges) {
            if (!seen[edge.to]) {
                prev[edge.to] = node;
                q.push(edge.to);
            }
        }
    } while (q.length > 0);
    return null;
}

function getPath(source: number, prev: number[]): number[] {
    const path = [];
    let node = source;
    for (let i = 0; i < prev.length; i++) {
        path.push(node);
        node = prev[node];
        if (node === -1) {
            return path.reverse();
        }
    }
    throw new Error("Prev is a cyclic graph");
}
