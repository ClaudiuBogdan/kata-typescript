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

    const visited: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = new Array(graph.length).fill(-1);
    const pos = 0;
    const source = 0;
    path[pos] = source;

    if (hamiltonianCycleUtil(graph, visited, path, pos + 1)) {
        return path.concat(0);
    }
    return null;
}

function hamiltonianCycleUtil(
    graph: Graph,
    visited: boolean[],
    prev: number[],
    pos: number,
): boolean {
    if (pos === graph.length) {
        return graph[prev[pos - 1]][0] === 1;
    }
    for (let v = 0; v < graph.length; v++) {
        if (isSafe(graph, visited, prev, pos, v)) {
            prev[pos] = v;
            visited[v] = true;

            if (hamiltonianCycleUtil(graph, visited, prev, pos + 1)) {
                return true;
            }

            prev[pos] = -1;
            visited[v] = false;
        }
    }
    return false;
}

function isSafe(
    graph: Graph,
    visited: boolean[],
    prev: number[],
    pos: number,
    v: number,
): boolean {
    if (visited[v]) {
        return false;
    }

    if (graph[prev[pos - 1]][v] === 0) {
        return false;
    }

    return true;
}