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
 * Class representing a Binary Search Tree (BST).
 */
export class BST {
    root: TreeNode | null;

    constructor() {
        this.root = null;
    }

    /**
     * Inserts a value into the BST.
     * @param {number} val - The value to insert.
     */
    insert(val: number): void {
        let node = this.root;
        let parent: TreeNode | null = null;

        while (node) {
            parent = node;
            if (val === node.val) {
                return;
            } else if (val < node.val) {
                node = node.left;
            } else {
                node = node.right;
            }
        }

        const newNode: TreeNode = {
            val,
            left: null,
            right: null,
        };

        if (parent === null) {
            this.root = newNode;
        } else if (val < parent.val) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }
    }

    /**
     * Searches for a value in the BST.
     * @param {number} val - The value to search for.
     * @returns {boolean} True if the value is found, otherwise false.
     */
    search(val: number): boolean {
        let node = this.root;
        while (node && node.val !== val) {
            node = val < node.val ? node.left : node.right;
        }
        return !!node;
    }

    /**
     * Deletes a value from the BST.
     * @param {number} val - The value to delete.
     */
    delete(val: number): void {
        let node: TreeNode | null = this.root;
        let parent: TreeNode | null = null;

        while (node && node.val !== val) {
            parent = node;
            node = val < node.val ? node.left : node.right;
        }
        if (!node) {
            return;
        }
        if (node.left && node.right) {
            let successor = node.right;
            let successorParent = node;
            while (successor.left) {
                successorParent = successor;
                successor = successor.left;
            }
            node.val = successor.val;
            node = successor;
            parent = successorParent;
        }

        const child = node.left || node.right;

        if (parent === null) {
            this.root = null;
        } else if (node === parent.left) {
            parent.left = child;
        } else {
            parent.right = child;
        }
    }
}
