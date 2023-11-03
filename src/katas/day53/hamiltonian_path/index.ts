/**
 * Represents a directed graph using an adjacency matrix.
 */
type Graph = number[][];

/**
 * Finds a Hamiltonian path in a directed graph, if it exists.
 *
 * @param {Graph} graph - The adjacency matrix representation of the graph.
 * @returns {number[] | null} - An array representing the Hamiltonian path, or null if none exists.
 *
 * @example
 * const graph = [
 *   [0, 1, 0, 1],
 *   [1, 0, 1, 0],
 *   [0, 1, 0, 1],
 *   [1, 0, 1, 0]
 * ];
 * hamiltonianPath(graph);  // returns [0, 1, 2, 3]
 */
export function hamiltonianPath(graph: Graph): number[] | null {
    for (let startVertex = 0; startVertex < graph.length; startVertex++) {
        const path: number[] = new Array(graph.length).fill(-1);
        const visited: boolean[] = new Array(graph.length).fill(false);
        path[0] = startVertex;
        visited[startVertex] = true;

        if (hamiltonianPathUtil(graph, path, visited, 1)) {
            return path;
        }
    }
    return null;
}

function hamiltonianPathUtil(
    graph: Graph,
    path: number[],
    visited: boolean[],
    pos: number,
): boolean {
    // Base case: all the vertices are included in the path
    if (pos === graph.length) {
        return true;
    }

    for (let v = 0; v < graph.length; v++) {
        if (isSafe(graph, path, pos, visited, v)) {
            path[pos] = v;
            visited[v] = true;
            if (hamiltonianPathUtil(graph, path, visited, pos + 1)) {
                return true;
            }
            path[pos] = -1;
            visited[v] = false;
        }
    }
    return false;
}

function isSafe(
    graph: Graph,
    path: number[],
    pos: number,
    visited: boolean[],
    v: number,
): boolean {
    if (graph[path[pos - 1]][v] === 0) {
        return false;
    }

    if (visited[v]) {
        return false;
    }

    if (graph[v].every((edge) => edge === 0)) {
        return false;
    }

    return true;
}
