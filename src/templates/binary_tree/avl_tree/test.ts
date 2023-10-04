import { AVLTree, AVLNode } from "./index";

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
       checkTree(avlTree.root)
    });

    test("should maintain balance after multiple deletions", () => {
        avlTree.insert(10);
        avlTree.insert(20);
        avlTree.insert(30);
        avlTree.delete(20);
        expect(avlTree.search(20)).toBeNull()
       checkTree(avlTree.root)
    });

    test("should maintain balance after complex sequence of insertions and deletions", () => {
        // Insert sequence: 10, 20, 30, 25, 15, 5, 1, 40, 35
        avlTree.insert(10);
        avlTree.insert(20);
        avlTree.insert(30);
       checkTree(avlTree.root)

        avlTree.insert(25);
        avlTree.insert(15);
        avlTree.insert(5);
       checkTree(avlTree.root)

        avlTree.insert(1);
        avlTree.insert(40);
        avlTree.insert(35);
       checkTree(avlTree.root)

        // Delete sequence: 40, 1, 25
        avlTree.delete(40);
       checkTree(avlTree.root)
        avlTree.delete(1);
        expect(avlTree.search(1)).toBeNull()
       checkTree(avlTree.root)

        avlTree.delete(25);
        expect(avlTree.search(25)).toBeNull()
       checkTree(avlTree.root)
    });
});

function checkTree(root: AVLNode | null): void {
    expect(isBalanced(root)).toBe(true);
    expect(isBinarySearchTree(root)).toBe(true);
}

function isBalanced(root: AVLNode | null): boolean {
    if (root === null) {
        return true;
    }
    const leftHight = getHeight(root.left);
    const rightHeight = getHeight(root.right);
    const diffHeight = Math.abs(leftHight - rightHeight);
    return diffHeight <= 1;
}

function isBinarySearchTree(root: AVLNode | null): boolean {
    if (root === null) {
        return true;
    }
    if (root.left === null && root.right === null) {
        return true;
    }
    if (root.left && root.left.key > root.key) {
        return false;
    }
    if (root.right && root.right.key < root.key) {
        return false;
    }
    return isBinarySearchTree(root.left) && isBinarySearchTree(root.right);
}

function getHeight(root: AVLNode | null): number {
    if (root === null) {
        return 0;
    }
    return Math.max(getHeight(root.left), getHeight(root.right)) + 1;
}
