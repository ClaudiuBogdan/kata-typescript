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
    if (graph.length === 1) {
        return [0, 0];
    }
    const n = graph.length;
    const visited: boolean[] = new Array(n).fill(false);
    const path: number[] = new Array(n).fill(-1);
    const pos = 0;
    path[pos] = pos;
    visited[pos] = true;

    if (hamiltonianCycleUtil(graph, path, visited, pos + 1)) {
        return path.concat(0);
    }
    return null;
}

function hamiltonianCycleUtil(
    graph: Graph,
    path: number[],
    visited: boolean[],
    pos: number,
): boolean {
    if (pos === graph.length) {
        return graph[path[pos - 1]][0] === 1;
    }

    for (let v = 0; v < graph.length; v++) {
        if (isSafe(graph, path, visited, pos, v)) {
            visited[v] = true;
            path[pos] = v;

            if (hamiltonianCycleUtil(graph, path, visited, pos + 1)) {
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
    path: number[],
    visited: boolean[],
    pos: number,
    v: number,
): boolean {
    if (graph[path[pos - 1]][v] === 0) {
        return false;
    }

    if (visited[v]) {
        return false;
    }

    return true;
}
