import { BST } from "./index";

describe("Binary Search Tree Operations", () => {
    let bst: BST;

    beforeEach(() => {
        bst = new BST();
    });

    test("should initialize an empty BST", () => {
        expect(bst.root).toBeNull();
    });

    test("should insert a value into the BST", () => {
        bst.insert(5);
        expect(bst.root?.val).toBe(5);
    });

    test("should search for a value in the BST", () => {
        bst.insert(5);
        expect(bst.search(5)).toBe(true);
        expect(bst.search(10)).toBe(false);
    });

    test("should delete a value from the BST", () => {
        bst.insert(5);
        bst.delete(5);
        expect(bst.root).toBeNull();
    });

    test("should handle complex insert, search, and delete operations", () => {
        bst.insert(5);
        bst.insert(3);
        bst.insert(7);
        expect(bst.search(3)).toBe(true);
        expect(bst.search(7)).toBe(true);
        expect(bst.search(10)).toBe(false);
        bst.delete(3);
        expect(bst.search(3)).toBe(false);
    });

    test("should delete the root", () => {
        bst.insert(5);
        bst.insert(3);
        bst.insert(7);
        bst.delete(5);
        expect(bst.search(3)).toBe(true);
        expect(bst.search(7)).toBe(true);
        expect(bst.search(5)).toBe(false);
    });
});
