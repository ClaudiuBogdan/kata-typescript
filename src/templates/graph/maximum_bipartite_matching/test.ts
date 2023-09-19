import { findMaximumBipartiteMatching } from "./index";

describe("Maximum Bipartite Matching Algorithm", () => {
    test("should return 0 for an empty graph", () => {
        expect(findMaximumBipartiteMatching({ U: {}, V: {} })).toBe(0);
    });

    test("should return 0 for a graph with one vertex set empty", () => {
        expect(findMaximumBipartiteMatching({ U: { 0: [] }, V: {} })).toBe(0);
    });

    test("should return a valid maximum bipartite matching", () => {
        const graph = {
            U: { 0: [1, 2], 1: [2] },
            V: { 1: [0], 2: [0, 1] },
        };
        const result = findMaximumBipartiteMatching(graph);
        expect(result).toBe(2);
    });

    test("should return 0 for disconnected graphs", () => {
        const graph = {
            U: { 0: [] },
            V: { 1: [] },
        };
        expect(findMaximumBipartiteMatching(graph)).toBe(0);
    });
});
