/**
 * Finds the minimum cut of a weighted, undirected graph.
 *
 * @param {WeightedAdjacencyList} graph - The adjacency list representation of the graph.
 * @returns {number}  the minimum cut value.
 */
export function findMinimumCut(graph: WeightedAdjacencyList): number {
    // Handle empty graph
    if (graph.length === 0 || graph.every((edges) => edges.length === 0)) {
        return 0;
    }

    let minCut = Infinity;
    let vertexCount = graph.length;
    let vertices = Array.from({ length: vertexCount }, (_, i) => i);

    for (let i = 0; i < vertexCount - 1; i++) {
        const [cutWeight, a, b] = minimumCutPhase(graph, vertices);
        minCut = Math.min(cutWeight, minCut);
        mergeVertices(graph, vertices, a, b);
    }

    return minCut;
}

function minimumCutPhase(
    graph: WeightedAdjacencyList,
    vertices: number[],
): [number, number, number] {
    const added: boolean[] = new Array(graph.length).fill(false);
    const weights: number[] = new Array(graph.length).fill(0);
    let prevVertex: number = -1;
    let lastVertex: number = -1;

    vertices.forEach((v) => {
        added.fill(false);
        weights.fill(0);

        for (let i = 0; i < graph.length; i++) {
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
    if (a === -1 || b === -1) {
        return;
    }

    graph[b].forEach((bEdge) => {
        let edgeFound = false;
        graph[a] = graph[a].map((aEdge) => {
            if (aEdge === bEdge) {
                edgeFound = true;
                return {
                    to: aEdge.to,
                    weight: aEdge.weight + bEdge.weight,
                };
            }
            return aEdge;
        });

        if (!edgeFound && bEdge.to !== a) {
            graph[a].push({ to: bEdge.to, weight: bEdge.weight });
        }
    });

    graph[b] = [];

    vertices.forEach((v) => {
        graph[v] = graph[v].map((edge) => {
            if (edge.to === b) {
                return { to: a, weight: edge.weight };
            }
            return edge;
        });
    });

    let combinedEdges = new Map<number, number>();
    graph[a].forEach((edge) => {
        const weight = combinedEdges.get(edge.to);
        if (weight !== undefined) {
            combinedEdges.set(edge.to, weight + edge.weight);
        } else {
            combinedEdges.set(edge.to, edge.weight);
        }
    });
    graph[a] = Array.from(combinedEdges, ([to, weight]) => ({ to, weight }));
}
