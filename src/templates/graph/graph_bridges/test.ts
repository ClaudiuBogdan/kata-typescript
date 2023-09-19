import { findBridges } from "./index";

describe("Bridges Algorithm", () => {
    test("should return an empty array for an empty graph", () => {
        expect(findBridges({})).toEqual([]);
    });

    test("should return an empty array for a graph with one vertex", () => {
        expect(findBridges({ 0: [] })).toEqual([]);
    });

    test("should return valid bridges", () => {
        const graph = {
            0: [1, 2],
            1: [0, 2],
            2: [0, 1, 3],
            3: [2],
        };
        const result = findBridges(graph);
        expect(result).toEqual([[2, 3]]);
    });

    test("should return an empty array for graphs without bridges", () => {
        const graph = {
            0: [1],
            1: [0, 2],
            2: [1],
        };
        expect(findBridges(graph)).toEqual([]);
    });
});
