import { bellmanFord } from "./index";

describe("bellmanFord Algorithm", () => {
    it("should find the shortest paths in a graph with positive weights", () => {
        const graph: WeightedAdjacencyList = [
            [
                { to: 1, weight: 1 },
                { to: 2, weight: 4 },
            ],
            [
                { to: 2, weight: 2 },
                { to: 3, weight: 5 },
            ],
            [{ to: 3, weight: 1 }],
            [],
        ];
        const source = 0;
        const result = bellmanFord(graph, source);
        expect(result).toEqual([0, 1, 3, 4]);
    });

    it("should find the shortest paths in a graph with negative weights", () => {
        const graph: WeightedAdjacencyList = [
            [
                { to: 1, weight: 1 },
                { to: 2, weight: 4 },
            ],
            [{ to: 2, weight: -2 }],
            [{ to: 3, weight: 2 }],
            [],
        ];
        const source = 0;
        const result = bellmanFord(graph, source);
        expect(result).toEqual([0, 1, -1, 1]);
    });

    it("should return null for a graph with a negative weight cycle", () => {
        const graph: WeightedAdjacencyList = [
            [
                { to: 1, weight: 1 },
                { to: 2, weight: 4 },
            ],
            [{ to: 2, weight: -2 }],
            [
                { to: 3, weight: 2 },
                { to: 1, weight: -5 },
            ],
            [],
        ];
        const source = 0;
        const result = bellmanFord(graph, source);
        expect(result).toBeNull();
    });

    it("should handle disconnected vertices", () => {
        const graph: WeightedAdjacencyList = [[{ to: 1, weight: 2 }], [], []];
        const source = 0;
        const result = bellmanFord(graph, source);
        expect(result).toEqual([0, 2, Infinity]);
    });

    it("should handle an empty graph", () => {
        const graph: WeightedAdjacencyList = [];
        const source = 0;
        const result = bellmanFord(graph, source);
        expect(result).toEqual([]);
    });

    it("should handle single-node graphs", () => {
        const graph: WeightedAdjacencyList = [[]];
        const source = 0;
        const result = bellmanFord(graph, source);
        expect(result).toEqual([0]);
    });
});
