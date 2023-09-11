/**
 * @function bfs - Breadth First search on a Matrix Graph
 * @description An adjacency matrix is a way of representing a graph as a matrix of booleans (0's and 1's). A finite graph can be represented in the form of a square matrix on a computer, where the boolean value of the matrix indicates if there is a direct path between two vertices.
 * @link https://www.programiz.com/dsa/graph-bfs
 * @param graph
 * @param source
 * @param target
 */
export default function breadthFirstSearch(
    graph: WeightedAdjacencyMatrix,
    source: number,
    target: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);
    const queue: number[] = [source];
    while (queue.length > 0) {
        const node = queue.shift() as number;
        seen[node] = true;
        if (node === target) {
            return getPath(prev, target);
        }
        for (let adjNode = 0; adjNode < graph.length; adjNode++) {
            if (graph[node][adjNode] === 0 || seen[adjNode]) {
                continue;
            }
            queue.push(adjNode);
            prev[adjNode] = node;
        }
    }
    return null;
}

function getPath(prev: number[], target: number): number[] {
    const path: number[] = [];
    let node = target;
    for (let i = 0; i <= prev.length; i++) {
        if (node === -1) {
            return path.reverse();
        }
        path.push(node);
        node = prev[node];
    }
    throw new Error("Invalid prev array.");
}
