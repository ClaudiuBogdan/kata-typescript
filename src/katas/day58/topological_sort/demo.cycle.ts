/**
 * Performs topological sort on a directed acyclic graph.
 *
 * @param {AdjacencyList} graph - The adjacency list representation of the graph.
 * @returns {number[] | null} - An array representing the topological ordering of the graph,
 *                              or null if a cycle is detected.
 */
export function topologicalSort(graph: AdjacencyList): number[] | null {
    if (hasCycle(graph)) {
        return null; // Return null if a cycle is detected
    }

    const stack: number[] = [];
    const visited: boolean[] = new Array(graph.length).fill(false);

    // Helper function for DFS
    const dfs = (node: number) => {
        visited[node] = true;
        for (const neighbor of graph[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
        stack.push(node);
    };

    // Perform DFS for each unvisited node
    for (let i = 0; i < graph.length; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }

    // The stack now contains the topologically sorted nodes in reverse order
    return stack.reverse();
}

/**
 * Checks if a directed graph contains a cycle.
 *
 * @param {AdjacencyList} graph - The adjacency list representation of the graph.
 * @returns {boolean} - Returns true if a cycle is detected, false otherwise.
 */
function hasCycle(graph: AdjacencyList): boolean {
    const visited: boolean[] = new Array(graph.length).fill(false);
    const recStack: boolean[] = new Array(graph.length).fill(false);

    const dfsCycleCheck = (node: number): boolean => {
        if (!visited[node]) {
            visited[node] = true;
            recStack[node] = true;

            for (const neighbor of graph[node]) {
                if (!visited[neighbor] && dfsCycleCheck(neighbor)) {
                    return true;
                } else if (recStack[neighbor]) {
                    return true;
                }
            }
        }

        recStack[node] = false;
        return false;
    };

    for (let i = 0; i < graph.length; i++) {
        if (dfsCycleCheck(i)) {
            return true;
        }
    }

    return false;
}
