import { RedBlackTree } from "./index";

describe("Red-Black Tree", () => {
    let rbTree: RedBlackTree;

    beforeEach(() => {
        rbTree = new RedBlackTree();
    });

    test("should start with an empty root", () => {
        expect(rbTree.root).toBeNull();
    });

    test("should insert a key and make it the root", () => {
        rbTree.insert(10);
        expect(rbTree.root?.key).toBe(10);
    });

    test("should delete a key", () => {
        rbTree.insert(10);
        rbTree.delete(10);
        expect(rbTree.root).toBeNull();
    });

    test("should search for a key and return the node", () => {
        rbTree.insert(10);
        const node = rbTree.search(10);
        expect(node?.key).toBe(10);
    });

    test("should return null when searching for a non-existent key", () => {
        const node = rbTree.search(10);
        expect(node).toBeNull();
    });

    test("should maintain balance after multiple insertions", () => {
        rbTree.insert(10);
        rbTree.insert(20);
        rbTree.insert(30);
        // Add more checks to verify the tree is balanced
    });

    test("should maintain balance after multiple deletions", () => {
        rbTree.insert(10);
        rbTree.insert(20);
        rbTree.insert(30);
        rbTree.delete(20);
        // Add more checks to verify the tree is balanced
    });
});
