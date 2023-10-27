type AdjacencyList = number[][];

enum NodeColor {
    WHITE, // unvisited
    GRAY, // in recursion stack
    BLACK, // visited
}

/**
 * Helper function to perform DFS and detect a cycle.
 *
 * @param {number} node - The current node.
 * @param {AdjacencyList} graph - The adjacency list.
 * @param {NodeColor[]} color - The color of each node.
 * @returns {boolean} - True if a cycle exists from the current node, otherwise false.
 */
function hasCycleDFS(
    node: number,
    graph: AdjacencyList,
    color: NodeColor[],
): boolean {
    // Mark the current node as being visited
    color[node] = NodeColor.GRAY;

    // Visit all neighbors
    for (const neighbor of graph[node]) {
        // If the neighbor is in the recursion stack, then we have found a cycle
        if (color[neighbor] === NodeColor.GRAY) {
            return true;
        }

        // If the neighbor is unvisited and we find a cycle starting from it, return true
        if (
            color[neighbor] === NodeColor.WHITE &&
            hasCycleDFS(neighbor, graph, color)
        ) {
            return true;
        }
    }

    // After visiting all neighbors, mark the current node as visited
    color[node] = NodeColor.BLACK;

    return false;
}

/**
 * Detects if a cycle exists in a directed graph.
 *
 * @param {AdjacencyList} graph - The adjacency list representation of the directed graph.
 * @returns {boolean} - True if a cycle exists, otherwise false.
 */
export function detectCycle(graph: AdjacencyList): boolean {
    // Initialize all nodes as WHITE (unvisited)
    const color: NodeColor[] = Array(graph.length).fill(NodeColor.WHITE);

    // Loop through all nodes
    for (let i = 0; i < graph.length; i++) {
        // If the node is unvisited and a cycle is found starting from it, return true
        if (color[i] === NodeColor.WHITE && hasCycleDFS(i, graph, color)) {
            return true;
        }
    }

    // No cycle found
    return false;
}

// Example usage:
const graph = [[1], [2], [0]];
console.log(detectCycle(graph)); // Output: true
