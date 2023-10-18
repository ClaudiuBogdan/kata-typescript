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
    const seen: boolean[] = new Array(graph.length).fill(false);

    path[0] = 0;
    seen[0] = true;

    if (findHamiltonianCycleUtil(seen, path, graph, 1)) {
        return path.concat(0);
    }
    return null;
}

function findHamiltonianCycleUtil(
    seen: boolean[],
    path: number[],
    graph: Graph,
    pos: number,
): boolean {
    if (pos === graph.length) {
        const firstVertex = path[0];
        const lastVertex = path[pos - 1];
        // Check if there is an edge from the last vertex to the first vertex of the graph
        return graph[lastVertex][firstVertex] === 1;
    }

    for (let v = 1; v < graph.length; v++) {
        if (isSafe(path, seen, graph, pos, v)) {
            seen[v] = true;
            path[pos] = v;

            if (findHamiltonianCycleUtil(seen, path, graph, pos + 1)) {
                return true;
            }
            
            // Backtrack
            seen[v] = false;
            path[pos] = -1;
        }
    }
    return false;
}

function isSafe(
    path: number[],
    seen: boolean[],
    graph: Graph,
    pos: number,
    vertex: number,
): boolean {
    // Check if the vertex is an adjacent vertex to the last added vertex
    const lastAddedVertex = path[pos - 1];
    if (graph[lastAddedVertex][vertex] === 0) {
        return false;
    }

    if (seen[vertex]) {
        return false;
    }

    return true;
}
