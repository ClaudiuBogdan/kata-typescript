import { articulationPoints } from "./index";

describe("Articulation Points Algorithm", () => {
    test("should return an empty array for an empty graph", () => {
        expect(articulationPoints({})).toEqual([]);
    });

    test("should return an empty array for a graph with one vertex", () => {
        expect(articulationPoints({ 0: [] })).toEqual([]);
    });

    test("should return valid articulation points", () => {
        const graph = {
            0: [1, 2],
            1: [0, 2],
            2: [0, 1, 3],
            3: [2],
        };
        const result = articulationPoints(graph);
        expect(result).toEqual([2]);
    });

    test("should return an empty array for graphs without articulation points", () => {
        const graph = {
            0: [1],
            1: [0, 2],
            2: [1],
        };
        expect(articulationPoints(graph)).toEqual([]);
    });
});
