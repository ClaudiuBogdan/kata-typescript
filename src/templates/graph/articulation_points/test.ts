import { articulationPoints } from "./index";

describe("Articulation Points Algorithm", () => {
    test("should return an empty array for an empty graph", () => {
        expect(articulationPoints([])).toEqual([]);
    });

    test("should return an empty array for a graph with one vertex", () => {
        expect(articulationPoints([[]])).toEqual([]);
    });

    test("should return valid articulation points", () => {
        const graph = [[1, 2], [0, 2], [0, 1, 3], [2]];
        const result = articulationPoints(graph);
        expect(result).toEqual([2]);
    });
});
