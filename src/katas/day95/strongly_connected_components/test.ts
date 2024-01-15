import { findStronglyConnectedComponents } from "./index";

describe("Strongly Connected Components Algorithm", () => {
    test("should return an empty array for an empty graph", () => {
        expect(findStronglyConnectedComponents({})).toEqual([]);
    });

    test("should return an array with a single component for a graph with one vertex", () => {
        expect(findStronglyConnectedComponents({ 0: [] })).toEqual([[0]]);
    });

    test("should return valid strongly connected components", () => {
        const graph = {
            0: [1],
            1: [2],
            2: [0, 3],
            3: [4],
            4: [],
        };
        const result = findStronglyConnectedComponents(graph);
        expect(result).toEqual([[0, 1, 2], [3], [4]]);
    });

    test("should return an array with single-vertex components for graphs without strongly connected components", () => {
        const graph = {
            0: [1],
            1: [],
            2: [],
        };
        expect(findStronglyConnectedComponents(graph)).toEqual([[0], [1], [2]]);
    });
});
