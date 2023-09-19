/**
 * Represents a directed graph using an adjacency list.
 */
interface DirectedGraph {
    [key: number]: number[];
}

/**
 * Detects if a cycle exists in a directed graph.
 *
 * @param {DirectedGraph} graph - The adjacency list representation of the directed graph.
 * @returns {boolean} - True if a cycle exists, otherwise false.
 *
 * @example
 * const graph = {
 *   0: [1],
 *   1: [2],
 *   2: [0]
 * };
 * detectCycle(graph);  // returns true
 */
export function detectCycle(graph: DirectedGraph): boolean {
    // Function implementation here
}
