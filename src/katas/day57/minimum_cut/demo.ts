export function findMinimumCut(graph: WeightedAdjacencyList): number {
    // Handle the case of an empty graph or a graph with no edges
    if (!graph || graph.every((node) => node.length === 0)) {
        return 0; // The minimum cut for an empty graph is 0
    }
    
    let minCut = Infinity;
    let vertexCount = graph.length;
    let vertices = Array.from({ length: vertexCount }, (_, i) => i);

    for (let i = 0; i < vertexCount - 1; i++) {
        const [cutWeight, a, b] = minimumCutPhase(graph, vertices);
        minCut = Math.min(minCut, cutWeight);
        mergeVertices(graph, vertices, a, b);
    }

    return minCut;
}

function minimumCutPhase(
    graph: WeightedAdjacencyList,
    
    vertices: number[],
): [number, number, number] {
    let added = new Array(graph.length).fill(false);
    let weights = new Array(graph.length).fill(0);
    let prevVertex = -1;
    let lastVertex = -1;

    vertices.forEach((v) => {
        added.fill(false);
        weights.fill(0);

        for (let i = 0; i < vertices.length; i++) {
            let maxWeight = -1;
            let nextVertex = -1;

            graph[v].forEach((edge) => {
                if (!added[edge.to]) {
                    weights[edge.to] += edge.weight;
                    if (weights[edge.to] > maxWeight) {
                        nextVertex = edge.to;
                        maxWeight = weights[edge.to];
                    }
                }
            });

            if (nextVertex !== -1) {
                added[nextVertex] = true;
                prevVertex = lastVertex;
                lastVertex = nextVertex;
            }
        }
    });

    const cutWeight = weights[lastVertex];
    return [cutWeight, prevVertex, lastVertex];
}

function mergeVertices(
    graph: WeightedAdjacencyList,
    vertices: number[],
    a: number,
    b: number,
): void {
    if (a === -1 || b === -1) return;

    // Update the edges from 'b' to 'a'
    graph[b].forEach((bEdge) => {
        let edgeFound = false;
        graph[a] = graph[a].map((aEdge) => {
            if (aEdge.to === bEdge.to) {
                edgeFound = true;
                return { to: aEdge.to, weight: aEdge.weight + bEdge.weight };
            }
            return aEdge;
        });

        // If no edge found, add a new edge
        if (!edgeFound && bEdge.to !== a) {
            graph[a].push({ to: bEdge.to, weight: bEdge.weight });
        }
    });

    // Remove all edges from 'b'
    graph[b] = [];

    // Update edges pointing to 'b' to point to 'a'
    vertices.forEach((v) => {
        graph[v] = graph[v].map((edge) => {
            if (edge.to === b) {
                return { to: a, weight: edge.weight };
            }
            return edge;
        });
    });

    // Remove duplicate edges and sum their weights
    let combinedEdges = new Map<number, number>();
    graph[a].forEach((edge) => {
        if (combinedEdges.has(edge.to)) {
            combinedEdges.set(
                edge.to,
                combinedEdges.get(edge.to)! + edge.weight,
            );
        } else {
            combinedEdges.set(edge.to, edge.weight);
        }
    });

    graph[a] = Array.from(combinedEdges, ([to, weight]) => ({ to, weight }));
}
