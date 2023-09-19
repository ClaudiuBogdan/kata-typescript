/**
 * Represents a directed graph using an adjacency list.
 */
interface Graph {
  [key: number]: number[];
}

/**
 * Represents a strongly connected component as an array of vertices.
 */
type StronglyConnectedComponent = number[];

/**
 * Finds strongly connected components in a directed graph.
 *
 * @param {Graph} graph - The adjacency list representation of the graph.
 * @returns {StronglyConnectedComponent[]} - An array of strongly connected components in the graph.
 *
 * @example
 * const graph = {
 *   0: [1],
 *   1: [2],
 *   2: [0, 3],
 *   3: [4],
 *   4: []
 * };
 * findStronglyConnectedComponents(graph);  // returns [[0, 1, 2], [3], [4]]
 */
export function findStronglyConnectedComponents(graph: Graph): StronglyConnectedComponent[] {
  // Function implementation here
}
