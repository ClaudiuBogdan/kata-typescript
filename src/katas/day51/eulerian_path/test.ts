import { findEulerianPath } from "./index";

describe("Eulerian Path Algorithm", () => {
    test("should return null for an empty graph", () => {
        expect(findEulerianPath({})).toBeNull();
    });

    test("should return a path for a graph with one vertex", () => {
        expect(findEulerianPath({ 0: [] })).toEqual([0]);
    });

    test("should return a valid Eulerian path", () => {
        const graph = {
            0: [1, 2],
            1: [0, 2],
            2: [0, 1, 3],
            3: [2],
        };
        const result = findEulerianPath(graph);
        expect(result).toEqual([0, 1, 2, 3]);
    });

    test("should return null for graphs without an Eulerian path", () => {
        const graph = {
            0: [1],
            1: [0, 2],
            2: [1],
        };
        expect(findEulerianPath(graph)).toBeNull();
    });
});
