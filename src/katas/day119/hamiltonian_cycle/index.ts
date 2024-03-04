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
const source = 0;

export function findHamiltonianCycle(graph: Graph): number[] | null {
    if (graph.length === 1) {
        return [0, 0];
    }

    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = new Array(graph.length).fill(-1);
    const pos = 0;

    path[source] = pos;

    if (findHamiltonianPathUtils(seen, path, graph, pos + 1)) {
        return path.concat(0);
    }

    return null;
}

function findHamiltonianPathUtils(
    seen: boolean[],
    path: number[],
    graph: Graph,
    pos: number,
): boolean {
    if (pos === graph.length) {
        return graph[path[pos - 1]][source] === 1;
    }

    for (let v = 1; v < graph.length; v++) {
        if (isSafe(seen, path, graph, pos, v)) {
            path[pos] = v;
            seen[v] = true;

            if (findHamiltonianPathUtils(seen, path, graph, pos + 1)) {
                return true;
            }

            path[pos] = -1;
            seen[v] = false;
        }
    }

    return false;
}

function isSafe(
    seen: boolean[],
    path: number[],
    graph: Graph,
    pos: number,
    v: number,
) {
    if (seen[v]) {
        return false;
    }

    if (graph[path[pos - 1]][v] === 0) {
        return false;
    }

    return true;
}
