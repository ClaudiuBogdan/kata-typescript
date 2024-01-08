/**
 * Definition for a binary tree node.
 */
export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

/**
 * Finds the lowest common ancestor of two nodes in a binary tree.
 *
 * @param {TreeNode | null} root - The root node of the binary tree.
 * @param {TreeNode} p - The first node.
 * @param {TreeNode} q - The second node.
 * @returns {TreeNode | null} The lowest common ancestor node, or null if not found.
 *
 * @example
 * const root = new TreeNode(3, new TreeNode(5), new TreeNode(1));
 * const p = root.left;
 * const q = root.right;
 * lowestCommonAncestor(root, p, q);  // returns root
 */
export function lowestCommonAncestor(
    root: TreeNode | null,
    p: TreeNode,
    q: TreeNode,
): TreeNode | null {
    if (root === null) {
        return null;
    }

    if (root === p || root === q) {
        return root;
    }
    const leftAncestor = lowestCommonAncestor(root.left, p, q);
    const rightAncestor = lowestCommonAncestor(root.right, p, q);

    if (leftAncestor !== null && rightAncestor !== null) {
        return root;
    }

    return leftAncestor ? leftAncestor : rightAncestor;
}
