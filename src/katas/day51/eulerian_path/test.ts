import { findEulerianPath } from "./index";

describe("findEulerianPath", () => {
    test("should find an Eulerian path", () => {
        const graph = [[1, 2], [0, 2], [0, 1, 3], [2]];
        const result = findEulerianPath(graph);
        expect(result).toEqual([3, 2, 1, 0, 2]);
    });

    test("should find an Eulerian cycle", () => {
        const graph = [
            [1, 2],
            [0, 2],
            [0, 1],
        ];
        const result = findEulerianPath(graph);
        expect(result).toEqual([0, 2, 1, 0]);
    });

    test("should return null for graph with no Eulerian path or cycle", () => {
        const graph = [[1, 2], [0, 2, 3], [0, 1, 3], [1, 2, 4], [3]];
        const result = findEulerianPath(graph);
        expect(result).toBeNull();
    });

    test("should return null for disconnected graph", () => {
        const graph = [[1], [0], [3], [2]];
        const result = findEulerianPath(graph);
        expect(result).toBeNull();
    });

    test("should return empty array for empty graph", () => {
        const graph: number[][] = [];
        const result = findEulerianPath(graph);
        expect(result).toEqual([]);
    });

    test("should return single vertex for graph with one vertex", () => {
        const graph = [[]];
        const result = findEulerianPath(graph);
        expect(result).toEqual([0]);
    });
});
