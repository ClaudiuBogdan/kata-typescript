// Define the GraphEdge and WeightedAdjacencyList types as provided.
export function kruskal(graph: WeightedAdjacencyList): number[][] {
    const vertices = graph.length;
    // Initialize the disjoint set
    const [find, union] = createDisjointSet(vertices);

    // Flatten and sort the edges from the adjacency list
    const edges: { from: number; to: number; weight: number }[] = [];
    for (let from = 0; from < graph.length; from++) {
        for (const edge of graph[from]) {
            // Avoid duplicating edges by only adding one direction
            if (from < edge.to) {
                edges.push({ from, to: edge.to, weight: edge.weight });
            }
        }
    }

    // Sort edges based on weight
    edges.sort((a, b) => a.weight - b.weight);

    // Array to store the minimum spanning tree edges
    const mst: number[][] = [];

    // Iterate over the sorted edges and construct the MST
    for (const edge of edges) {
        if (find(edge.from) !== find(edge.to)) {
            union(edge.from, edge.to);
            mst.push([edge.from, edge.to]);
        }
    }

    return mst;
}

type FindFunction = (item: number) => number;
type UnionFunction = (x: number, y: number) => void;

const createDisjointSet = (size: number): [FindFunction, UnionFunction] => {
    const parent: number[] = Array.from({ length: size }, (_, index) => index);
    const rank: number[] = new Array(size).fill(0);

    const find: FindFunction = (item) => {
        if (parent[item] !== item) {
            parent[item] = find(parent[item]); // Path compression
        }
        return parent[item];
    };

    const union: UnionFunction = (x, y) => {
        let xRoot = find(x);
        let yRoot = find(y);

        if (xRoot === yRoot) return;

        // Union by rank
        if (rank[xRoot] < rank[yRoot]) {
            parent[xRoot] = yRoot;
        } else if (rank[xRoot] > rank[yRoot]) {
            parent[yRoot] = xRoot;
        } else {
            parent[yRoot] = xRoot;
            rank[xRoot]++;
        }
    };

    return [find, union];
};
