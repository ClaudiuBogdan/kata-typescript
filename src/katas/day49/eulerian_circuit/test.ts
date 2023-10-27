import { findEulerianCircuit } from "./index";

describe("Eulerian Circuit Algorithm", () => {
    test("should return null for an empty graph", () => {
        expect(findEulerianCircuit({})).toBeNull();
    });

    test("should return a circuit for a graph with one vertex", () => {
        expect(findEulerianCircuit({ 0: [] })).toEqual([0]);
    });

    test("should return a valid Eulerian circuit", () => {
        const graph = {
            0: [1, 2],
            1: [0, 2],
            2: [0, 1],
        };
        const result = findEulerianCircuit(graph);
        expect(result).toEqual([0, 1, 2, 0]);
    });

    test("should return null for graphs without an Eulerian circuit", () => {
        const graph = {
            0: [1],
            1: [0, 2],
            2: [1],
        };
        expect(findEulerianCircuit(graph)).toBeNull();
    });
});
