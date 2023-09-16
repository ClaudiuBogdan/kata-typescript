/**
 * @module BTPostOrder
 * @param {BinaryNode<number>} root
 * @returns {number[]}
 * @description Given the root of a binary tree, return the postorder traversal of its nodes' values. The root node is visited after the left and right subtrees.
 * @see https://www.geeksforgeeks.org/postorder-traversal-of-binary-tree/
 */

const BTPostOrder = (root: BinaryNode<number>): number[] => {
    const path: number[] = [];
    const traverse = (root: BinaryNode<number> | null) => {
        if (!root) {
            return;
        }
        traverse(root.left);
        traverse(root.right);
        path.push(root.value);
    };
    traverse(root);
    return path;
};

export default BTPostOrder;
