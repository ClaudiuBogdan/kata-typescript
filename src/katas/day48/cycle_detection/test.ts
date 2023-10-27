import { detectCycle } from "./index";

describe("Cycle Detection in Directed Graph", () => {
    test("Empty graph should return false", () => {
        expect(detectCycle([])).toBe(false);
    });

    test("Single node with no edge should return false", () => {
        expect(detectCycle([[]])).toBe(false);
    });

    test("Single node with a self-loop should return true", () => {
        expect(detectCycle([[0]])).toBe(true);
    });

    test("Two nodes with no cycle should return false", () => {
        expect(detectCycle([[1], []])).toBe(false);
    });

    test("Two nodes with a cycle should return true", () => {
        expect(detectCycle([[1], [0]])).toBe(true);
    });

    test("Three nodes with a cycle should return true", () => {
        expect(detectCycle([[1], [2], [0]])).toBe(true);
    });

    test("Three nodes with no cycle should return false", () => {
        expect(detectCycle([[1], [2], []])).toBe(false);
    });

    test("Four nodes with one cycle should return true", () => {
        expect(detectCycle([[1], [2], [3], [1]])).toBe(true);
    });

    test("Four nodes with multiple outgoing edges but no cycle should return false", () => {
        expect(detectCycle([[1, 2], [2, 3], [3], []])).toBe(false);
    });

    test("Five nodes with a cycle should return true", () => {
        expect(detectCycle([[1], [2], [3], [4], [0]])).toBe(true);
    });

    test("Five nodes with no cycle should return false", () => {
        expect(detectCycle([[1], [2], [3], [4], []])).toBe(false);
    });
});
