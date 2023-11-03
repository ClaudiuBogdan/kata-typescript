/**
 * Represents a directed graph using an adjacency matrix.
 */
type Graph = number[][];

/**
 * Finds a Hamiltonian path in a directed graph, if it exists.
 */
export function hamiltonianPath(graph: Graph): number[] | null {
    for (let startVertex = 0; startVertex < graph.length; startVertex++) {
        const path = new Array(graph.length).fill(-1);
        path[0] = startVertex; // Start at different vertices

        if (hamiltonianPathUtil(graph, path, 1)) {
            return path; // Return the Hamiltonian Path
        }
    }

    return null; // No Hamiltonian Path exists
}

/**
 * Recursive utility function to solve Hamiltonian Path problem
 */
function hamiltonianPathUtil(
    graph: Graph,
    path: number[],
    pos: number,
): boolean {
    // Base case: If all vertices are included in the path
    if (pos === graph.length) {
        return true;
    }

    // Try different vertices as the next candidate in the Hamiltonian Path.
    for (let v = 0; v < graph.length; v++) {
        // Changed to start from 0
        // Check if this vertex can be added to the Hamiltonian Path
        if (isSafe(v, graph, path, pos)) {
            path[pos] = v;

            // Recur to construct the rest of the path
            if (hamiltonianPathUtil(graph, path, pos + 1)) {
                return true;
            }

            // If adding vertex v doesn't lead to a solution, remove it
            path[pos] = -1;
        }
    }

    // If no vertex can be added to the Hamiltonian Path constructed so far
    return false;
}

/**
 * Util function to check if the current vertex can be added to the Hamiltonian Path
 */
function isSafe(v: number, graph: Graph, path: number[], pos: number): boolean {
    // Check if this vertex is an adjacent vertex of the previously added vertex.
    if (graph[path[pos - 1]][v] === 0) {
        return false;
    }

    // Check if the vertex has already been included in the path.
    for (let i = 0; i < pos; i++) {
        if (path[i] === v) {
            return false;
        }
    }

    // Additional check for directed graphs: if there are no outgoing edges from this vertex,
    // then it cannot be part of the Hamiltonian path.
    if (graph[v].every((edge) => edge === 0)) {
        return false;
    }

    return true;
}
