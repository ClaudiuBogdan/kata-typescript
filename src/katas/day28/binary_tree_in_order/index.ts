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
    const travers = (root: BinaryNode<number> | null) => {
        if (!root) {
            return;
        }
        travers(root.left);
        path.push(root.value);
        travers(root.right);
    };
    travers(root)
    return path
};

export default in_order_traversal;
