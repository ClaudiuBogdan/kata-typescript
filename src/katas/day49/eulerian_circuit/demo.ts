declare type GraphEdge = { to: number; weight: number };
declare type WeightedAdjacencyList = GraphEdge[][];

// Function to check if graph is connected
function isConnected(graph: WeightedAdjacencyList): boolean {
    const visited: boolean[] = Array(graph.length).fill(false);
    let startVertex = -1;
    for (let i = 0; i < graph.length; i++) {
        if (graph[i].length > 0) {
            startVertex = i;
            break;
        }
    }

    if (startVertex === -1) {
        return true; // empty graph is considered connected
    }

    const stack: number[] = [startVertex];
    while (stack.length > 0) {
        const vertex = stack.pop()!;
        if (!visited[vertex]) {
            visited[vertex] = true;
            for (const { to } of graph[vertex]) {
                if (!visited[to]) {
                    stack.push(to);
                }
            }
        }
    }

    return visited.every((val, i) => val || graph[i].length === 0);
}

export function findEulerianCircuit(
    graph: WeightedAdjacencyList,
): number[] | null {
    if (
        graph.length === 0 ||
        graph.every((neighbors) => neighbors.length === 0)
    ) {
        return null;
    }
    // Step 1: Check if all vertex degrees are even
    for (const neighbors of graph) {
        if (neighbors.length % 2 !== 0) {
            return null;
        }
    }

    // Step 2: Check if the graph is connected
    if (!isConnected(graph)) {
        return null;
    }

    // Step 3 & 4: Hierholzer's Algorithm
    const circuit: number[] = [];
    const stack: number[] = [];
    let currentVertex = 0; // Start from vertex 0
    stack.push(currentVertex);

    // Loop as long as there are vertices on the stack
    while (stack.length) {
        // If the current vertex has adjacent vertices left to explore
        if (graph[currentVertex].length) {
            // Push the current vertex onto the stack
            stack.push(currentVertex);

            // Take one adjacent vertex from the current vertex's list, and remove the edge from the graph
            const nextVertex = graph[currentVertex].pop()!.to;

            // Remove the reverse edge from the graph
            graph[nextVertex] = graph[nextVertex].filter(
                (edge) => edge.to !== currentVertex,
            );

            // Move to the next vertex
            currentVertex = nextVertex;
        } else {
            // If the current vertex has no adjacent vertices left to explore,
            // it's part of the Eulerian circuit, so add it to the circuit array
            circuit.push(currentVertex);

            // Pop the last vertex from the stack to backtrack and continue forming the circuit
            currentVertex = stack.pop()!;
        }
    }

    // Reverse the circuit to get the correct order
    return circuit.reverse();
}
