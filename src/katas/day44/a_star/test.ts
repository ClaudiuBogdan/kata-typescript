import { findAStarPath } from "./index";

describe("A* Algorithm", () => {
    test("should return an empty array for an empty graph", () => {
        expect(findAStarPath({}, 0, 1)).toEqual([]);
    });

    test("should return an empty array for a graph with one vertex", () => {
        expect(findAStarPath({ 0: {} }, 0, 0)).toEqual([]);
    });

    test("should return a valid shortest path", () => {
        const graph = {
            0: { 1: 1, 2: 4 },
            1: { 2: 2, 3: 5 },
            2: { 3: 1 },
            3: {},
        };
        const result = findAStarPath(graph, 0, 3);
        expect(result).toEqual([0, 1, 2, 3]);
    });

    test("should return an empty array for disconnected graphs", () => {
        const graph = {
            0: { 1: 1 },
            1: { 0: 1 },
            2: {},
        };
        expect(findAStarPath(graph, 0, 2)).toEqual([]);
    });
});
