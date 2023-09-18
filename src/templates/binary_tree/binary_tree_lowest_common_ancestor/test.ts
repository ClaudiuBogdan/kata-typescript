import { TreeNode, lowestCommonAncestor } from "./index";

describe("Lowest Common Ancestor in Binary Tree", () => {
    test("should return null for an empty tree", () => {
        expect(
            lowestCommonAncestor(null, new TreeNode(1), new TreeNode(2)),
        ).toBeNull();
    });

    test("should return the root for LCA of root and another node", () => {
        const root = new TreeNode(1);
        expect(lowestCommonAncestor(root, root, new TreeNode(2))).toBe(root);
    });

    test("should return the LCA node for two nodes in the tree", () => {
        const root = new TreeNode(3, new TreeNode(5), new TreeNode(1));
        const p = root.left as TreeNode;
        const q = root.right as TreeNode;
        expect(lowestCommonAncestor(root, p, q)).toBe(root);
    });

    test("should return null if one or both nodes are not in the tree", () => {
        const root = new TreeNode(1);
        const p = new TreeNode(2);
        const q = new TreeNode(3);
        expect(lowestCommonAncestor(root, p, q)).toBeNull();
    });
});
