# Kruskal Algorithm

Kruskal's algorithm is a classic algorithm in computer science used to find a minimum spanning tree for a connected, weighted graph. This means it finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges in the tree is minimized.

Here's a more detailed problem description and context:

### Problem Description:

Given a connected, undirected graph \( G = (V, E) \) with a vertex set \( V \), an edge set \( E \), and a weight function \( w : E \rightarrow \mathbb{R} \) that assigns a weight to each edge, the goal is to find a minimum spanning tree (MST) for the graph. The MST is a subset of the edges \( T \subseteq E \) that connects all the vertices with the smallest possible total edge weight, and without any cycles.

### Characteristics of a Minimum Spanning Tree:

1. **Connectivity:** The MST connects all vertices in the graph.
2. **Acyclicity:** The MST does not contain any cycles.
3. **Weight Minimization:** The sum of the weights of the edges in the MST is less than or equal to the weight of any other spanning tree of the graph.

### Kruskal's Algorithm:

Kruskal's algorithm is a greedy algorithm that solves the MST problem. It works as follows:

1. **Sort the Edges:** Start by sorting all the edges of the graph in non-decreasing order of their weight.
2. **Initialize Forest:** Create a forest \( F \), where each vertex in the graph is a separate tree.
3. **Merge Trees:** For each edge in the sorted edge list, check if the two vertices connected by the edge belong to different trees (i.e., they are not already connected).
    - If they are in different trees, add the edge to the forest, combining two trees into a single tree.
    - If they are in the same tree, ignore the edge to avoid creating a cycle.
4. **Repeat:** Repeat the process until there are no more edges left or until there is only one tree in the forest, which will be the MST.

Kruskal's algorithm is ideal for sparse graphs and can be implemented efficiently using a disjoint-set data structure (also known as a union-find data structure) to keep track of the forest of trees.

### TypeScript Implementation

To implement Kruskal's algorithm using the provided TypeScript function template, we need to follow the steps I outlined earlier, with a few modifications to fit the template:

1. **Flatten and Sort Edges**: Since the input is given as a `WeightedAdjacencyList`, we need to convert it into a list of edges and sort them by weight.
2. **Disjoint Set**: We'll need a disjoint-set data structure to efficiently manage the merging of trees and to check whether two vertices belong to the same tree.
3. **Build the MST**: We'll iterate over the sorted edges and select the ones that connect two different trees.

Here's how the disjoint-set data structure (union-find) works in brief:

-   **MakeSet**: Initialize the disjoint-set with each element in its own set.
-   **Find**: Determine which set a particular element belongs to. This can be used for determining if two elements are in the same set.
-   **Union**: Combine or merge two sets into a single set.

We'll create auxiliary functions for disjoint-set operations within our `kruskal` function. Let's start by writing out these helper functions and then we'll complete the `kruskal` function implementation.

```typescript
// Define the GraphEdge and WeightedAdjacencyList types as provided.
declare type GraphEdge = { to: number; weight: number };
declare type WeightedAdjacencyList = GraphEdge[][];

// Helper functions for Disjoint Set (Union-Find)
class DisjointSet {
    private parent: number[];
    private rank: number[];

    constructor(size: number) {
        this.parent = new Array(size);
        this.rank = new Array(size).fill(0);
        for (let i = 0; i < size; i++) {
            this.parent[i] = i;
        }
    }

    public find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    public union(x: number, y: number): void {
        const xRoot = this.find(x);
        const yRoot = this.find(y);

        if (xRoot === yRoot) return;

        // Union by rank
        if (this.rank[xRoot] < this.rank[yRoot]) {
            this.parent[xRoot] = yRoot;
        } else if (this.rank[yRoot] < this.rank[xRoot]) {
            this.parent[yRoot] = xRoot;
        } else {
            this.parent[yRoot] = xRoot;
            this.rank[xRoot]++;
        }
    }
}

// The Kruskal's algorithm function as requested.
export function kruskal(
    graph: WeightedAdjacencyList,
    vertices: number,
): number[][] {
    // Initialize the disjoint set
    const disjointSet = new DisjointSet(vertices);

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
        if (disjointSet.find(edge.from) !== disjointSet.find(edge.to)) {
            disjointSet.union(edge.from, edge.to);
            mst.push([edge.from, edge.to]);
        }
    }

    return mst;
}
```

The time and space complexity of Kruskal's algorithm are influenced by several key operations within the algorithm. Let's break down the complexities of these operations:

1. **Sorting the Edges**: The initial step of Kruskal's algorithm involves sorting all the edges by their weight. If there are \( E \) edges in the graph, the complexity of sorting is \( O(E \log E) \).

2. **Disjoint Set Operations**: The disjoint set data structure provides two main operations: `find` and `union`.
    - The `find` operation, which is optimized with path compression, has an amortized time complexity of \( O(\alpha(V)) \), where \( \alpha \) is the inverse Ackermann function. \( \alpha(V) \) is a very slowly growing function and is practically considered constant.
    - The `union` operation, optimized with union by rank, has a time complexity of \( O(\alpha(V)) \) as well.

Since each edge may potentially involve both a `find` and `union` operation, the total complexity for all edges is \( O(E \alpha(V)) \).

3. **Iterating through the Edges**: The algorithm goes through all edges, which adds an \( O(E) \) complexity.

When combined, the dominating factor is the sorting of the edges, making the overall time complexity of Kruskal's algorithm \( O(E \log E) \). Since \( E \) can be at most \( V^2 \) in a dense graph (where \( V \) is the number of vertices), the sorting step can also be bounded by \( O(E \log V) \), which is useful when analyzing the complexity for dense graphs.

The space complexity is primarily determined by the storage required for the disjoint set structure, the sorted edge list, and the minimum spanning tree. The disjoint set requires \( O(V) \) space, the edge list requires \( O(E) \) space, and the MST will have \( O(V) \) edges. Therefore, the overall space complexity is \( O(V + E) \).

In summary:

-   Time Complexity: \( O(E \log E) \) or \( O(E \log V) \)
-   Space Complexity: \( O(V + E) \)

### References

-   https://chat.openai.com/c/a142bca3-e825-4572-943a-300950b68f4a
