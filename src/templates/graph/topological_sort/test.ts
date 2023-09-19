import { topologicalSort } from "./index";

describe("Topological Sort Algorithm", () => {
    test("should return an empty array for an empty graph", () => {
        expect(topologicalSort({})).toEqual([]);
    });

    test("should return a single vertex for a graph with one vertex", () => {
        expect(topologicalSort({ 0: [] })).toEqual([0]);
    });

    test("should return a valid topological ordering", () => {
        const graph = {
            0: [1, 2],
            1: [3],
            2: [3],
            3: [4],
            4: [],
        };
        const result = topologicalSort(graph);
        expect(result).toEqual([0, 2, 1, 3, 4]);
    });

    test("should handle disconnected components", () => {
        const graph = {
            0: [],
            1: [],
            2: [3],
            3: [],
        };
        const result = topologicalSort(graph);
        expect(result).toEqual(expect.arrayContaining([0, 1, 2, 3]));
    });

    test("should throw an error for cyclic graphs", () => {
        const graph = {
            0: [1],
            1: [0],
        };
        expect(() => topologicalSort(graph)).toThrow("Graph contains a cycle");
    });
});
