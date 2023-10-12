import { findHamiltonianCycle } from "./index";

describe("Hamiltonian Cycle Algorithm", () => {
    test("should return null for an empty graph", () => {
        expect(findHamiltonianCycle([])).toBeNull();
    });

    test("should return a cycle for a graph with one vertex", () => {
        expect(findHamiltonianCycle([[0]])).toEqual([0, 0]);
    });

    test("should return a valid Hamiltonian cycle", () => {
        const graph = [
            [0, 1, 0, 1, 0],
            [1, 0, 1, 1, 1],
            [0, 1, 0, 0, 1],
            [1, 1, 0, 0, 1],
            [0, 1, 1, 1, 0],
        ];
        const result = findHamiltonianCycle(graph);
        expect(result).toEqual([0, 1, 2, 4, 3, 0]);
    });

    test("should return null for graphs without a Hamiltonian cycle", () => {
        const graph = [
            [0, 1, 0],
            [1, 0, 0],
            [0, 0, 0],
        ];
        expect(findHamiltonianCycle(graph)).toBeNull();
    });
});
