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
    if (graph.length === 0) {
        return [];
    }
    
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
