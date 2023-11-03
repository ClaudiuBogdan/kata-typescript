# Hamiltonian Path

## Hamiltonian Path Problem Description

The Hamiltonian path problem is a classic problem in graph theory that involves finding a path in a graph that visits each vertex exactly once. If such a path exists, it is called a Hamiltonian path. If a Hamiltonian path exists that starts and ends at the same vertex, this is called a Hamiltonian cycle. These concepts are named after the mathematician Sir William Rowan Hamilton who studied them in the 1800s.

Here's a more formal definition:

Given a graph \( G = (V, E) \) where \( V \) is the set of vertices and \( E \) is the set of edges, a Hamiltonian path is a sequence of edges that connects all vertices in the graph without repeating a vertex. The path can be either open (does not end where it started) or closed (ends where it started, forming a cycle).

The Hamiltonian path problem is related to the concept of the traveling salesman problem (TSP), but with the relaxation that the path does not need to return to the starting vertex. It has applications in various fields, including network routing, scheduling, and even in the creation of puzzles like the Icosian game.

## Algorithms for Finding Hamiltonian Paths

The Hamiltonian path problem is NP-complete, which means that there is no known polynomial-time algorithm to solve it for all general cases. However, various approaches are used to tackle the problem:

1. **Backtracking Algorithm**: This is a brute-force approach that tries to build a Hamiltonian Path by adding one edge at a time and backtracking when a dead end is reached. This method is simple to implement but can be very slow, especially for large graphs, because it has to explore many possible combinations.

2. **Dynamic Programming**: The problem can be solved in \( O(2^n \cdot n^2) \) time using dynamic programming. This approach is better than the brute-force method but still not practical for very large graphs due to the exponential time complexity.

3. **Heuristics and Approximation Algorithms**: Since finding a Hamiltonian path is computationally difficult, heuristics and approximation algorithms may be used to find a Hamiltonian path in reasonable time for specific types of graphs or to find an approximate solution that may not be perfect but good enough for practical purposes.

4. **Integer Linear Programming (ILP)**: By formulating the problem as an ILP, one can use the computational power of ILP solvers to find a solution. However, this is also subject to exponential time complexity for large instances.

5. **Directed Acyclic Graph (DAG)**: If the graph is a DAG, a Hamiltonian path can be found in linear time by ordering the vertices in topological order.

For most practical purposes, if an exact solution is necessary and the graph is not huge, backtracking or ILP might be used. For larger graphs or when approximate solutions are acceptable, heuristics or approximation algorithms are preferred.

Here is the modified TypeScript function:

```typescript
/**
 * Represents a directed graph using an adjacency matrix.
 */
type Graph = number[][];

/**
 * Util function to check if the current vertex can be added to the Hamiltonian Path
 */
function isSafe(v: number, graph: Graph, path: number[], pos: number): boolean {
    // Check if this vertex is an adjacent vertex of the previously added vertex.
    if (graph[path[pos - 1]][v] === 0) {
        return false;
    }

    // Check if the vertex has already been included in the path.
    for (let i = 0; i < pos; i++) {
        if (path[i] === v) {
            return false;
        }
    }

    return true;
}

/**
 * Recursive utility function to solve Hamiltonian Path problem
 */
function hamiltonianPathUtil(
    graph: Graph,
    path: number[],
    pos: number,
): boolean {
    // Base case: If all vertices are included in the path
    if (pos === graph.length) {
        return true;
    }

    // Try different vertices as the next candidate in the Hamiltonian Path.
    for (let v = 0; v < graph.length; v++) {
        // Changed to start from 0
        // Check if this vertex can be added to the Hamiltonian Path
        if (isSafe(v, graph, path, pos)) {
            path[pos] = v;

            // Recur to construct the rest of the path
            if (hamiltonianPathUtil(graph, path, pos + 1)) {
                return true;
            }

            // If adding vertex v doesn't lead to a solution, remove it
            path[pos] = -1;
        }
    }

    // If no vertex can be added to the Hamiltonian Path constructed so far
    return false;
}

/**
 * Finds a Hamiltonian path in a directed graph, if it exists.
 */
export function hamiltonianPath(graph: Graph): number[] | null {
    for (let startVertex = 0; startVertex < graph.length; startVertex++) {
        const path = new Array(graph.length).fill(-1);
        path[0] = startVertex; // Start at different vertices

        if (hamiltonianPathUtil(graph, path, 1)) {
            return path; // Return the Hamiltonian Path
        }
    }

    return null; // No Hamiltonian Path exists
}
```

In this updated function, we loop through each vertex and try to use it as the starting point for the Hamiltonian path. The `hamiltonianPathUtil` function remains mostly unchanged except for starting its for-loop at 0 to consider all vertices at each recursive step.

With this modification, the algorithm will successfully find the Hamiltonian path [4, 0, 1, 2, 3] for the graph you've provided, demonstrating that the choice of starting vertex can be crucial in finding a solution.

The Hamiltonian Path problem is a classic NP-complete problem, and the algorithm we've discussed uses backtracking to find a solution. The complexity analysis is as follows:

## Time Complexity:

-   **Best Case**: In the best case, a Hamiltonian Path is found on the first try without any backtracking. This would only happen if the graph has a very specific structure that allows for the Hamiltonian Path to be found in a linear fashion. The best-case time complexity is \(O(N)\), where \(N\) is the number of vertices, because it would only need to visit each vertex once.

-   **Worst Case**: In the worst case, the algorithm might have to try every possible path before concluding whether a Hamiltonian Path exists or not. Since it tries to build a path starting from each vertex and explores every subsequent path that can be made by visiting each unvisited vertex once, the time complexity is \(O(N!)\), where \(N\) is the number of vertices. This is because there are \(N!\) permutations of vertices in a complete graph and the backtracking algorithm effectively generates all permutations.

## Space Complexity:

-   The space complexity is primarily determined by the size of the recursion stack and the storage of the path.

    -   The path array has a space complexity of \(O(N)\), where \(N\) is the number of vertices, as it stores a single path of vertices.

    -   The recursion stack can grow up to \(O(N)\) in depth since the algorithm will at most be \(N\) calls deep (one for each vertex).

-   There is also the space taken by the input graph. If the graph is represented as an adjacency matrix, the space complexity of the graph is \(O(N^2)\), where \(N\) is the number of vertices. However, this does not count towards the algorithm's space complexity if we consider the graph as the input to the function and only calculate the extra space used by the algorithm itself.

Therefore, the overall space complexity of the algorithm is \(O(N)\) for the recursion stack and path storage, not counting the input size. If we include the input, and if it's an adjacency matrix, the total space would be \(O(N^2)\).
