/**
 * Detects if a cycle exists in a directed graph.
 *
 * @param {AdjacencyList} graph - The adjacency list representation of the directed graph.
 * @returns {boolean} - True if a cycle exists, otherwise false.
 *
 * @example
 * const graph = [
 *   [1],
 *   [2],
 *   [0]
 * ];
 * detectCycle(graph);  // returns true
 */
export function detectCycle(graph: AdjacencyList): boolean {
    const colors: NodeColor[] = new Array(graph.length).fill(NodeColor.WHITE);

    for (let i = 0; i < graph.length; i++) {
        if (colors[i] === NodeColor.WHITE && checkHasCycle(i, graph, colors)) {
            return true;
        }
    }
    return false;
}

function checkHasCycle(
    node: number,
    graph: AdjacencyList,
    colors: NodeColor[],
): boolean {
    colors[node] = NodeColor.GRAY;
    for (const neighbor of graph[node]) {
        if (colors[neighbor] === NodeColor.GRAY) {
            return true;
        }

        if (
            colors[neighbor] === NodeColor.WHITE &&
            checkHasCycle(neighbor, graph, colors)
        ) {
            return true;
        }
    }
    colors[node] = NodeColor.BLACK;
    return false;
}

enum NodeColor {
    WHITE,
    GRAY,
    BLACK,
}
