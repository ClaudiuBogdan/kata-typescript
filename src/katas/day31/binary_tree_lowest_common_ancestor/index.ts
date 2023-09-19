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
    const isSame = (
        nodeA: TreeNode | null,
        nodeB: TreeNode | null,
    ): boolean => {
        return !!nodeA && !!nodeB && nodeA.val === nodeB.val;
    };
    const search = (
        root: TreeNode | null,
        p: TreeNode,
        q: TreeNode,
    ): {
        hasQ: boolean;
        hasP: boolean;
        hasBoth: boolean;
        root: TreeNode | null;
    } => {
        const res = { hasP: false, hasQ: false, hasBoth: false, root };
        if (!root) {
            return res;
        }
        res.hasQ =
            isSame(root.left, q) || isSame(root.right, q) || isSame(root, q);
        res.hasP =
            isSame(root.left, p) || isSame(root.right, p) || isSame(root, p);
        res.hasBoth = res.hasQ && res.hasP;

        const leftRes = search(root.left, p, q);
        if (leftRes.hasBoth) {
            return leftRes;
        }
        if (leftRes.hasP) {
            res.hasP = true;
        }
        if (leftRes.hasQ) {
            res.hasQ = true;
        }
        const rightRes = search(root.right, p, q);
        if (rightRes.hasBoth) {
            return rightRes;
        }
        if (rightRes.hasP) {
            res.hasP = true;
        }
        if (rightRes.hasQ) {
            res.hasQ = true;
        }
        res.hasBoth = res.hasP && res.hasQ;
        return res;
    };
    const res = search(root, p, q);
    return res.hasBoth ? res.root : null;
}
