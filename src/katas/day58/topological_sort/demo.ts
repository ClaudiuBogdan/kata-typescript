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
    const stack: number[] = [];
    const visited: boolean[] = new Array(graph.length).fill(false);
    const recStack: boolean[] = new Array(graph.length).fill(false);

    // Helper function for DFS
    const dfs = (node: number): boolean => {
        if (recStack[node]) {
            // Cycle detected
            return true;
        }

        if (visited[node]) {
            // Already visited, no cycle here
            return false;
        }

        visited[node] = true;
        recStack[node] = true;

        for (const neighbor of graph[node]) {
            if (dfs(neighbor)) {
                return true; // Cycle detected in the neighbor
            }
        }

        stack.push(node);
        recStack[node] = false; // Remove the node from recursion stack
        return false;
    };

    // Perform DFS for each unvisited node
    for (let i = 0; i < graph.length; i++) {
        if (dfs(i)) {
            // Cycle detected
            return null;
        }
    }

    // The stack now contains the topologically sorted nodes in reverse order
    return stack.reverse();
}
