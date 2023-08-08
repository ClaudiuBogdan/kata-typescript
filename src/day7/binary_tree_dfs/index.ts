/**
 * @function depthFirstSearch - Depth First Search
 * @description Given a binary tree and a target value, return true if the target is found in the binary tree.
 * @description Depth First Search technique is defined as a method to traverse a Tree such that the parent node is traversed before any of its children.
 * @link https://www.geeksforgeeks.org/dfs-traversal-of-a-tree-using-recursion/
 * @param head
 * @param targe
 */
export default function depthFirstSearch(
    head: BinaryNode<number>,
    targe: number,
): boolean {
    return dfs(head, targe);
}

function dfs<T>(node: BinaryNode<T> | null, target: T): boolean {
    if (!node) {
        return false;
    }

    if (node.value === target) {
        return true;
    }
    return dfs(node.left, target) || dfs(node.right, target);
}
