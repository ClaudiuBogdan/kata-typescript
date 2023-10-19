/**
 * Finds articulation points in an undirected graph.
 *
 * @param {AdjacencyList} graph - The adjacency list representation of the graph.
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
export function articulationPoints(graph: AdjacencyList): number[] {
    let time = 0;
    const visited: boolean[] = new Array(graph.length).fill(false);
    const discovery: number[] = new Array(graph.length).fill(-1);
    const low: number[] = new Array(graph.length).fill(-1);
    const parent: number[] = new Array(graph.length).fill(-1);
    const articulationPoints: Set<number> = new Set();

    const dfs = (u: number): void => {
        let children = 0;
        visited[u] = true;
        discovery[u] = time;
        low[u] = time;
        time++;

        for (let v of graph[u]) {
            if (!visited[v]) {
                children++;
                parent[v] = u;
                dfs(v);
                low[u] = Math.min(low[u], low[v]);

                // Check if the current vertex `u` is root of DFS tree and has two or more children
                if (parent[u] === -1 && children > 1) {
                    articulationPoints.add(u);
                }

                // If `u` is not root and low value of one of its children is greater than discovery value of `u`
                if (parent[u] !== -1 && low[v] >= discovery[u]) {
                    articulationPoints.add(u);
                }
            } else if (v !== parent[u]) {
                low[u] = Math.min(low[u], discovery[v]);
            }
        }
    };

    for (let i = 0; i < graph.length; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }

    return Array.from(articulationPoints);
}
