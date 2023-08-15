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
    const prev: number[] = [];
    const visited: boolean[] = new Array(graph.length).fill(false);
    const q: number[] = [];
    q.push(source);
    visited[source] = true;

    while (q.length > 0) {
        const node = q.shift() as number; // q can't return undefined inside the while loop
        if (node === target) {
            return getPath(prev, target);
        }
        for (let i = 0; i < graph[node].length; i++) {
            if (graph[node][i] !== 0 && !visited[i]) {
                q.push(i);
                visited[i] = true;
                prev[i] = node;
            }
        }
    }
    return null;
}

function getPath(prev: (number | undefined)[], target: number): number[] {
    const path: number[] = [];
    let parent: number | undefined = target;
    path.push(parent);
    for (let i = 0; i < prev.length; i++) {
        parent = prev[parent];
        if (parent === undefined) {
            break;
        }
        path.push(parent);
    }
    return path.reverse();
}
