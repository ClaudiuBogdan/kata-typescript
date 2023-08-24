/**
 * @function invertTree
 * @description To invert the tree, the left child should become the right child, and the right child should become the left.
 * @param root
 */
export default function invertTree(
    root: BinaryNode<number> | null,
): BinaryNode<number> | null {
    if (!root) {
        return null;
    }
    
    const tempLeft = root.left;
    root.left = root.right;
    root.right = tempLeft;

    invertTree(root.left);
    invertTree(root.right);
    return root;
}
