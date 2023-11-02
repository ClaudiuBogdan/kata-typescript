/**
 * Finds an Eulerian path in an undirected graph, if it exists.
 *
 * @param {AdjacencyList} graph - The adjacency list representation of the graph.
 * @returns {number[] | null} - An array representing the Eulerian path, or null if none exists.
 */
export function findEulerianPath(graph: AdjacencyList): number[] | null {
    if (graph.length === 0) {
        return [];
    }
    const visited: boolean[] = new Array(graph.length).fill(false);
    let oddVertices = 0;
    let startVertex = 0;

    // Find vertices with odd degree and mark a possible start vertex
    for (let i = 0; i < graph.length; i++) {
        if (graph[i].length % 2 !== 0) {
            oddVertices++;
            startVertex = i;
        }
        // Start DFS from the first non-isolated vertex
        if (graph[i].length > 0 && !visited[i]) {
            dfs(i, visited, graph);
        }
    }

    // Check if all non-isolated vertices are connected
    if (graph.some((neighbors, i) => neighbors.length > 0 && !visited[i])) {
        return null;
    }

    // Exactly zero or two vertices should have odd degree for Eulerian path
    if (oddVertices !== 0 && oddVertices !== 2) {
        return null;
    }

    // Hierholzer’s Algorithm to find Eulerian path
    const stack: number[] = [];
    const path: number[] = [];

    stack.push(startVertex);

    while (stack.length > 0) {
        let current = stack.pop()!;

        while (graph[current].length > 0) {
            const neighbor = graph[current].pop()!;
            graph[neighbor] = graph[neighbor].filter((v) => v !== current);
            stack.push(current);
            current = neighbor;
        }

        path.push(current);
    }

    return path.reverse();
}

// Helper function to perform DFS and check for connectedness
function dfs(vertex: number, visited: boolean[], graph: AdjacencyList): void {
    visited[vertex] = true;
    for (const neighbor of graph[vertex]) {
        if (!visited[neighbor]) {
            dfs(neighbor, visited, graph);
        }
    }
}
