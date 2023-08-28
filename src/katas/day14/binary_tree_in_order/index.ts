/**
 * @function BinaryTreeInOrderTraversal
 * @param root {BinaryNode<number>}
 * @returns {number[]}
 * @description Given the root of a binary tree, return the inorder traversal of its nodes' values. The root node is visited between the left and right subtrees.
 * @see https://www.geeksforgeeks.org/inorder-traversal-of-binary-tree/
 *
 */

const in_order_traversal = (root: BinaryNode<number>): number[] => {
    const path: number[] = [];
    const recursive = (root: BinaryNode<number> | null): number[] => {
        if (!root) {
            return path;
        }
        if (root.left) {
            recursive(root.left);
        }
        path.push(root.value);
        if (root.right) {
            recursive(root.right);
        }

        return path;
    };
    return recursive(root);
};

export default in_order_traversal;
