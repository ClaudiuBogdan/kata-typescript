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
    let startVertex: number = 0;
    let oddVertices: number = 0;

    for (let i = 0; i < graph.length; i++) {
        if (graph[i].length % 2 !== 0) {
            oddVertices++;
            startVertex = i;
        }

        if (graph[i].length > 0 && !visited[i]) {
            dfs(i, visited, graph);
        }
    }

    if (oddVertices !== 0 && oddVertices !== 2) {
        return null;
    }
    const isDisconnected = graph.some(
        (neighbors, i) => neighbors.length > 0 && !visited[i],
    );
    if (isDisconnected) {
        return null;
    }

    // Hierholzer's Algorithm
    const stack: number[] = [];
    const path: number[] = [];
    stack.push(startVertex);

    while (stack.length > 0) {
        let current = stack.pop()!;
        while (graph[current].length > 0) {
            const neighbor = graph[current].pop()!;
            graph[neighbor] = graph[neighbor].filter(
                (vertex) => vertex !== current,
            );
            stack.push(current);
            current = neighbor;
        }
        path.push(current);
    }
    return path.reverse();
}

function dfs(vertex: number, visited: boolean[], graph: AdjacencyList): void {
    visited[vertex] = true;
    for (const neighbor of graph[vertex]) {
        if (!visited[neighbor]) {
            dfs(neighbor, visited, graph);
        }
    }
}
