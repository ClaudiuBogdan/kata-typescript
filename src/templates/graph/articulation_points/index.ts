/**
 * Represents an undirected graph using an adjacency list.
 */
interface Graph {
  [key: number]: number[];
}

/**
 * Finds articulation points in an undirected graph.
 *
 * @param {Graph} graph - The adjacency list representation of the graph.
 * @returns {number[]} - An array of articulation points in the graph.
 *
 * @example
 * const graph = {
 *   0: [1, 2],
 *   1: [0, 2],
 *   2: [0, 1, 3],
 *   3: [2]
 * };
 * articulationPoints(graph);  // returns [2]
 */
export function articulationPoints(graph: Graph): number[] {
  // Function implementation here
}
