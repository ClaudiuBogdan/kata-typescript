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
            root: TreeNode | null,
            parent: TreeNode | null,
        ): TreeNode => {
            if (root === null) {
                return {
                    val,
                    left: null,
                    right: null,
                    parent,
                };
            }
            if (val < root.val) {
                root.left = insert(root.left, root);
            } else {
                root.right = insert(root.right, root);
            }
            return root;
        };
        this.root = insert(this.root, null);
    }

    /**
     * Searches for a value in the BST.
     * @param {number} val - The value to search for.
     * @returns {boolean} True if the value is found, otherwise false.
     */
    search(val: number): boolean {
        const search = (node: TreeNode | null): boolean => {
            if (!node) {
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
            node: TreeNode | null,
            val: number,
        ): TreeNode | null => {
            if (node === null) {
                return null;
            }
            if (node.val === val) {
                if (node.left === null) {
                    return node.right;
                }
                if (node.right === null) {
                    return node.left;
                }
                const minLargeNode = this.getMinNode(node.right);
                node.val = minLargeNode.val;
                node.right = deleteNode(node.right, minLargeNode.val);
            } else if (val < node.val) {
                node.left = deleteNode(node.left, val);
            } else {
                node.right = deleteNode(node.right, val);
            }
            return node;
        };
        this.root = deleteNode(this.root, val);
    }

    private getMinNode(node: TreeNode): TreeNode {
        if (node.left) {
            return node.left;
        }
        return node;
    }
}
