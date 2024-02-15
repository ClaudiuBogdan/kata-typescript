/**
 * Performs topological sort on a directed acyclic graph with cycle detection.
 *
 * @param {AdjacencyList} graph - The adjacency list representation of the graph.
 * @returns {number[] | null} - An array representing the topological ordering of the graph,
 *                              or null if a cycle is detected.
 *
 * @example
 * const graph = [
 *   [1, 2],
 *   [3],
 *   [3],
 *   [4],
 *   []
 * ];
 * topologicalSort(graph);  // returns [0, 2, 1, 3, 4] or null if a cycle is detected
 */
export function topologicalSort(graph: AdjacencyList): number[] | null {
    const stackRec: boolean[] = new Array(graph.length).fill(false);
    const seen: boolean[] = new Array(graph.length).fill(false);
    const stack: number[] = [];

    const dfs = (node: number): boolean => {
        if (stackRec[node]) {
            return true;
        }
        if (seen[node]) {
            return false;
        }

        stackRec[node] = true;
        seen[node] = true;
        for (const neighbor of graph[node]) {
            if (dfs(neighbor)) {
                return true;
            }
        }
        stackRec[node] = false;
        stack.push(node);
        return false;
    };

    for (let v = 0; v < graph.length; v++) {
        if (dfs(v)) {
            return null;
        }
    }
    return stack.reverse();
}