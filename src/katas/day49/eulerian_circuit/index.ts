declare type GraphEdge = { to: number; weight: number };
declare type WeightedAdjacencyList = GraphEdge[][];
/**
 * Finds an Eulerian circuit in an undirected graph, if it exists.
 *
 * @param {WeightedAdjacencyList} graph - The adjacency list representation of the graph.
 * @returns {number[] | null} - An array representing the Eulerian circuit, or null if none exists.
 *
 * @example
 * const graph = [
 *   [1, 2],
 *   [0, 2],
 *   [0, 1]
 * ];
 * findEulerianCircuit(graph);  // returns [0, 1, 2, 0]
 */
export function findEulerianCircuit(
    graph: WeightedAdjacencyList,
): number[] | null {
    if (
        graph.length === 0 ||
        graph.every((neighbors) => neighbors.length === 0)
    ) {
        return null;
    }

    for (const neighbors of graph) {
        if (neighbors.length % 2 !== 0) {
            return null;
        }
    }

    // if(!isConnected(graph)){
    //     return null
    // }
    const circuit: number[] = [];
    const stack: number[] = [];
    let currentVertex = 0;
    stack.push(currentVertex);

    while (stack.length > 0) {
        if (graph[currentVertex].length > 0) {
            stack.push(currentVertex);

            const nextVertex = graph[currentVertex].pop()!.to;
            graph[nextVertex] = graph[nextVertex].filter(
                (vertex) => vertex.to !== currentVertex,
            );
            currentVertex = nextVertex;
        } else {
            circuit.push(currentVertex);
            currentVertex = stack.pop()!;
        }
    }
    return circuit;
}
