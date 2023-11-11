/**
 * Finds the lowest common ancestor of two nodes in a binary tree.
 *
 * @param {TreeNode | null} root - The root node of the binary tree.
 * @param {TreeNode} p - The first node.
 * @param {TreeNode} q - The second node.
 * @returns {TreeNode | null} The lowest common ancestor node, or null if not found.
 */
export function lowestCommonAncestor(
    root: TreeNode | null,
    p: TreeNode,
    q: TreeNode,
): TreeNode | null {
    if (root === null || root.val === p.val || root.val === q.val) {
        return root;
    }

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left !== null && right !== null) {
        return root;
    }

    return left === null ? right : left;
}

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
