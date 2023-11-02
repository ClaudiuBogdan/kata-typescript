k/**
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
    const bridges: Bridge[] = [];
    const visited: boolean[] = new Array(graph.length).fill(false);
    const disc: number[] = new Array(graph.length).fill(-1);
    const low: number[] = new Array(graph.length).fill(-1);
    let time = 0;

    const dfs = (u: number, parent: number | null) => {
        visited[u] = true;
        disc[u] = low[u] = time++;
        for (const v of graph[u]) {
            if (!visited[v]) {
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > disc[u]) {
                    bridges.push([u, v]);
                }
            } else if (v !== parent) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    };

    for (let i = 0; i < graph.length; i++) {
        if (!visited[i]) {
            dfs(i, null);
        }
    }

    return bridges;
}
