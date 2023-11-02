import { findBridges } from "./index";

describe("findBridges", () => {
    it("should find a single bridge in a simple graph", () => {
        const graph = [[1, 2], [0, 2], [0, 1, 3], [2]];
        expect(findBridges(graph)).toEqual([[2, 3]]);
    });

    it("should find multiple bridges in a complex graph", () => {
        const graph = [[1], [0, 2, 3], [1, 3], [1, 2, 4], [3, 5], [4, 6], [5]];
        expect(findBridges(graph)).toEqual([
            [5, 6],
            [4, 5],
            [3, 4],
            [0, 1],
        ]);
    });

    it("should return an empty array if no bridges exist", () => {
        const graph = [
            [1, 2],
            [0, 2],
            [0, 1],
        ];
        expect(findBridges(graph)).toEqual([]);
    });

    it("should handle graphs with isolated vertices", () => {
        const graph = [[1], [0], [], [4], [3]];
        expect(findBridges(graph)).toEqual([
            [0, 1],
            [3, 4],
        ]);
    });

    it("should handle an empty graph", () => {
        const graph: number[][] = [];
        expect(findBridges(graph)).toEqual([]);
    });
});
