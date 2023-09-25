/**
 * Definition for a binary tree node.
 */
export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    parent: TreeNode | null;
    constructor(
        val?: number,
        left?: TreeNode | null,
        right?: TreeNode | null,
        parent?: TreeNode | null,
    ) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
        this.parent = parent === undefined ? null : parent;
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
        this.root = this._insert(this.root, null, val);
    }

    private _insert(
        root: TreeNode | null,
        parent: TreeNode | null,
        val: number,
    ): TreeNode {
        if (!root) {
            return new TreeNode(val, null, null, parent);
        }
        if (root.val === val) {
            return root;
        }
        if (val < root.val) {
            root.left = this._insert(root.left, root, val);
        } else {
            root.right = this._insert(root.right, root, val);
        }
        return root;
    }

    /**
     * Searches for a value in the BST.
     * @param {number} val - The value to search for.
     * @returns {boolean} True if the value is found, otherwise false.
     */
    search(val: number): boolean {
        return this._search(this.root, val);
    }

    private _search(root: TreeNode | null, val: number): boolean {
        if (root === null) {
            return false;
        }
        if (root.val === val) {
            return true;
        }
        if (val < root.val) {
            return this._search(root.left, val);
        } else {
            return this._search(root.right, val);
        }
    }

    /**
     * Deletes a value from the BST.
     * @param {number} val - The value to delete.
     */
    delete(val: number): void {
        this.root = this._delete(this.root, val);
    }

    private _delete(root: TreeNode | null, val: number): TreeNode | null {
        if (root === null) {
            return null;
        }
        if (root.val === val) {
            if (root.left === null) {
                return root.right;
            }
            if (root.right === null) {
                return root.left;
            }
            const minNode = this.getLargeMinNode(root.right);
            root.val = minNode.val;
            this._delete(minNode.parent, minNode.val);
        } else if (val < root.val) {
            root.left = this._delete(root.left, val);
        } else {
            root.right = this._delete(root.right, val);
        }
        return root;
    }

    private getLargeMinNode(node: TreeNode): TreeNode {
        if (node.left) {
            return this.getLargeMinNode(node.left);
        }
        return node;
    }
}
