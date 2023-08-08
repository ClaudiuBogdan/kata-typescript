/**
 * @function BinaryTreeInOrderTraversal
 * @param root {BinaryNode<number>}
 * @returns {number[]}
 * @description Given the root of a binary tree, return the inorder traversal of its nodes' values. The root node is visited between the left and right subtrees.
 * @see https://www.geeksforgeeks.org/inorder-traversal-of-binary-tree/
 *
 */

const BinaryTreeInOrderTraversal = (root: BinaryNode<number>): number[] => {
    return inOrderTraversal(root, []);
};

function inOrderTraversal<T>(node: BinaryNode<T>, arr: T[]): T[] {
    if (node.left) {
        inOrderTraversal(node.left, arr);
    }
    arr.push(node.value);
    if (node.right) {
        inOrderTraversal(node.right, arr);
    }
    return arr;
}

export default BinaryTreeInOrderTraversal;
