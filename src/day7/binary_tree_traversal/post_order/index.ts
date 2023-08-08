/**
 * @module BTPostOrder
 * @param {BinaryNode<number>} root
 * @returns {number[]}
 * @description Given the root of a binary tree, return the postorder traversal of its nodes' values. The root node is visited after the left and right subtrees.
 * @see https://www.geeksforgeeks.org/postorder-traversal-of-binary-tree/
 */

const BTPostOrder = (root: BinaryNode<number>): number[] => {
    return postOrderTraversal(root, []);
};

function postOrderTraversal<T>(node: BinaryNode<T>, arr: T[]): T[] {
    if (node.left) {
        postOrderTraversal(node.left, arr);
    }
    if (node.right) {
        postOrderTraversal(node.right, arr);
    }
    arr.push(node.value);

    return arr;
}

export default BTPostOrder;
