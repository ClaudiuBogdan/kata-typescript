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
        this.root = this._insert(this.root, val);
    }

    private _insert(node: TreeNode | null, val: number): TreeNode {
        if (node === null) {
            return new TreeNode(val);
        }

        if (val <= node.val) {
            node.left = this._insert(node.left, val);
        } else if (val > node.val) {
            node.right = this._insert(node.right, val);
        }

        return node;
    }

    /**
     * Searches for a value in the BST.
     * @param {number} val - The value to search for.
     * @returns {boolean} True if the value is found, otherwise false.
     */
    search(val: number): boolean {
        return this._search(this.root, val);
    }

    private _search(node: TreeNode | null, val: number): boolean {
        if (node === null) {
            return false;
        }

        if (val === node.val) {
            return true;
        } else if (val < node.val) {
            return this._search(node.left, val);
        } else {
            return this._search(node.right, val);
        }
    }

    /**
     * Deletes a value from the BST.
     * @param {number} val - The value to delete.
     */
    delete(val: number): void {
        this.root = this._delete(this.root, val);
    }

    private _delete(node: TreeNode | null, val: number): TreeNode | null {
        if (node === null) {
            return null;
        }

        if (val === node.val) {
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }
            let minLargerNode = this._getMin(node.right);
            node.val = minLargerNode.val;
            node.right = this._delete(node.right, minLargerNode.val);
        } else if (val < node.val) {
            node.left = this._delete(node.left, val);
        } else {
            node.right = this._delete(node.right, val);
        }

        return node;
    }

    private _getMin(node: TreeNode): TreeNode {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
}
