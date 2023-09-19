import { findMaximumFlow } from "./index";

describe("Maximum Flow Algorithm", () => {
    test("should return 0 for an empty graph", () => {
        expect(findMaximumFlow({}, 0, 1)).toBe(0);
    });

    test("should return 0 for a graph with one vertex", () => {
        expect(findMaximumFlow({ 0: {} }, 0, 0)).toBe(0);
    });

    test("should return a valid maximum flow", () => {
        const graph = {
            0: { 1: 10, 2: 5 },
            1: { 2: 15 },
            2: { 3: 10 },
            3: {},
        };
        const result = findMaximumFlow(graph, 0, 3);
        expect(result).toBe(10);
    });

    test("should return 0 for disconnected graphs", () => {
        const graph = {
            0: { 1: 1 },
            1: { 0: 1 },
            2: {},
        };
        expect(findMaximumFlow(graph, 0, 2)).toBe(0);
    });
});
