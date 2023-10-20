import { bellmanFord } from "./index";

describe("Bellman-Ford Algorithm", () => {
    test("should return null for an empty graph", () => {
        expect(bellmanFord([], 0, 0)).toBeNull();
    });

    test("should return an array with a single zero for a graph with one vertex", () => {
        expect(bellmanFord([], 1, 0)).toEqual([0]);
    });

    test("should return the shortest path lengths for a simple graph", () => {
        const edges = [
            [0, 1, -1],
            [0, 2, 4],
            [1, 2, 3],
            [1, 3, 2],
            [1, 4, 2],
            [3, 2, 5],
            [3, 1, 1],
            [4, 3, -3],
        ];
        const vertices = 5;
        const source = 0;
        expect(bellmanFord(edges, vertices, source)).toEqual([-1, 2, -2, 1, 8]);
    });

    test("should return null for graphs with negative weight cycles", () => {
        const edges = [
            [0, 1, 1],
            [1, 2, 2],
            [2, 3, 3],
            [3, 1, -7],
        ];
        const vertices = 4;
        const source = 0;
        expect(bellmanFord(edges, vertices, source)).toBeNull();
    });
});
