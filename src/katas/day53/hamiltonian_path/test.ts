import { hamiltonianPath } from "./index";

describe("Hamiltonian Path Algorithm", () => {
    test("should return null for an empty graph", () => {
        expect(hamiltonianPath([])).toBeNull();
    });

    test("should return a path for a graph with one vertex", () => {
        expect(hamiltonianPath([[0]])).toEqual([0]);
    });

    test("should return a valid Hamiltonian path", () => {
        const graph = [
            [0, 1, 0, 1],
            [1, 0, 1, 0],
            [0, 1, 0, 1],
            [1, 0, 1, 0],
        ];
        const result = hamiltonianPath(graph);
        expect(result).toEqual([0, 1, 2, 3]);
    });

    test("should return null for graphs without a Hamiltonian path", () => {
        const graph = [
            [0, 1, 0],
            [1, 0, 0],
            [0, 0, 0],
        ];
        expect(hamiltonianPath(graph)).toBeNull();
    });
});
