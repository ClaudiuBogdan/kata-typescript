/**
 * @function invertTree
 * @description To invert the tree, the left child should become the right child, and the right child should become the left.
 * @param root
 */
export default function invertTree(
    root: BinaryNode<number> | null,
): BinaryNode<number> | null {
    if (root === null) {
        return null;
    }
    const { left, right } = root;
    root.left = invertTree(right);
    root.right = invertTree(left);
    return root;
}
