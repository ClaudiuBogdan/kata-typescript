/**
 * Represents a directed graph using an adjacency matrix.
 */
type Graph = number[][];

/**
 * Finds a Hamiltonian cycle in a directed graph, if it exists.
 *
 * @param {Graph} graph - The adjacency matrix representation of the graph.
 * @returns {number[] | null} - An array representing the Hamiltonian cycle, or null if none exists.
 *
 * @example
 * const graph = [
 *   [0, 1, 0, 1, 0],
 *   [1, 0, 1, 1, 1],
 *   [0, 1, 0, 0, 1],
 *   [1, 1, 0, 0, 1],
 *   [0, 1, 1, 1, 0]
 * ];
 * hamiltonianCycle(graph);  // returns [0, 1, 2, 4, 3, 0]
 */
export function findHamiltonianCycle(graph: Graph): number[] | null {
    if (graph.length === 0) {
        return null;
    }
    if (graph.length === 1) {
        return [0, 0];
    }

    const vertices = graph.length;
    const visited: boolean[] = new Array(vertices).fill(false);
    const path: number[] = new Array(vertices).fill(-1);
    const source = 0;
    const pos = 0;
    visited[source] = true;
    path[pos] = source;
    if (findHamiltonianPathUtil(graph, visited, path, pos + 1)) {
        return path.concat(source);
    }
    return null;
}

function findHamiltonianPathUtil(
    graph: Graph,
    visited: boolean[],
    path: number[],
    pos: number,
): boolean {
    if (pos === graph.length) {
        return graph[path[pos - 1]][0] === 1;
    }

    for (let v = 0; v < graph.length; v++) {
        if (isSafe(graph, visited, path, pos, v)) {
            visited[v] = true;
            path[pos] = v;

            if (findHamiltonianPathUtil(graph, visited, path, pos + 1)) {
                return true;
            }

            visited[v] = false;
            path[pos] = -1;
        }
    }
    return false;
}

function isSafe(
    graph: Graph,
    visited: boolean[],
    path: number[],
    pos: number,
    v: number,
): boolean {
    // Check if there is an edge from the last pos to the current vertex
    if (graph[path[pos - 1]][v] === 0) {
        return false;
    }

    // Check if the edge has been visited
    if (visited[v]) {
        return false;
    }

    return true;
}
