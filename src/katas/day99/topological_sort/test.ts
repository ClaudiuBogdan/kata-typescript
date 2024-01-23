import { topologicalSort } from "./index";

describe("Topological Sort", () => {
    it("sorts a simple graph correctly", () => {
        const graph = [
            [1], // Node 0 -> Node 1
            [], // Node 1
        ];
        expect(topologicalSort(graph)).toEqual([0, 1]);
    });

    it("sorts a more complex graph correctly", () => {
        const graph = [[1, 2], [3], [3], [4], []];
        expect(topologicalSort(graph)).toEqual([0, 2, 1, 3, 4]);
    });

    it("handles an empty graph", () => {
        const graph: AdjacencyList = [];
        expect(topologicalSort(graph)).toEqual([]);
    });

    it("handles a graph with a single node", () => {
        const graph = [[]];
        expect(topologicalSort(graph)).toEqual([0]);
    });

    it("handles a graph where all nodes have no dependencies", () => {
        const graph = [[], [], []];
        // The order can be any since there are no dependencies
        const result = topologicalSort(graph);
        expect(result).not.toBeNull();
        expect(result!.sort()).toEqual([0, 1, 2].sort());
    });

    it("returns an empty array for a graph with a cycle (negative test)", () => {
        const graph = [
            [1],
            [2],
            [0], // This creates a cycle
        ];
        // Current implementation doesn't detect cycles. This is a placeholder for future improvement.
        // Depending on the implementation, this might need to change.
        expect(topologicalSort(graph)).toEqual(null);
    });
});
