/**
 * @module BTPostOrder
 * @param {BinaryNode<number>} root
 * @returns {number[]}
 * @description Given the root of a binary tree, return the postorder traversal of its nodes' values. The root node is visited after the left and right subtrees.
 * @see https://www.geeksforgeeks.org/postorder-traversal-of-binary-tree/
 */

const BTPostOrder = (root: BinaryNode<number>): number[] => {
    const path: number[] = [];
    const dfs = (root: BinaryNode<number> | null): number[] => {
        if (!root) {
            return path;
        }
        dfs(root.left);
        dfs(root.right);
        path.push(root.value);
        return path;
    };
    return dfs(root);
};

export default BTPostOrder;
