import { findMaximumFlow } from "./index";

describe("findMaximumFlow", () => {
    test("simple graph with a clear path", () => {
        const graph: WeightedAdjacencyList = [
            [{ to: 1, weight: 10 }],
            [{ to: 2, weight: 5 }],
            [],
        ];
        expect(findMaximumFlow(graph, 0, 2)).toBe(5);
    });

    test("graph with multiple augmenting paths", () => {
        const graph: WeightedAdjacencyList = [
            [
                { to: 1, weight: 10 },
                { to: 2, weight: 10 },
            ],
            [{ to: 3, weight: 10 }],
            [{ to: 3, weight: 10 }],
            [],
        ];
        expect(findMaximumFlow(graph, 0, 3)).toBe(20);
    });

    test("graph with no path from source to sink", () => {
        const graph: WeightedAdjacencyList = [
            [{ to: 1, weight: 10 }],
            [{ to: 2, weight: 5 }],
            [], // No connection to sink
        ];
        expect(findMaximumFlow(graph, 0, 3)).toBe(0);
    });

    test("graph with bottleneck edge", () => {
        const graph: WeightedAdjacencyList = [
            [
                { to: 1, weight: 10 },
                { to: 2, weight: 1 },
            ],
            [
                { to: 2, weight: 10 },
                { to: 3, weight: 1 },
            ],
            [{ to: 3, weight: 10 }],
            [],
        ];
        expect(findMaximumFlow(graph, 0, 3)).toBe(11);
    });

    test("large graph to test performance and correctness", () => {
        const graph: WeightedAdjacencyList = new Array(100)
            .fill(0)
            .map(() => []);
        for (let i = 0; i < 99; i++) {
            graph[i].push({ to: i + 1, weight: 100 });
        }
        expect(findMaximumFlow(graph, 0, 99)).toBe(100);
    });

    test("graph with back edges", () => {
        const graph: WeightedAdjacencyList = [
            [
                { to: 1, weight: 3 },
                { to: 2, weight: 2 },
            ],
            [
                { to: 3, weight: 2 },
                { to: 2, weight: 1 },
            ],
            [
                { to: 1, weight: 1 },
                { to: 3, weight: 4 },
            ],
            [],
        ];
        expect(findMaximumFlow(graph, 0, 3)).toBe(5);
    });

    test("empty graph", () => {
        const graph: WeightedAdjacencyList = [];
        expect(findMaximumFlow(graph, 0, 1)).toBe(0);
    });

    test("graph with one node", () => {
        const graph: WeightedAdjacencyList = [[]];
        expect(findMaximumFlow(graph, 0, 0)).toBe(0);
    });

    test("source and sink are the same node", () => {
        const graph: WeightedAdjacencyList = [
            [{ to: 1, weight: 10 }],
            [{ to: 0, weight: 5 }],
        ];
        expect(findMaximumFlow(graph, 0, 0)).toBe(0);
    });
});
