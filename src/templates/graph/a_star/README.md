# A\* algorithm

## Problem Description

The A\* (pronounced "A-star") algorithm is commonly used for finding the shortest path between two points in a graph, such as finding the shortest route on a map, pathfinding for characters in video games, or navigating a robot through a maze. It's often preferred over other pathfinding algorithms like Dijkstra's Algorithm or Breadth-First Search (BFS) because it's more efficient in terms of time complexity while guaranteeing optimality, provided that certain conditions are met.

The problem generally consists of the following elements:

1. **Nodes**: These represent discrete positions, such as locations on a map, intersections, or states in a puzzle.
2. **Edges**: These represent connections between nodes, which could be roads between intersections on a map, or transitions between states.
3. **Start Node**: The node where the search starts.
4. **Goal Node**: The node where the search ends.
5. **Cost**: A function that describes the cost to move from one node to another (often denoted as `g(n)`).
6. **Heuristic**: A function that estimates the cost from a given node to the goal node (often denoted as `h(n)`).

The A\* algorithm aims to find the least-cost path from the start node to the goal node, taking both actual costs and heuristic estimates into account.

## Algorithm Type

A\* is an informed search algorithm, which means it uses a heuristic to estimate the cost to reach the goal node from any node in the graph. It's a variation of Dijkstra's Algorithm that uses this heuristic to speed up the search process.

## Algorithm Outline

1. **Initialization**:

    - Create two lists, `Open` and `Closed`. The Open list contains nodes that are to be evaluated, and the Closed list contains nodes that have already been evaluated.
    - Add the start node to the Open list and calculate its `f(n) = g(n) + h(n)` score, where `g(n)` is the cost from the start node to `n`, and `h(n)` is the estimated cost from `n` to the goal node.

2. **Main Loop**:
    - While the Open list is not empty:
        1. Find the node with the lowest `f(n)` score in the Open list.
        2. Move this node to the Closed list.
        3. If this node is the goal node, reconstruct the path and return it.
        4. Otherwise, examine its neighbors.
            - For each neighbor, calculate its `f(n)` score.
            - If the neighbor is already in the Closed list or offers no improvement, skip it.
            - If the neighbor is not in the Open list, or this path is better than the previous one, update its score and add it to the Open list.

## TypeScript Implementation

Below is a TypeScript implementation of the A\* algorithm using the given function signature:

```typescript
type WeightedAdjacencyList = GraphEdge[][];
type GraphEdge = { to: number; weight: number };

/**
 * Finds the shortest path from source to target using the A* algorithm.
 *
 * @param {WeightedAdjacencyList} graph - The adjacency list representation of the graph.
 * @param {number} source - The source vertex.
 * @param {number} target - The target vertex.
 * @returns {number[]} - The shortest path from source to target as an array of vertices.
 */
export function findAStarPath(
    graph: WeightedAdjacencyList,
    source: number,
    target: number,
): number[] {
    // Create Open and Closed lists
    const open: number[] = [source];
    const closed: number[] = [];

    // Initialize g and f scores
    const gScores: { [key: number]: number } = {};
    const fScores: { [key: number]: number } = {};
    gScores[source] = 0;
    fScores[source] = heuristic(source, target); // Assuming heuristic function is defined

    // Store predecessors for path reconstruction
    const cameFrom: { [key: number]: number } = {};

    while (open.length > 0) {
        // Sort the open list by f score and get the node with lowest f score
        open.sort((a, b) => fScores[a] - fScores[b]);
        const current = open.shift()!; // Remove and get the first element from the open list

        if (current === target) {
            // Reconstruct the path
            return reconstructPath(cameFrom, current);
        }

        closed.push(current);

        for (const neighborEdge of graph[current]) {
            const neighbor = neighborEdge.to;
            if (closed.includes(neighbor)) continue; // Skip if neighbor is in Closed list

            // Calculate tentative gScore
            const tentativeGScore = gScores[current] + neighborEdge.weight;

            if (!open.includes(neighbor)) {
                open.push(neighbor);
            } else if (tentativeGScore >= gScores[neighbor]!) {
                continue; // This is not a better path
            }

            // Update cameFrom, gScores and fScores for this neighbor
            cameFrom[neighbor] = current;
            gScores[neighbor] = tentativeGScore;
            fScores[neighbor] = tentativeGScore + heuristic(neighbor, target);
        }
    }

    // Path was not found
    return [];
}

/**
 * Reconstructs the shortest path from source to target.
 *
 * @param {object} cameFrom - The predecessors of each vertex.
 * @param {number} current - The target vertex.
 * @returns {number[]} - The shortest path from source to target as an array of vertices.
 */
function reconstructPath(
    cameFrom: { [key: number]: number },
    current: number,
): number[] {
    const totalPath: number[] = [current];

    while (cameFrom[current] !== undefined) {
        current = cameFrom[current];
        totalPath.unshift(current);
    }

    return totalPath;
}

/**
 * Heuristic function for A*. This is just a placeholder.
 * Replace this with an actual heuristic for your specific use case.
 *
 * @param {number} a - The current vertex.
 * @param {number} b - The target vertex.
 * @returns {number} - The estimated cost from a to b.
 */
function heuristic(a: number, b: number): number {
    // Replace this with your actual heuristic
    return Math.abs(b - a);
}
```

This implementation is based on a weighted adjacency list representation of a graph. The heuristic function used here (`heuristic`) is just a placeholder and should be replaced with an appropriate heuristic function for your specific problem.

## References

-   [ChatGPT](https://chat.openai.com/c/c723e627-9d59-4dff-99a2-68445de9f19c)
-   [Youtube](https://www.youtube.com/watch?v=aKYlikFAV4k)
