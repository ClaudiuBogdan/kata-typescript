/**
 * @module BTPreOrder
 * @param {BinaryNode<number>} root
 * @returns {number[]}
 * @description Given the root of a binary tree, return the preorder traversal of its nodes' values. The root node is visited before the left and right subtrees.
 * @see https://www.geeksforgeeks.org/preorder-traversal-of-binary-tree/
 */

const BTPreOrder = (root: BinaryNode<number>): number[] => {
    return preOrderTraversal(root);
};

function preOrderTraversal<T>(node: BinaryNode<T>, arr: T[] = []): T[] {
    arr.push(node.value);
    if (node.left) {
        preOrderTraversal(node.left, arr);
    }
    if (node.right) {
        preOrderTraversal(node.right, arr);
    }
    return arr;
}

export default BTPreOrder;
