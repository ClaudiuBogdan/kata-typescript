/**
 * @function BinaryTreeInOrderTraversal
 * @param root {BinaryNode<number>}
 * @returns {number[]}
 * @description Given the root of a binary tree, return the inorder traversal of its nodes' values. The root node is visited between the left and right subtrees.
 * @see https://www.geeksforgeeks.org/inorder-traversal-of-binary-tree/
 *
 */

const in_order_traversal = (root: BinaryNode<number>): number[] => {
    return traversal(root, []);
};

function traversal(root: BinaryNode<number> | null, path: number[]): number[] {
    if (!root) {
        return path;
    }

    traversal(root.left, path);
    path.push(root.value);
    traversal(root.right, path);

    return path;
}


export default in_order_traversal;
