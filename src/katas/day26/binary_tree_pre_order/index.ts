/**
 * @module BTPreOrder
 * @param {BinaryNode<number>} root
 * @returns {number[]}
 * @description Given the root of a binary tree, return the preorder traversal of its nodes' values. The root node is visited before the left and right subtrees.
 * @see https://www.geeksforgeeks.org/preorder-traversal-of-binary-tree/
 */

const BTPreOrder = (root: BinaryNode<number>): number[] => {
    return traversal(root);
};

function traversal(
    root: BinaryNode<number> | null,
    path: number[] = [],
): number[] {
    if (!root) {
        return path;
    }
    path.push(root.value);
    traversal(root.left, path);
    traversal(root.right, path);
    return path;
}

export default BTPreOrder;
