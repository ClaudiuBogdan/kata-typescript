import { findMinimumCut } from "./index";

describe("Stoer-Wagner Minimum Cut Algorithm", () => {
    it("should find the correct minimum cut in a simple graph", () => {
        const graph = [
            [
                { to: 1, weight: 2 },
                { to: 3, weight: 3 },
            ],
            [
                { to: 0, weight: 2 },
                { to: 2, weight: 1 },
            ],
            [
                { to: 1, weight: 1 },
                { to: 3, weight: 1 },
            ],
            [
                { to: 0, weight: 3 },
                { to: 2, weight: 1 },
            ],
        ];
        expect(findMinimumCut(graph)).toEqual(2);
    });

    it("should return 0 for a graph with no edges", () => {
        const graph = [[], [], [], []];
        expect(findMinimumCut(graph)).toEqual(0);
    });

    it("should handle disconnected graphs correctly", () => {
        const graph = [[{ to: 1, weight: 1 }], [{ to: 0, weight: 1 }], [], []];
        expect(findMinimumCut(graph)).toEqual(0);
    });

    it("should handle graphs with multiple edges between two nodes", () => {
        const graph = [
            [
                { to: 1, weight: 2 },
                { to: 1, weight: 3 },
            ],
            [
                { to: 0, weight: 2 },
                { to: 0, weight: 3 },
            ],
        ];
        expect(findMinimumCut(graph)).toEqual(5);
    });
    it("should handle graphs with unequal weights correctly", () => {
        const graph = [
            [
                { to: 1, weight: 10 },
                { to: 2, weight: 1 },
            ],
            [
                { to: 0, weight: 10 },
                { to: 2, weight: 10 },
            ],
            [
                { to: 0, weight: 1 },
                { to: 1, weight: 10 },
            ],
        ];
        expect(findMinimumCut(graph)).toEqual(2); // The cut between vertex 0 and 2
    });

    it("should handle graphs with loops correctly", () => {
        const graph = [
            [
                { to: 0, weight: 5 },
                { to: 1, weight: 1 },
            ],
            [
                { to: 1, weight: 5 },
                { to: 0, weight: 1 },
            ],
        ];
        expect(findMinimumCut(graph)).toEqual(2);
    });

    it("should handle graphs with isolated vertices", () => {
        const graph = [
            [{ to: 1, weight: 3 }],
            [{ to: 0, weight: 3 }],
            [], // Isolated vertex
        ];
        expect(findMinimumCut(graph)).toEqual(0);
    });
});
