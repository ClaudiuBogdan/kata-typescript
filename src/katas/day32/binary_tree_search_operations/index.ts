/**
 * Definition for a binary tree node.
 */
export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    parent: TreeNode | null;
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
        const insert = (
            node: TreeNode | null,
            val: number,
            parent: TreeNode | null,
        ): TreeNode => {
            if (node === null) {
                return {
                    val,
                    left: null,
                    right: null,
                    parent,
                };
            }
            if (node.val === val) {
                return node;
            }
            if (val < node.val) {
                node.left = insert(node.left, val, node);
            } else {
                node.right = insert(node.right, val, node);
            }
            return node;
        };
        this.root = insert(this.root, val, null);
    }

    /**
     * Searches for a value in the BST.
     * @param {number} val - The value to search for.
     * @returns {boolean} True if the value is found, otherwise false.
     */
    search(val: number): boolean {
        const search = (node: TreeNode | null): boolean => {
            if (node === null) {
                return false;
            }
            if (node.val === val) {
                return true;
            }
            if (val < node.val) {
                return search(node.left);
            } else {
                return search(node.right);
            }
        };
        return search(this.root);
    }

    /**
     * Deletes a value from the BST.
     * @param {number} val - The value to delete.
     */
    delete(val: number): void {
        const deleteNode = (
            root: TreeNode | null,
            val: number,
        ): TreeNode | null => {
            if (!root) {
                return null;
            }
            if (val < root.val) {
                root.left = deleteNode(root.left, val);
                return root;
            }
            if (val > root.val) {
                root.right = deleteNode(root.right, val);
                return root;
            }
            const minNode = this.findMinNode(root);
            if (minNode === root) {
                return null;
            }
            root.val = minNode.val;
            if (root.left) {
                root.left = deleteNode(root.left, minNode.val);
            } else {
                root.right = deleteNode(root.right, minNode.val);
            }
            return root;
        };
        this.root = deleteNode(this.root, val);
    }

    private findMinNode(root: TreeNode): TreeNode {
        if (root.left) {
            return this.findMinNode(root.left);
        } else if (root.right) {
            return this.findMinNode(root.right);
        } else {
            return root;
        }
    }
}
