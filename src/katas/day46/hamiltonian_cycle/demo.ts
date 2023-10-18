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
        return [0, 0]; // Special case for single vertex
    }

    const path: number[] = new Array(graph.length).fill(-1);
    const visited: boolean[] = new Array(graph.length).fill(false);

    path[0] = 0;
    visited[0] = true;

    if (hamiltonianCycleUtil(graph, path, 1, visited)) {
        return path.concat(path[0]);
    } else {
        return null;
    }
}

function isSafe(
    v: number,
    visited: boolean[],
    graph: Graph,
    pos: number,
    path: number[],
): boolean {
    // Check if this vertex is an adjacent vertex of the last added vertex.
    if (graph[path[pos - 1]][v] === 0) {
        return false;
    }

    // Check if the vertex has already been included.
    if (visited[v]) {
        return false;
    }

    return true;
}

function hamiltonianCycleUtil(
    graph: Graph,
    path: number[],
    pos: number,
    visited: boolean[],
): boolean {
    if (pos === graph.length) {
        // Check if there is an edge from the last vertex to the first vertex
        return graph[path[pos - 1]][path[0]] === 1;
    }

    for (let v = 1; v < graph.length; v++) {
        if (isSafe(v, visited, graph, pos, path)) {
            path[pos] = v;
            visited[v] = true;

            if (hamiltonianCycleUtil(graph, path, pos + 1, visited)) {
                return true;
            }

            // Backtrack
            visited[v] = false;
            path[pos] = -1;
        }
    }

    return false;
}
