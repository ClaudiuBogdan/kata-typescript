import { detectCycle } from "./index";

describe("Cycle Detection Algorithm", () => {
    test("should return false for an empty graph", () => {
        expect(detectCycle({})).toBe(false);
    });

    test("should return false for a graph with one vertex", () => {
        expect(detectCycle({ 0: [] })).toBe(false);
    });

    test("should return true for a graph with a cycle", () => {
        const graph = {
            0: [1],
            1: [2],
            2: [0],
        };
        const result = detectCycle(graph);
        expect(result).toBe(true);
    });

    test("should return false for a graph without a cycle", () => {
        const graph = {
            0: [1],
            1: [2],
            2: [],
        };
        expect(detectCycle(graph)).toBe(false);
    });

    test("should return true for a graph with a self-loop", () => {
        const graph = {
            0: [0],
        };
        expect(detectCycle(graph)).toBe(true);
    });
});
