import { kruskal } from "./index";

describe("Kruskal’s Algorithm", () => {
    test("simple graph with clear MST", () => {
        const graph = [
            [
                { to: 1, weight: 10 },
                { to: 2, weight: 6 },
                { to: 3, weight: 5 },
            ],
            [
                { to: 0, weight: 10 },
                { to: 3, weight: 15 },
            ],
            [
                { to: 0, weight: 6 },
                { to: 3, weight: 4 },
            ],
            [
                { to: 0, weight: 5 },
                { to: 1, weight: 15 },
                { to: 2, weight: 4 },
            ],
        ];
        const result = kruskal(graph);
        expect(result).toEqual([
            [2, 3],
            [0, 3],
            [0, 1],
        ]);
    });

    test("graph with multiple edges having the same weight", () => {
        const graph = [
            [
                { to: 1, weight: 1 },
                { to: 2, weight: 2 },
            ],
            [
                { to: 0, weight: 1 },
                { to: 2, weight: 2 },
            ],
            [
                { to: 0, weight: 2 },
                { to: 1, weight: 2 },
            ],
        ];
        const result = kruskal(graph);
        expect(result).toEqual([
            [0, 1],
            [0, 2],
        ]);
    });

    test("graph with one vertex", () => {
        const graph = [[]];
        const result = kruskal(graph);
        expect(result).toEqual([]);
    });

    test("graph with no edges", () => {
        const graph = [[], []];
        const result = kruskal(graph);
        expect(result).toEqual([]);
    });

    test("disconnected graph", () => {
        const graph = [
            [{ to: 1, weight: 1 }],
            [{ to: 0, weight: 1 }],
            [], // Disconnected vertex
        ];
        const result = kruskal(graph);
        // This result is indicative, as Kruskal's algorithm should not be used on a disconnected graph.
        // Depending on the implementation, you might want to check for connectivity first or handle this case differently.
        expect(result).toEqual([[0, 1]]);
    });

    test("complex graph where MST includes all vertices", () => {
        const graph = [
            [
                { to: 1, weight: 7 },
                { to: 3, weight: 5 },
            ],
            [
                { to: 0, weight: 7 },
                { to: 2, weight: 8 },
                { to: 3, weight: 9 },
                { to: 4, weight: 7 },
            ],
            [
                { to: 1, weight: 8 },
                { to: 4, weight: 5 },
            ],
            [
                { to: 0, weight: 5 },
                { to: 1, weight: 9 },
                { to: 4, weight: 15 },
                { to: 5, weight: 6 },
            ],
            [
                { to: 1, weight: 7 },
                { to: 2, weight: 5 },
                { to: 3, weight: 15 },
                { to: 5, weight: 8 },
                { to: 6, weight: 9 },
            ],
            [
                { to: 3, weight: 6 },
                { to: 4, weight: 8 },
                { to: 6, weight: 11 },
            ],
            [
                { to: 4, weight: 9 },
                { to: 5, weight: 11 },
            ],
        ];
        const result = kruskal(graph);
        expect(result).toHaveLength(6); // MST for a graph with 7 vertices should have 6 edges.
        expect(result).toEqual(
            expect.arrayContaining([
                [0, 3],
                [2, 4],
                [3, 5],
                [0, 1],
                [1, 4],
                [4, 6], // Expected MST edges
            ]),
        );
    });
});
