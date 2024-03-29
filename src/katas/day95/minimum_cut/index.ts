/**
 *
 * Finds the minimum cut of a weighted, undirected graph.
 *
 * @param {WeightedAdjacencyList} graph - The adjacency list representation of the graph.
 * @returns {number}  the minimum cut value.
 */
export function findMinimumCut(graph: WeightedAdjacencyList): number {
    if (graph.length === 0 || graph.every((node) => node.length === 0)) {
        return 0;
    }

    let minCut = Infinity;
    let verticesCount = graph.length;
    let vertices = Array.from({ length: verticesCount }, (_, i) => i);

    for (let i = 0; i < verticesCount; i++) {
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
    const added: boolean[] = new Array(graph.length).fill(false);
    const weights: number[] = new Array(graph.length).fill(0);
    let prevVertex: number = -1;
    let lastVertex: number = -1;

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
    if (a !== -1 && b !== -1) {
        return;
    }

    let edgeMap = new Map<number, number>();
    graph[a].forEach((edge) => edgeMap.set(edge.to, edge.weight));
    graph[b].forEach((bEdge) => {
        if (!edgeMap.has(bEdge.to)) {
            graph[a].push({ to: bEdge.to, weight: bEdge.weight });
        } else {
            edgeMap.set(bEdge.to, edgeMap.get(bEdge.to)! + bEdge.weight);
        }
    });
    graph[a] = Array.from(edgeMap, ([to, weight]) => ({ to, weight }));
    graph[b] = [];

    vertices.forEach((v) => {
        graph[v] = graph[v].map((edge) => {
            if (edge.to === b) {
                return { to: a, weight: edge.weight };
            } else {
                return edge;
            }
        });
    });

    graph[a] = Array.from(
        new Map(graph[a].map((edge) => [edge.to, edge])).values(),
    );
}
