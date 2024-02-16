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
    target: number,
): boolean {
    return search(head, target);
}

function search(root: BinaryNode<number> | null, target: number): boolean {
    if (root === null) {
        return false;
    }

    if (root.value === target) {
        return true;
    }

    return search(root.left, target) || search(root.right, target);
}