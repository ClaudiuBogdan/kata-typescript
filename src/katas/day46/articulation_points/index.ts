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
    const discovery = new Array(graph.length).fill(-1);
    const visited = new Array(graph.length).fill(false);
    const low = new Array(graph.length).fill(-1);
    const parent = new Array(graph.length).fill(-1);
    const articulationPoints = new Set<number>();

    const dfs = (u: number) => {
        // u is the parent in the dfs tree
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

                // check if u is root and u has more than one children
                if (parent[u] === -1 && children > 1) {
                    articulationPoints.add(u);
                }

                // if u is not root and lowest value of one of its children is equal or greater than the discovery of u
                if (parent[u] !== -1 && low[v] >= discovery[u]) {
                    articulationPoints.add(u);
                }
            } else if (v !== parent[u]) {
                low[u] = Math.min(low[u], discovery[v]);
            }
        }
    };

    for (let i = 0; i < graph.length; i++) {
        dfs(i);
    }

    return Array.from(articulationPoints);
}
