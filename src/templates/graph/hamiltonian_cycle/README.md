# Hamiltonian cycle

### Problem Description

The Hamiltonian Cycle Problem is a graph theory problem that asks whether a given graph \( G(V, E) \) contains a Hamiltonian cycle—a simple cycle that visits every vertex exactly once and returns to the original vertex. In formal terms, a Hamiltonian cycle is a cycle that traverses all the vertices \( V \) exactly once, except for the starting and ending vertex, which is the same and is visited twice.

#### Formally

Given a graph \( G(V, E) \) with \( V \) vertices and \( E \) edges, does there exist a sequence of vertices \( v_1, v_2, \ldots, v_n, v_1 \) such that:

1. \( v_i \) is a vertex in \( V \) for \( 1 \leq i \leq n \)
2. \( (v*i, v*{i+1}) \) is an edge in \( E \) for \( 1 \leq i < n \)
3. \( v*1 = v*{n+1} \)
4. Each vertex \( v \in V \) appears exactly once in \( v_1, v_2, \ldots, v_n \)

### Algorithms to Solve Hamiltonian Cycle Problem

The Hamiltonian cycle problem is NP-complete, which means that there is no known polynomial-time algorithm to solve all instances of this problem unless \( P = NP \). Here are some approaches:

#### Brute-force

The brute-force approach involves generating all possible sequences of vertices and checking whether any of them form a Hamiltonian cycle. The time complexity is \( O(n!) \), which is impractical for large graphs.

```typescript
// TypeScript pseudo-code for brute-force Hamiltonian cycle
function hasHamiltonianCycle(graph: boolean[][], n: number): boolean {
    // Generate permutations and check if any is a Hamiltonian Cycle
    // ...
    return false;
}
```

#### Backtracking

The backtracking approach starts from a vertex and keeps adding a new vertex to the path while making sure that it leads to a Hamiltonian cycle. If it doesn't, it backtracks.

```typescript
// TypeScript pseudo-code for backtracking
function isHamiltonian(
    graph: boolean[][],
    path: number[],
    pos: number,
    n: number,
): boolean {
    // Check if current vertex can be added to Hamiltonian Cycle
    // ...

    // If the Hamiltonian cycle is found, return true
    // ...

    return false;
}
```

The backtracking algorithm has a time complexity of \( O(n!) \) in the worst case but is often faster in practice.

#### Dynamic Programming (Held-Karp)

Although it doesn't solve the problem in polynomial time, the Held-Karp algorithm is faster than the brute-force and backtracking approaches for some special cases. It has a time complexity of \( O(n^2 2^n) \).

```typescript
// TypeScript pseudo-code for Held-Karp algorithm
function heldKarp(graph: number[][], n: number): number {
    // DP solution to find the shortest Hamiltonian Cycle
    // ...
    return -1;
}
```

#### Heuristics

Approximation and heuristic algorithms like Nearest Neighbor, Minimum Spanning Tree, etc., can be used to find a "good enough" solution when an exact solution is not feasible.

Let's delve deeper into the comparison between the Backtracking and Dynamic Programming (Held-Karp) approaches for solving the Hamiltonian Cycle Problem.

### Backtracking Approach

#### How it Works

The backtracking algorithm builds a cycle by starting from a vertex and adding a new vertex to the path one at a time. At each step, it verifies whether the new vertex can be added to the cycle without breaking the Hamiltonian cycle rules. If it reaches a point where it cannot extend the cycle, it backtracks and tries another path.

#### Time Complexity

The time complexity in the worst-case scenario is \(O(n!)\) because, in the worst case, you might need to traverse all permutations of vertices. However, the algorithm will often run faster in practice because it prunes many branches of the search tree when it detects that they cannot possibly lead to a Hamiltonian cycle.

#### Space Complexity

The space complexity is \(O(n)\) for storing the path and \(O(n^2)\) for storing the graph. Recursion would also add an additional \(O(n)\) overhead.

#### Pros and Cons

-   **Pros**: Simple to understand and implement. Works well for small instances and can prune search space efficiently.
-   **Cons**: Factorial time complexity makes it impractical for large instances.

### Dynamic Programming (Held-Karp Algorithm)

#### How it Works

The Held-Karp algorithm is more commonly used for solving the Hamiltonian Path problem's "weighted" cousin, the Traveling Salesman Problem (TSP). However, it can be adapted for the Hamiltonian cycle problem. It uses dynamic programming to store sub-problems of partial paths and uses these stored solutions to construct the Hamiltonian cycle.

#### Time Complexity

The time complexity is \(O(n^2 2^n)\), which is exponential but often better than \(O(n!)\). This is because it solves each sub-problem only once and uses the solution to solve larger problems.

#### Space Complexity

The space complexity is \(O(n 2^n)\) to store the solutions to the sub-problems.

#### Pros and Cons

-   **Pros**: Better time complexity than backtracking for some instances. Particularly useful when the graph has a large number of vertices but the Hamiltonian cycle has particular characteristics that can be exploited.
-   **Cons**: More complex to implement and understand. Still not polynomial time, so not practical for all large instances.

### Comparison

| Feature                    | Backtracking | Dynamic Programming |
| -------------------------- | ------------ | ------------------- |
| Time Complexity            | \(O(n!)\)    | \(O(n^2 2^n)\)      |
| Space Complexity           | \(O(n^2)\)   | \(O(n 2^n)\)        |
| Implementation Complexity  | Easier       | More Complex        |
| Efficiency for small \(n\) | Often good   | Usually overkill    |
| Pruning                    | Yes          | Not Applicable      |

The Held-Karp algorithm is generally more efficient for graphs with a large number of vertices but is overkill for small instances where backtracking works well. The backtracking approach is easier to implement and understand but becomes impractical for large graphs due to its factorial time complexity.

Absolutely, let's dive into the backtracking approach for solving the Hamiltonian Cycle Problem.

### Backtracking Algorithm

The backtracking algorithm aims to build a Hamiltonian cycle incrementally, abandoning a path as soon as it violates the constraints (i.e., revisiting a previously visited vertex or failing to close the cycle properly). The algorithm starts from an arbitrary vertex (usually the first vertex) and extends the cycle by exploring each vertex that is connected to the current vertex.

#### Pseudocode

Here is a simplified pseudocode for the backtracking algorithm to find a Hamiltonian Cycle:

```
1. Start with an empty path and add an arbitrary vertex to it.
2. Explore each neighboring vertex of the last vertex in the path:
  a. If adding the vertex to the path yields a valid path:
      i. Add the vertex to the path.
      ii. If the path is a Hamiltonian cycle, return "Found".
      iii. Recursively continue the algorithm to extend the path.
      iv. If the path from the recursive call leads to a Hamiltonian cycle, return "Found".
  b. Remove the vertex from the path (backtrack) if it doesn't lead to a solution.
3. If all vertices are explored and none lead to a Hamiltonian cycle, return "Not Found".
```

#### TypeScript Implementation

Here's a TypeScript example to demonstrate the backtracking algorithm. I assume that the graph is represented as an adjacency matrix.

```typescript
type AdjMatrix = number[][];

function isSafe(
    v: number,
    pos: number,
    path: number[],
    graph: AdjMatrix,
): boolean {
    // Check if this vertex is an adjacent vertex of the previously added vertex.
    if (graph[path[pos - 1]][v] === 0) {
        return false;
    }

    // Check if the vertex has already been included.
    if (path.includes(v)) {
        return false;
    }

    return true;
}

function hamiltonianCycleUtil(
    graph: AdjMatrix,
    path: number[],
    pos: number,
): boolean {
    // Base case: If all vertices are included in the cycle
    if (pos === graph.length) {
        // And if there is an edge from the last vertex to the first vertex
        if (graph[path[pos - 1]][path[0]] === 1) {
            return true;
        } else {
            return false;
        }
    }

    // Try different vertices as the next candidate in the Hamiltonian Cycle.
    for (let v = 1; v < graph.length; v++) {
        // Check if this vertex can be added to the Hamiltonian Cycle
        if (isSafe(v, pos, path, graph)) {
            path[pos] = v;

            // Recur to construct the rest of the path
            if (hamiltonianCycleUtil(graph, path, pos + 1)) {
                return true;
            }

            // Remove the vertex if it doesn't lead to a solution
            path[pos] = -1;
        }
    }

    // No solution from this vertex, backtrack.
    return false;
}

function findHamiltonianCycle(graph: AdjMatrix): number[] | null {
    const path: number[] = new Array(graph.length).fill(-1);
    path[0] = 0; // Start from vertex 0

    if (hamiltonianCycleUtil(graph, path, 1)) {
        return path;
    } else {
        return null;
    }
}

// Test
const graph: AdjMatrix = [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 1, 1],
    [0, 1, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [0, 1, 1, 1, 0],
];
const result = findHamiltonianCycle(graph);
console.log("Hamiltonian Cycle:", result);
```

In this example, the function `findHamiltonianCycle` attempts to find a Hamiltonian cycle in the graph represented by the adjacency matrix `graph`. It initializes a `path` array that will eventually store the Hamiltonian cycle if one exists. The function `hamiltonianCycleUtil` is a utility function that performs the backtracking. The function `isSafe` checks whether it's safe to add a vertex to the current `path`.

Using an array of booleans to keep track of visited vertices can actually be more efficient than using a `Set` for this specific case. The reason is that array access by index is usually faster than hash table lookups (which is what a `Set` uses under the hood). Moreover, JavaScript arrays are contiguous blocks of memory, which is cache-friendlier.

Here's how you can modify the TypeScript code to use an array of booleans for `visited`:

```typescript
type AdjMatrix = number[][];

function isSafe(
    v: number,
    visited: boolean[],
    graph: AdjMatrix,
    lastVertex: number,
): boolean {
    // Check if this vertex is an adjacent vertex of the last added vertex.
    if (graph[lastVertex][v] === 0) {
        return false;
    }

    // Check if the vertex has already been included.
    if (visited[v]) {
        return false;
    }

    return true;
}

function hamiltonianCycleUtil(
    graph: AdjMatrix,
    path: number[],
    pos: number,
    visited: boolean[],
): boolean {
    if (pos === graph.length) {
        return graph[path[pos - 1]][path[0]] === 1;
    }

    for (const v of graph[path[pos - 1]]) {
        if (isSafe(v, visited, graph, path[pos - 1])) {
            path[pos] = v;
            visited[v] = true;

            if (hamiltonianCycleUtil(graph, path, pos + 1, visited)) {
                return true;
            }

            visited[v] = false;
            path[pos] = -1;
        }
    }

    return false;
}

function findHamiltonianCycle(graph: AdjMatrix): number[] | null {
    const path: number[] = new Array(graph.length).fill(-1);
    const visited: boolean[] = new Array(graph.length).fill(false);
    path[0] = 0;
    visited[0] = true;

    if (hamiltonianCycleUtil(graph, path, 1, visited)) {
        return path;
    } else {
        return null;
    }
}

// Test graph as adjacency list for simplicity
const graph: AdjMatrix = [
    [1, 3],
    [0, 2, 3, 4],
    [1, 4],
    [0, 1, 4],
    [1, 2, 3],
];
const result = findHamiltonianCycle(graph);
console.log("Hamiltonian Cycle:", result);
```

In this modified code, `visited` is an array of booleans. We set `visited[v] = true` when vertex `v` is added to the path and set it back to `false` when we backtrack. The `isSafe` function has been updated to check the `visited` array instead of a `Set`.

Using an array of booleans for `visited` can offer a small but potentially significant performance gain due to faster lookups and updates.

Alright, let's break down the Hamiltonian Cycle problem and the provided algorithm step-by-step. I'll explain the algorithm and demonstrate its behavior using visual graphs for clarity.

### Problem Definition:

A Hamiltonian cycle (or Hamiltonian circuit) is a cycle in an undirected or directed graph that visits each vertex exactly once and also returns to the starting vertex. Identifying the existence of such a cycle in arbitrary graphs is NP-complete.

### Algorithm Overview:

The algorithm provided is a backtracking algorithm. It starts with an empty path and one-by-one adds vertices to the path. For every added vertex, it checks for feasibility and decides whether to add the vertex or not.

The main steps of the algorithm are:

1. Add a vertex to the Hamiltonian path.
2. Check to see if adding the current vertex maintains the Hamiltonian properties.
3. If yes, move forward by adding more vertices.
4. If the addition of the current vertex doesn't lead to a solution, remove it (backtrack), and then move on to the next vertex.
5. If the path size has reached the number of vertices in the given graph and the last vertex in the path is adjacent to the starting vertex in the path, then return the path as the Hamiltonian cycle.

### Graph Representation:

The graph is represented as an adjacency matrix. For instance, if `graph[i][j]` is `1`, then there is an edge from vertex `i` to vertex `j`. Otherwise, there's no edge.

Let's visualize the example graph given in the function's comments: \[ \text{graph} = \left[ \begin{array}{ccccc} 0 & 1 & 0 & 1 & 0 \\ 1 & 0 & 1 & 1 & 1 \\ 0 & 1 & 0 & 0 & 1 \\ 1 & 1 & 0 & 0 & 1 \\ 0 & 1 & 1 & 1 & 0 \\ \end{array} \right] \]

I'll first generate a visual representation of this graph.

Here's the visual representation of the graph based on the provided adjacency matrix. The arrows denote the direction of the edges. For instance, there's an edge from vertex 0 to vertex 1, as represented by an arrow pointing from 0 to 1.

Now, let's step through the algorithm:

### Step 1: Initialization

The `findHamiltonianCycle` function initializes the `path` array with a size equal to the number of vertices in the graph. Initially, all values are set to `-1`. The first vertex (vertex `0`) is chosen as the starting point of the Hamiltonian cycle (as it's arbitrary). Therefore, `path[0]` is set to `0`.

The `visited` array keeps track of which vertices have been visited. It's initialized with all values set to `false` except for the first vertex, which is set to `true` since we start from vertex `0`.

### Step 2: Backtracking Utility

The main logic is in the recursive function `hamiltonianCycleUtil`. This function tries to find a Hamiltonian cycle using backtracking.

-   It checks if the current `path` size (`pos`) is equal to the number of vertices. If it is, it means we've added all vertices to the path. Now we just need to check if the last vertex in the path has an edge to the starting vertex (to form a cycle). If it does, we've found a Hamiltonian cycle.

-   If not, the function goes through all the vertices and checks if it's feasible to add the current vertex to the path using the helper function `isSafe`.

### Step 3: Safety Check

The `isSafe` function checks:

1. If the vertex is already visited.
2. If there's an edge from the last added vertex in the path to the current vertex.

If both conditions are met, it's safe to add the vertex to the path.

### Demonstration:

Let's walk through the algorithm using the example graph and visualize each step. I'll start with the initial state and go through the first few iterations.

Here's the initial state where we have chosen vertex `0` as the starting point of our Hamiltonian cycle (highlighted with a red edge).

Now, we'll proceed with the backtracking approach.

### Iteration 1:

Starting from vertex `0`, we'll look for the next possible vertex to add to our path.

The possibilities from vertex `0` are vertices `1` and `3` (as per the graph). Let's first try with vertex `1`.

I'll add vertex `1` to the path and visualize the result.

Now, we've added vertex `1` to our path, which is represented by the red edge from vertex `0` to vertex `1`.

### Iteration 2:

From vertex `1`, the possibilities are vertices `0`, `2`, `3`, and `4`. Since vertex `0` is our starting point and we want to form a cycle only at the end, we'll skip it for now. Let's try with vertex `2` next.

I'll add vertex `2` to the path and visualize the result.

Now, vertex `2` is added to our path, which is represented by the red edge leading from vertex `1` to vertex `2`.

### Iteration 3:

From vertex `2`, the possibilities are vertices `1` and `4`. Since vertex `1` is already in our path, we'll proceed with vertex `4`.

I'll add vertex `4` to the path and visualize the result.

Now, vertex `4` is added to our path, represented by the red edge leading from vertex `2` to vertex `4`.

### Iteration 4:

From vertex `4`, the possibilities are vertices `1`, `2`, and `3`. Since vertices `1` and `2` are already in our path, we'll proceed with vertex `3`.

I'll add vertex `3` to the path and visualize the result.

Now, vertex `3` is added to our path, represented by the red edge leading from vertex `4` to vertex `3`.

### Iteration 5:

With the current path, if we check the possibility of forming a Hamiltonian cycle, we notice that vertex `3` has an edge leading back to vertex `0` (our starting point). This means we've found a Hamiltonian cycle in the graph.

The cycle formed is: `0 -> 1 -> 2 -> 4 -> 3 -> 0`.

I'll finalize the path to form the Hamiltonian cycle and visualize the complete cycle.

There you have it! The red edges represent the complete Hamiltonian cycle: \(0 \rightarrow 1 \rightarrow 2 \rightarrow 4 \rightarrow 3 \rightarrow 0\).

To summarize:

1. The algorithm starts with an arbitrary starting point, in this case, vertex `0`.
2. Using backtracking, it tries to add vertices to the path, ensuring that each vertex is visited exactly once.
3. Once all vertices are in the path, it checks if the last vertex can form an edge with the starting vertex to complete the cycle.
4. If such a cycle is found, it returns the cycle. Otherwise, it backtracks and tries other possibilities.

The visual steps should provide a clear idea of how the algorithm works. If you'd like further explanations or have any questions, please let me know!

### References

-   [ChatGPT](https://chat.openai.com/c/3f12fc2b-a98b-484b-8353-ebf8b23dc11b)
-   [ChatGPT Algorithm explanation](https://chat.openai.com/c/5c5c5383-1996-4487-aecd-de1d3dce2e0c)
-   [YouTube](https://www.youtube.com/watch?v=dQr4wZCiJJ4)
