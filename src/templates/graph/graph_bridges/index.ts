/**
 * Represents a bridge in the graph as a tuple of vertices.
 */
type Bridge = [number, number];

/**
 * Finds bridges in an undirected graph.
 *
 * @param {Graph} graph - The adjacency list representation of the graph.
 * @returns {Bridge[]} - An array of bridges in the graph.
 *
 * @example
 * const graph = [
 *   [1, 2],
 *   [0, 2],
 *   [0, 1, 3],
 *   [2]
 * ];
 * findBridges(graph);  // returns [[2, 3]]
 */
export function findBridges(graph: AdjacencyList): Bridge[] {
    // Function implementation here
}
