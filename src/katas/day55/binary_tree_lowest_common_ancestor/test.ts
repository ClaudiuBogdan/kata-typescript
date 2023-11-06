import { TreeNode, lowestCommonAncestor } from "./index";

describe("Lowest Common Ancestor in Binary Tree", () => {
    test("should return null for an empty tree", () => {
        expect(
            lowestCommonAncestor(null, new TreeNode(1), new TreeNode(2)),
        ).toBeNull();
    });

    test("should return the root for LCA of root and another node", () => {
        const root = new TreeNode(1, null, new TreeNode(2));
        expect(lowestCommonAncestor(root, root, root.right!)).toBe(root);
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

    test("should return the LCA node that is not the root", () => {
        // Create a binary tree
        //     3
        //    / \
        //   5   1
        //  / \ / \
        // 6  2 0  8
        //   / \
        //  7   4
        const root = new TreeNode(
            3,
            new TreeNode(
                5,
                new TreeNode(6),
                new TreeNode(2, new TreeNode(7), new TreeNode(4)),
            ),
            new TreeNode(1, new TreeNode(0), new TreeNode(8)),
        );

        // Define two nodes to find the LCA for
        const p = (root.left as TreeNode).left as TreeNode; // Node with value 6
        const q = ((root.left as TreeNode).right as TreeNode).right as TreeNode; // Node with value 4

        // The LCA should be the node with value 5 in this case
        expect(lowestCommonAncestor(root, p, q)).toBe(root.left);
    });
});
