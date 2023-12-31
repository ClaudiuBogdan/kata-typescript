# Articulation Points

## Articulation Points Problem Description:

In graph theory, an articulation point (or cut vertex) is a vertex that, when removed along with its associated edges, makes the graph disconnected (or more precisely, increases the number of connected components in the graph). A connected graph without any articulation points is called "biconnected".

In more practical terms, imagine a network of computers. An articulation point would be a computer that, if it fails, splits the network into two or more separate pieces, preventing communication between them.

## Identifying Articulation Points:

The problem of finding all articulation points in a given graph can be solved using depth-first search (DFS).

### Algorithm to find Articulation Points:

1. Start DFS traversal from any arbitrary vertex, marking each visited vertex with a unique timestamp.
2. For each vertex `v`, keep track of:
    - `discovery[v]`: The timestamp when `v` was first discovered.
    - `low[v]`: The earliest discovered vertex reachable from the subtree rooted at `v`.
3. A vertex `v` is an articulation point if:
    - It is the root of the DFS tree and has at least two children.
    - It is not the root, but for some child `w` of `v`, there's no back edge from `w` or any of its descendants to an ancestor of `v` that was discovered before `v` (i.e., `discovery[ancestor] < low[w]`).

### TypeScript Implementation:

Here's a basic outline of the algorithm in TypeScript:

```typescript
type AdjacencyList = number[][];

/**
 * Finds articulation points in an undirected graph.
 *
 * @param {AdjacencyList} graph - The adjacency list representation of the graph.
 * @returns {number[]} - An array of articulation points in the graph.
 *
 * @example
 * const graph = [
 *   [1, 2],
 *   [0, 2],
 *   [0, 1, 3],
 *   [2]
 * ];
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

                if (parent[u] === -1 && children > 1) {
                    articulationPoints.add(u);
                }
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
```

This is a basic implementation of the algorithm to find articulation points using DFS. Depending on the graph's representation and other factors, optimizations might be necessary for specific use cases.

## I don't understand this condition: It is not the root, but for some child w of v, there's no back edge from w or any of its descendants to an ancestor of v that was discovered before v (i.e., discovery[ancestor] < low[w])

The condition you're asking about is crucial for identifying non-root articulation points in a graph. Let's break it down step by step.

### Back Edges & DFS Tree:

When you're performing a Depth-First Search (DFS) on a graph, the edges can be classified into a few types. One of the types is a "back edge". A back edge is an edge that connects a vertex to an ancestor in the DFS tree, but it's not the tree edge (i.e., it's not the edge we traversed to discover that vertex).

### Low Value:

For each vertex `v`, `low[v]` captures the lowest discovery time of any vertex that can be reached from `v` (including `v` itself) by traveling through tree edges and at most one back edge.

### Condition for Articulation Point:

Now, let's analyze the condition:

> "It is not the root, but for some child w of v, there's no back edge from w or any of its descendants to an ancestor of v that was discovered before v (i.e., `discovery[ancestor] < low[w]`)."

For a non-root vertex `v` to be an articulation point, removing it from the graph should disconnect some of its descendants in the DFS tree from the rest of the graph.

This condition is verified by checking its child `w` and ensuring that there's no back edge from `w` or any of its descendants that connects to an ancestor of `v` discovered before `v` itself. If this is true, it means that the subtree rooted at `w` can't reach an ancestor of `v` without passing through `v`, and thus, `v` becomes an articulation point.

The mathematical way to check this is to see if the earliest discovered vertex reachable from `w` (`low[w]`) has a discovery time that's greater than or equal to the discovery time of `v` (`discovery[v]`). If this is true, it implies there's no back edge from the subtree rooted at `w` to an ancestor of `v` that was discovered before `v`.

### Intuitive Explanation:

Imagine you're exploring a cave system, and you're marking each cave chamber with a number in the order you discover it. If you're in chamber `v` and you send an explorer down a tunnel to chamber `w`, but they can't find a way back to any chamber you visited before `v` without going through `v` again, then `v` is a critical chamber. If `v` collapses, anyone in `w` or beyond can't get back to the main entrance.

This "way back" is represented by the back edge in the graph, and the condition checks if such a path exists for the child `w` of vertex `v`.

## Low Value Explanation

Let's delve into the provided function and explain the computation of the `low` values.

### Definition:

In the context of the function, the `low` value for a vertex `u` represents the earliest `discovery` timestamp reachable from `u` or any of its descendants in the DFS traversal, by traversing regular tree edges and at most one back edge.

### Explanation with Reference to the Function:

1. **Initialization**: When a vertex `u` is first visited in the DFS traversal, both its `discovery` and `low` values are set to the current `time` value:

    ```typescript
    discovery[u] = time;
    low[u] = time;
    ```

2. **Child Vertex**: For every neighboring vertex `v` of `u`:

    - After visiting vertex `v` (i.e., after the `dfs(v)` call), the `low` value of `u` is updated based on the `low` value of `v`:
        ```typescript
        low[u] = Math.min(low[u], low[v]);
        ```
        This captures the essence that if the vertex `v` (or any of its descendants) has a back edge to an ancestor of `u`, then `low[u]` will take this into account.

3. **Back Edge**: If there's a back edge from `u` to some already visited vertex `v` that's not the parent of `u`, the `low` value of `u` is updated to the `discovery` time of `v`:
    ```typescript
    if (v !== parent[u]) {
        low[u] = Math.min(low[u], discovery[v]);
    }
    ```

### Purpose of Low Value:

The `low` values are used to identify articulation points in the graph:

-   If `u` is the root of the DFS tree and has two or more children, it's an articulation point:

    ```typescript
    if (parent[u] === -1 && children > 1) {
        articulationPoints.add(u);
    }
    ```

-   If `u` is not the root and the `low` value of one of its children `v` is greater than or equal to the `discovery` value of `u`, then `u` is an articulation point:
    ```typescript
    if (parent[u] !== -1 && low[v] >= discovery[u]) {
        articulationPoints.add(u);
    }
    ```

### Intuitive Explanation:

Imagine you are exploring a cave system. Each chamber (vertex) in the cave is given a unique number based on the order in which you discover it. As you explore deeper, sometimes you find shortcuts (back edges) connecting chambers you've already been to.

The `low` value for a chamber helps you remember the earliest chamber you can reach using these shortcuts. If a chamber and all its sub-chambers can't find a shortcut to an earlier chamber without passing through the current chamber, it means that chamber is critical. If it collapses, everyone inside its sub-chambers would be trapped.

This `low` value helps the algorithm identify such critical chambers (articulation points) in the cave system (graph).

I hope this helps clarify the `low` point computation in the provided function!

## References:

-   [Youtube](https://www.youtube.com/watch?v=jFZsDDB0-vo)
-   [ChatGPT](https://chat.openai.com/c/194e771f-144a-4b26-bf4a-29853b424b21)
