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
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);
    const pos = 0;
    const source = 0;
    seen[source] = true;
    prev[pos] = source;

    if (findHamiltonianCycleUtils(seen, prev, graph, pos + 1)) {
        return prev.concat(source);
    }
    return null;
}

function findHamiltonianCycleUtils(
    seen: boolean[],
    prev: number[],
    graph: Graph,
    pos: number,
): boolean {
    const source = 0;
    if (pos === graph.length) {
        return graph[prev[pos - 1]][source] === 1;
    }

    for (let v = 1; v < graph.length; v++) {
        if (isSafe(seen, prev, graph, pos, v)) {
            seen[v] = true;
            prev[pos] = v;

            if (findHamiltonianCycleUtils(seen, prev, graph, pos + 1)) {
                return true;
            }

            seen[v] = false;
            prev[pos] = -1;
        }
    }

    return false;
}

function isSafe(
    seen: boolean[],
    prev: number[],
    graph: Graph,
    pos: number,
    v: number,
): boolean {
    if (seen[v]) {
        return false;
    }

    if (graph[prev[pos - 1]][v] === 0) {
        return false;
    }

    return true;
}
