import { floydWarshall } from "./index";

describe("Floyd-Warshall Algorithm", () => {
    test("should return an empty array for an empty graph", () => {
        expect(floydWarshall([])).toEqual([]);
    });

    test("should return a 2D array with zeros for a graph with one vertex", () => {
        expect(floydWarshall([[0]])).toEqual([[0]]);
    });

    test("should return the shortest path lengths for a simple graph", () => {
        const graph = [
            [0, 5, Infinity, 10],
            [Infinity, 0, 3, Infinity],
            [Infinity, Infinity, 0, 1],
            [Infinity, Infinity, Infinity, 0],
        ];
        expect(floydWarshall(graph)).toEqual([
            [0, 5, 8, 9],
            [Infinity, 0, 3, 4],
            [Infinity, Infinity, 0, 1],
            [Infinity, Infinity, Infinity, 0],
        ]);
    });

    test("should handle graphs with negative edge weights", () => {
        const graph = [
            [0, -1, 4, Infinity],
            [Infinity, 0, 3, 2],
            [Infinity, Infinity, 0, Infinity],
            [Infinity, 1, 5, 0],
        ];
        expect(floydWarshall(graph)).toEqual([
            [0, -1, 2, -2],
            [Infinity, 0, 3, 2],
            [Infinity, Infinity, 0, Infinity],
            [Infinity, 1, 4, 0],
        ]);
    });
});
