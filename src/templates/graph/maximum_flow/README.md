# Maximum flow

## Problem Description

The maximum flow problem is a classic question in computer science and operations research where you aim to find the greatest possible flow from a source node (often labeled as `s`) to a sink node (often labeled as `t`) in a weighted, directed graph. Each edge in this graph has a non-negative capacity, which represents the maximum amount of flow that can pass through that edge.

The objective is to push as much flow as possible from the source to the sink. However, there are constraints:

1. **Flow Capacity Constraint**: The flow on an edge cannot exceed the capacity of the edge.
2. **Flow Conservation Constraint**: Except for the source, which "produces" flow, and the sink, which "consumes" it, the flow into each node must equal the flow out of it.

The graph is defined by:

-   A set of nodes \( V \), where \( s, t \in V \) are the source and sink nodes respectively.
-   A set of directed edges \( E \subseteq V \times V \), where each edge \( (u, v) \) has a capacity \( c(u, v) \geq 0 \).

## Algorithms to Solve the Maximum Flow Problem

Several algorithms can solve the maximum flow problem:

1. **Ford-Fulkerson Algorithm**: This method relies on finding augmenting paths in the network. An augmenting path is a path from the source to the sink where the residual capacity (the capacity left on the path) is greater than zero. The algorithm repeatedly finds an augmenting path and increases the flow along this path until no more augmenting paths can be found. The Edmonds-Karp algorithm is an implementation of the Ford-Fulkerson method that uses BFS to find the shortest augmenting path, which ensures polynomial time complexity.

2. **Dinic's Algorithm**: An advanced version of the Ford-Fulkerson method that uses a level graph (which is constructed using BFS) to find blocking flows. It can be faster than the Edmonds-Karp implementation, especially on networks with unit capacities.

3. **Push-Relabel Algorithm**: This algorithm maintains a preflow (which is like a flow but allows more flow entering a node than leaving) and gradually converts it into a valid flow by "pushing" excess flow from node to node and "relabeling" (increasing the height of) nodes to allow more pushes, until there is no excess flow at any node except the sink.

4. **Goldberg-Tarjan's Algorithm**: An optimized version of the Push-Relabel algorithm that uses heuristics to select which node to push flow from and which edge to push flow along, improving efficiency.

These algorithms vary in complexity and performance based on the graph's structure and the capacities of edges. For many practical applications, the Edmonds-Karp implementation of the Ford-Fulkerson method is used due to its simplicity and guaranteed polynomial-time complexity. However, for larger graphs or graphs with certain properties (like those with many unit-capacity edges), algorithms like Dinic's or Push-Relabel can be significantly faster.

## Historical Context

The maximum flow problem has a rich history, with its origins in the transportation and logistics fields. It was first formulated by T. E. Harris and F. S. Ross in 1954, but it was L. R. Ford, Jr., and D. R. Fulkerson who published the first widely acknowledged algorithm for solving the maximum flow problem in 1956. Their work was initially motivated by military logistics problems during World War II, particularly those related to maximizing the flow of supplies from depots to the front line.

The Ford-Fulkerson algorithm was a breakthrough because it provided a methodical way to approach network flow problems, which were previously solved using ad hoc methods without a guarantee of finding the optimal solution.

Since then, there have been many improvements and variations of the initial algorithm. The Edmonds-Karp algorithm, proposed in 1972, was significant because it improved the Ford-Fulkerson algorithm by ensuring that the running time was bounded by a polynomial of the graph size. This was achieved by choosing the shortest augmenting path (in terms of the number of edges) in each iteration.

The Push-Relabel algorithm, introduced by Andrew V. Goldberg and Robert E. Tarjan in 1988, represented a different approach to the problem. It improved upon the running time of the Ford-Fulkerson method for graphs with large capacities and was especially effective on dense graphs.

## Applications of Maximum Flow Algorithms

The algorithms for solving the maximum flow problem have applications in various fields:

1. **Network Design**: Optimizing the throughput of a network by determining the maximum data that can be transferred from a source to a destination.

2. **Transportation and Logistics**: Planning and optimizing routes for goods and services, such as determining the most efficient way to route vehicles from warehouses to stores or setting up carpooling systems.

3. **Telecommunications**: Managing the flow of information in communication networks to avoid bottlenecks and optimize bandwidth.

4. **Bipartite Matching**: In a bipartite graph, the maximum flow algorithms can be used to find the maximum matching, which has applications in job assignments, where jobs are matched to candidates.

5. **Project Management**: The algorithms can be used for the Critical Path Method (CPM) for scheduling project activities.

6. **Computer Vision**: In image processing and computer vision, maximum flow algorithms are used for tasks such as image segmentation.

7. **Sports Scheduling**: Creating optimal schedules for sports leagues where teams have to play against each other.

8. **Airline Scheduling**: Scheduling flights in such a way as to maximize the number of passengers that can travel between pairs of cities over a given time period.

The maximum flow problem and its algorithms are foundational concepts in operations research and computer science, and they continue to have a wide array of applications in modern-day problems that involve network flows.

## TypeScript implementation

Certainly! Here's an efficient and straightforward implementation of the Edmonds-Karp algorithm for solving the maximum flow problem. This algorithm uses breadth-first search (BFS) to find the shortest augmenting paths from the source to the sink in a loop until no more augmenting paths can be found.

```typescript
declare type GraphEdge = { to: number; weight: number };
declare type WeightedAdjacencyList = GraphEdge[][];

/**
 * Implements the Edmonds-Karp algorithm to find the maximum flow in a graph.
 * @param graph The graph represented as an adjacency list where each edge has a 'to' and a 'weight' property.
 * @param source The index of the source node.
 * @param sink The index of the sink node.
 * @returns The maximum flow from source to sink.
 */
export function findMaximumFlow(
    graph: WeightedAdjacencyList,
    source: number,
    sink: number,
): number {
    const n = graph.length;
    const capacity = new Array(n).fill(0).map(() => new Array(n).fill(0));

    // Construct the capacity matrix
    for (let u = 0; u < n; u++) {
        for (let edge of graph[u]) {
            capacity[u][edge.to] = edge.weight;
        }
    }

    let maxFlow = 0;
    let parent = new Array(n).fill(-1);

    const bfs = (
        graph: WeightedAdjacencyList,
        source: number,
        sink: number,
        parent: number[],
    ): boolean => {
        let visited = new Array(n).fill(false);
        let queue: number[] = [];
        queue.push(source);
        visited[source] = true;
        parent[source] = -1;

        while (queue.length !== 0) {
            let u = queue.shift() as number;

            for (let v = 0; v < n; v++) {
                if (!visited[v] && capacity[u][v] > 0) {
                    queue.push(v);
                    parent[v] = u;
                    visited[v] = true;
                }
            }
        }

        return visited[sink];
    };

    // Augment the flow while there is a path from source to sink
    while (bfs(graph, source, sink, parent)) {
        // Find the minimum residual capacity of the edges along the path filled by BFS
        let pathFlow = Infinity;
        for (let v = sink; v !== source; v = parent[v]) {
            let u = parent[v];
            pathFlow = Math.min(pathFlow, capacity[u][v]);
        }

        // Update residual capacities of the edges and reverse edges along the path
        for (let v = sink; v !== source; v = parent[v]) {
            let u = parent[v];
            capacity[u][v] -= pathFlow;
            capacity[v][u] += pathFlow;
        }

        maxFlow += pathFlow;
    }

    return maxFlow;
}

// Example usage:
const graph: WeightedAdjacencyList = [
    [
        { to: 1, weight: 10 },
        { to: 2, weight: 5 },
    ],
    [
        { to: 2, weight: 15 },
        { to: 3, weight: 10 },
    ],
    [
        { to: 3, weight: 10 },
        { to: 1, weight: 4 },
    ], // Adding a reverse path for demonstration
    [], // Sink has no outgoing edges
];
console.log(findMaximumFlow(graph, 0, 3)); // Output should be 15
```

This code defines a TypeScript function `findMaximumFlow` that takes a graph represented by a weighted adjacency list, a source node, and a sink node. The function returns the maximum flow from the source to the sink node.

The algorithm constructs a capacity matrix from the adjacency list and then uses BFS to find augmenting paths. It calculates the flow along the path by finding the minimum capacity edge. It then adjusts the capacities and calculates the maximum flow iteratively.

### Algorithm explanation

The Edmonds-Karp algorithm is an implementation of the Ford-Fulkerson method for computing the maximum flow in a flow network. It uses breadth-first search (BFS) to find the shortest augmenting paths from the source to the sink. The shortest path here refers to the path with the minimum number of edges. By choosing the shortest paths, the Edmonds-Karp algorithm ensures that the number of augmenting path iterations is polynomial in the size of the graph, which provides it with a polynomial time complexity.

Here's a step-by-step breakdown of how the algorithm is implemented:

1. **Initialization**: Create a matrix called `capacity` that represents the capacities of the edges between nodes. This matrix is constructed from the given weighted adjacency list.

2. **Augmenting Path Search**: Use BFS to search for the shortest augmenting path from the source to the sink. An augmenting path is a path where the residual capacity (original capacity minus the current flow) is greater than zero for every edge in the path. BFS is used because it finds the shortest path in terms of the number of edges. This path is stored using the `parent` array, which tracks the path from the source to each node.

3. **Path Flow Calculation**: After finding an augmenting path, calculate the path flow, which is the minimum residual capacity along the found path. This is the maximum amount of flow that can be pushed through this path without violating the capacity constraint.

4. **Residual Capacity Adjustment**: Once the minimum residual capacity is found, subtract this value from the capacities along the path to reflect the used capacity and add it to the reverse path to allow for flow "undoing," which is necessary for the algorithm to find new augmenting paths in the future iterations.

5. **Flow Accumulation**: Add the path flow to the `maxFlow` variable, which keeps track of the total flow from the source to the sink.

6. **Repeat**: Repeat the process of finding augmenting paths and adjusting the flows until no more augmenting paths can be found. When no augmenting path exists, the `maxFlow` variable contains the maximum flow in the network.

7. **Termination**: The algorithm terminates when BFS can no longer find a path from the source to the sink with positive residual capacity. At this point, the `maxFlow` variable holds the maximum flow value.

#### Time Complexity

The time complexity of the Edmonds-Karp algorithm is \( O(V \cdot E^2) \), where \( V \) is the number of vertices and \( E \) is the number of edges in the graph. This is because:

-   Each BFS takes \( O(E) \) time.
-   Each augmenting path can be found in \( O(E) \) time (since BFS is used).
-   There can be at most \( O(V \cdot E) \) augmenting paths found across all iterations since the shortest path is chosen each time, which means that each edge can become critical (the one that determines the path length) at most \( O(V) \) times.

#### Space Complexity

The space complexity of the algorithm is \( O(V^2) \) because of the capacity matrix used to store the graph. Even though the input graph is given as an adjacency list (which would normally allow more compact storage of sparse graphs), the algorithm constructs a full \( V \times V \) matrix to keep track of the residual capacities between all pairs of vertices.

In summary, the Edmonds-Karp algorithm is a robust way to solve the maximum flow problem with guaranteed polynomial time complexity. It systematically finds augmenting paths and adjusts the flow until no more paths can be found, thus ensuring that the maximum flow is reached.

## References

-   (ChatGPT)[https://chat.openai.com/c/1a8458ab-4674-4a98-b5ff-be3680390886]
