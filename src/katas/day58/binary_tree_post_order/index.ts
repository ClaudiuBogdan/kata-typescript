/**
 * @module BTPostOrder
 * @param {BinaryNode<number>} root
 * @returns {number[]}
 * @description Given the root of a binary tree, return the postorder traversal of its nodes' values. The root node is visited after the left and right subtrees.
 * @see https://www.geeksforgeeks.org/postorder-traversal-of-binary-tree/
 */

const BTPostOrder = (root: BinaryNode<number>): number[] => {
    return traversal(root, []);
};

function traversal(root: BinaryNode<number> | null, path: number[]): number[] {
    if (!root) {
        return path;
    }

    traversal(root.left, path);
    traversal(root.right, path);
    path.push(root.value);

    return path;
}

export default BTPostOrder;
