import { findEulerianCircuit } from "./demo";

describe("Eulerian Circuit Finding - Hierholzer's Algorithm", () => {
    test("should return null for empty graph", () => {
        const graph: WeightedAdjacencyList = [];
        expect(findEulerianCircuit(graph)).toBeNull();
    });

    test("should return null for a single vertex with no edges", () => {
        const graph: WeightedAdjacencyList = [[]];
        expect(findEulerianCircuit(graph)).toBeNull();
    });

    test("should return null for disconnected graph", () => {
        const graph: WeightedAdjacencyList = [
            [{ to: 1, weight: 1 }],
            [{ to: 0, weight: 1 }],
            [{ to: 3, weight: 1 }],
            [{ to: 2, weight: 1 }],
        ];
        expect(findEulerianCircuit(graph)).toBeNull();
    });

    test("should return null for graph with vertices of odd degrees", () => {
        const graph: WeightedAdjacencyList = [
            [{ to: 1, weight: 1 }],
            [
                { to: 0, weight: 1 },
                { to: 2, weight: 1 },
            ],
            [{ to: 1, weight: 1 }],
        ];
        expect(findEulerianCircuit(graph)).toBeNull();
    });

    test("should return an Eulerian circuit for a valid graph", () => {
        const graph: WeightedAdjacencyList = [
            [
                { to: 1, weight: 1 },
                { to: 2, weight: 1 },
            ],
            [
                { to: 0, weight: 1 },
                { to: 2, weight: 1 },
            ],
            [
                { to: 0, weight: 1 },
                { to: 1, weight: 1 },
            ],
        ];
        const result = findEulerianCircuit(graph);
        expect(result).toEqual([0, 2, 1, 0]);
    });

    test("should return an Eulerian circuit for a larger valid graph", () => {
        const graph: WeightedAdjacencyList = [
            [
                { to: 1, weight: 1 },
                { to: 3, weight: 1 },
            ],
            [
                { to: 0, weight: 1 },
                { to: 2, weight: 1 },
            ],
            [
                { to: 1, weight: 1 },
                { to: 3, weight: 1 },
            ],
            [
                { to: 0, weight: 1 },
                { to: 2, weight: 1 },
            ],
        ];
        const result = findEulerianCircuit(graph);
        expect(result).toEqual([0, 3, 2, 1, 0]);
    });
});
