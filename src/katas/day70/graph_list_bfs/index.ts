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
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);
    const queue: number[] = new Array();
    queue.push(source);
    while (queue.length > 0) {
        const node = queue.shift()!;
        seen[node] = true;
        if (node === target) {
            return getPath(prev, target);
        }
        for (let edge of graph[node]) {
            if (seen[edge.to]) {
                continue;
            }
            queue.push(edge.to);
            prev[edge.to] = node;
        }
    }
    return null;
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
