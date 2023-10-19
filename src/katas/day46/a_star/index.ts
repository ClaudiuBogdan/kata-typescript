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

    const open: number[] = [source];
    const closed: number[] = [];

    const gScore: { [key: number]: number } = {};
    const fScore: { [key: number]: number } = {};

    gScore[source] = 0;
    fScore[source] = heuristic(source, target);

    const prev: { [key: number]: number } = {};

    while (open.length > 0) {
        open.sort((a, b) => fScore[a] - fScore[b]);
        const current = open.shift()!;

        if (current === target) {
            return reconstructPath(prev, current);
        }

        closed.push(current);

        for (let neighborEdge of graph[current]) {
            const neighbor = neighborEdge.to;
            if (closed.includes(neighbor)) {
                continue;
            }

            const tentativeGScore = gScore[current] + neighborEdge.weight;
            if (!open.includes(neighbor)) {
                open.push(neighbor);
            } else if (tentativeGScore >= gScore[neighbor]) {
                continue;
            }

            prev[neighbor] = current;
            gScore[neighbor] = tentativeGScore;
            fScore[neighbor] = tentativeGScore + heuristic(neighbor, target);
        }
    }
    return [];
}

function heuristic(source: number, target: number): number {
    return Math.abs(target - source);
}

function reconstructPath(
    prev: { [key: number]: number },
    current: number,
): number[] {
    const path: number[] = [current];
    while (prev[current] !== undefined) {
        current = prev[current];
        path.unshift(current);
    }

    return path;
}
