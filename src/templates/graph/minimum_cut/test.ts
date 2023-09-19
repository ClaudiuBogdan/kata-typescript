import { findMinimumCut } from "./index";

describe("Minimum Cut Algorithm", () => {
    test("should return an empty array for an empty graph", () => {
        expect(findMinimumCut({})).toEqual([]);
    });

    test("should return an empty array for a graph with one vertex", () => {
        expect(findMinimumCut({ 0: {} })).toEqual([]);
    });

    test("should return a valid minimum cut", () => {
        const graph = {
            0: { 1: 1, 2: 1 },
            1: { 0: 1, 2: 1 },
            2: { 0: 1, 1: 1 },
        };
        const result = findMinimumCut(graph);
        expect(result).toEqual([
            [0, 1, 1],
            [0, 2, 1],
        ]);
    });

    test("should return an empty array for disconnected graphs", () => {
        const graph = {
            0: { 1: 1 },
            1: { 0: 1 },
            2: {},
        };
        expect(findMinimumCut(graph)).toEqual([]);
    });
});
