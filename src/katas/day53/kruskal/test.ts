import { kruskal } from "./index";

describe("Kruskal's Algorithm", () => {
    test("should return an empty array for an empty graph", () => {
        expect(kruskal([], 0)).toEqual([]);
    });

    test("should return an empty array for a graph with one vertex", () => {
        expect(kruskal([], 1)).toEqual([]);
    });

    test("should return the Minimum Spanning Tree for a simple graph", () => {
        const edges = [
            [0, 1, 10],
            [0, 2, 6],
            [0, 3, 5],
            [1, 3, 15],
            [2, 3, 4],
        ];
        const vertices = 4;
        expect(kruskal(edges, vertices)).toEqual([
            [2, 3, 4],
            [0, 3, 5],
            [0, 1, 10],
        ]);
    });

    test("should handle graphs with multiple connected components", () => {
        const edges = [
            [0, 1, 1],
            [1, 2, 2],
            [3, 4, 3],
        ];
        const vertices = 5;
        expect(kruskal(edges, vertices)).toEqual([
            [0, 1, 1],
            [1, 2, 2],
            [3, 4, 3],
        ]);
    });
});
