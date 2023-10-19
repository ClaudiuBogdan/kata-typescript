// Import your function
import { findAStarPath } from "./index"; // Adjust the import based on your actual file structure

describe("A* Algorithm", () => {
    let graph: WeightedAdjacencyList;

    beforeEach(() => {
        // Define a sample graph
        graph = [
            [
                { to: 1, weight: 1 },
                { to: 2, weight: 4 },
            ], // neighbors for node 0
            [
                { to: 2, weight: 2 },
                { to: 3, weight: 5 },
            ], // neighbors for node 1
            [{ to: 3, weight: 3 }], // neighbors for node 2
            [], // neighbors for node 3
        ];
    });

    test("should return the shortest path", () => {
        const path = findAStarPath(graph, 0, 3);
        expect(path).toEqual([0, 1, 3]);
    });

    test("should return an empty path if no path exists", () => {
        const disconnectedGraph: WeightedAdjacencyList = [
            [{ to: 1, weight: 1 }],
            [],
            [{ to: 3, weight: 1 }],
            [],
        ];
        const path = findAStarPath(disconnectedGraph, 0, 3);
        expect(path).toEqual([]);
    });

    test("should return a path containing only the source node if source equals target", () => {
        const path = findAStarPath(graph, 0, 0);
        expect(path).toEqual([0]);
    });

    test("should return an empty path for an empty graph", () => {
        const emptyGraph: WeightedAdjacencyList = [];
        const path = findAStarPath(emptyGraph, 0, 3);
        expect(path).toEqual([]);
    });

    test("should return the shortest path even when multiple paths exist", () => {
        const multiPathGraph: WeightedAdjacencyList = [
            [
                { to: 1, weight: 1 },
                { to: 3, weight: 10 },
            ],
            [{ to: 2, weight: 1 }],
            [{ to: 3, weight: 1 }],
            [],
        ];
        const path = findAStarPath(multiPathGraph, 0, 3);
        expect(path).toEqual([0, 1, 2, 3]);
    });
});
