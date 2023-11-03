import { hamiltonianPath } from "./index";

describe("hamiltonianPath", () => {
    test("should return null for an empty graph", () => {
        expect(hamiltonianPath([])).toBeNull();
    });

    test("should handle a single vertex", () => {
        expect(hamiltonianPath([[0]])).toEqual([0]);
    });

    test("should return null for a graph without a Hamiltonian path", () => {
        const graph = [
            [0, 1, 0],
            [0, 0, 1],
            [0, 0, 0],
        ];
        expect(hamiltonianPath(graph)).toBeNull();
    });

    test("should find a Hamiltonian path in a complete graph", () => {
        const graph = [
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0],
        ];
        expect(hamiltonianPath(graph)).toEqual([0, 1, 2]);
    });

    test("should find a Hamiltonian path in a more complex graph", () => {
        const graph = [
            [0, 1, 0, 1, 0],
            [1, 0, 1, 1, 0],
            [0, 1, 0, 0, 1],
            [1, 1, 0, 0, 1],
            [0, 1, 1, 1, 0],
        ];
        const result = hamiltonianPath(graph)!;
        // Since there can be multiple Hamiltonian paths, we just verify that the result is valid
        // This is done by checking that each vertex appears once and there is an edge between consecutive vertices
        expect(result).toHaveLength(graph.length);
        expect(new Set(result).size).toBe(graph.length); // Check for uniqueness
        let isValidPath = true;
        for (let i = 0; i < result.length - 1; i++) {
            if (graph[result[i]][result[i + 1]] === 0) {
                isValidPath = false;
                break;
            }
        }
        expect(isValidPath).toBeTruthy();
    });

    test("should find a Hamiltonian path starting from a non-zero vertex", () => {
        const graph = [
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0],
        ];
        const result = hamiltonianPath(graph)!;
        expect(result).not.toBeNull();
        expect(result).toEqual([4, 0, 1, 2, 3]);
        // Verify that the result starts from a non-zero vertex
        expect(result[0]).not.toBe(0);
        // Check for a valid path
        for (let i = 0; i < result.length - 1; i++) {
            expect(graph[result[i]][result[i + 1]]).toBe(1);
        }
    });

    test("should find a Hamiltonian path when graph has multiple paths", () => {
        const graph = [
            [0, 1, 1, 0],
            [1, 0, 1, 1],
            [1, 1, 0, 1],
            [0, 1, 1, 0],
        ];
        const result = hamiltonianPath(graph)!;
        expect(result).not.toBeNull();
        // Verify that the result forms a path where each node is visited exactly once
        const pathSet = new Set(result);
        expect(pathSet.size).toBe(graph.length);
        for (let i = 0; i < result.length - 1; i++) {
            expect(graph[result[i]][result[i + 1]]).toBe(1);
        }
    });

    test("should handle disconnected graphs (no Hamiltonian path)", () => {
        const graph = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        expect(hamiltonianPath(graph)).toBeNull();
    });

    // Additional tests could include directed graphs, larger graphs,
    // graphs with loops, and other special cases.
});
