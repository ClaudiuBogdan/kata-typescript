/**
 * @function bfs - Breadth First search on a Matrix Graph
 * @description An adjacency matrix is a way of representing a graph as a matrix of booleans (0's and 1's). A finite graph can be represented in the form of a square matrix on a computer, where the boolean value of the matrix indicates if there is a direct path between two vertices.
 * @link https://www.programiz.com/dsa/graph-bfs
 * @param graph
 * @param source
 * @param target
 */
export default function breadthFirstSearch(
    graph: WeightedAdjacencyMatrix,
    source: number,
    target: number,
): number[] | null {
    const queue: number[] = new Array();
    const prev: number[] = new Array(graph.length).fill(-1);
    const seen: boolean[] = new Array(graph.length).fill(false);
    queue.push(source);

    const getPath = (target: number): number[] => {
        const path: number[] = [];
        let node = target;
        for (let i = 0; i <= prev.length; i++) {
            if (node === -1) {
                return path.reverse();
            }
            path.push(node);
            node = prev[node];
        }
        throw new Error("Invalid prev array.");
    };

    while (queue.length > 0) {
        const node = queue.shift() as number;
        seen[node] = true;
        if (node === target) {
            return getPath(node);
        }
        for (let nextNode = 0; nextNode < graph.length; nextNode++) {
            if (!graph[node][nextNode] || seen[nextNode]) {
                continue;
            }
            prev[nextNode] = node;
            queue.push(nextNode);
        }
    }
    return null;
}
