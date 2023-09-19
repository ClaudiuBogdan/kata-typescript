import { AVLTree } from "./index";

describe("AVL Tree", () => {
    let avlTree: AVLTree;

    beforeEach(() => {
        avlTree = new AVLTree();
    });

    test("should start with an empty root", () => {
        expect(avlTree.root).toBeNull();
    });

    test("should insert a key and make it the root", () => {
        avlTree.insert(10);
        expect(avlTree.root?.key).toBe(10);
    });

    test("should delete a key", () => {
        avlTree.insert(10);
        avlTree.delete(10);
        expect(avlTree.root).toBeNull();
    });

    test("should search for a key and return the node", () => {
        avlTree.insert(10);
        const node = avlTree.search(10);
        expect(node?.key).toBe(10);
    });

    test("should return null when searching for a non-existent key", () => {
        const node = avlTree.search(10);
        expect(node).toBeNull();
    });

    test("should maintain balance after multiple insertions", () => {
        avlTree.insert(10);
        avlTree.insert(20);
        avlTree.insert(30);
        // Add more checks to verify the tree is balanced
    });

    test("should maintain balance after multiple deletions", () => {
        avlTree.insert(10);
        avlTree.insert(20);
        avlTree.insert(30);
        avlTree.delete(20);
        // Add more checks to verify the tree is balanced
    });
});
