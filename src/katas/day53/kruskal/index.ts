/**
 * Finds the minimum spanning tree of a connected, undirected graph with weighted edges using Kruskal's Algorithm.
 *
 * @param {WeightedAdjacencyList} graph
 * @returns {number[][]} An array of arrays representing the edges of the minimum spanning tree.
 */
export function kruskal(graph: WeightedAdjacencyList): number[][] {
    const vertices = graph.length;

    const disjointSet = createDisjointSet(vertices);

    // Flatten and sort the edges from the adjacency list
    const edges: { from: number; to: number; weight: number }[] = [];
    for (let from = 0; from < graph.length; from++) {
        for (const edge of graph[from]) {
            // Avoid duplicating edges by only adding one direction
            if (from < edge.to) {
                edges.push({
                    from,
                    to: edge.to,
                    weight: edge.weight,
                });
            }
        }
    }

    // Sort edges based on weight
    edges.sort((a, b) => a.weight - b.weight);

    // Array to store the minimum spanning tree edges
    const mst: number[][] = [];

    // Iterate over the sorted edges and construct the MST
    for (const edge of edges) {
        if (disjointSet.find(edge.from) !== disjointSet.find(edge.to)) {
            disjointSet.union(edge.from, edge.to);
            mst.push([edge.from, edge.to]);
        }
    }

    return mst;
}

function createDisjointSet(size: number): {
    find: FindFunction;
    union: UnionFunction;
} {
    const parent: number[] = Array.from({ length: size }, (_, index) => index);
    const rank: number[] = new Array(size).fill(0);

    const find: FindFunction = (item) => {
        if (parent[item] !== item) {
            parent[item] = find(parent[item]);
        }
        return parent[item];
    };

    const union: UnionFunction = (x, y) => {
        let xRoot = find(x);
        let yRoot = find(y);

        if (xRoot === yRoot) {
            return;
        }

        if (rank[xRoot] < rank[yRoot]) {
            parent[xRoot] = yRoot;
        } else if (rank[xRoot] > rank[yRoot]) {
            parent[yRoot] = xRoot;
        } else {
            parent[yRoot] = xRoot;
            rank[xRoot] += rank[xRoot];
        }
    };

    return {
        find,
        union,
    };
}

type FindFunction = (item: number) => number;
type UnionFunction = (x: number, y: number) => void;
