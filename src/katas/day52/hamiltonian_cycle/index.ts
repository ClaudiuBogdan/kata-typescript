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

    const path: number[] = new Array(graph.length).fill(-1);
    const visited: boolean[] = new Array(graph.length).fill(false);
    const pos = 1;

    path[0] = 0;
    visited[0] = true;

    if (hamiltonianCycleUtil(graph, path, pos, visited)) {
        return path.concat(path[0]);
    } else {
        return null;
    }
}

function hamiltonianCycleUtil(
    graph: Graph,
    path: number[],
    pos: number,
    visited: boolean[],
): boolean {
    if (pos === graph.length) {
        return graph[path[pos - 1]][path[0]] === 1;
    }

    for (let v = 1; v < graph.length; v++) {
        if (isSafe(graph, path, visited, pos, v)) {
            visited[v] = true;
            path[pos] = v;

            if (hamiltonianCycleUtil(graph, path, pos + 1, visited)) {
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
    if (visited[v]) {
        return false;
    }

    if (graph[path[pos - 1]][v] === 0) {
        return false;
    }

    return true;
}
