/**
 * Represents a node in an AVL Tree.
 */
export interface AVLNode {
    key: number;
    height: number;
    left: AVLNode | null;
    right: AVLNode | null;
}

/**
 * AVL Tree class with basic operations like insert, delete, and search.
 */
export class AVLTree {
    root: AVLNode | null;

    constructor() {
        this.root = null;
    }

    /**
     * Inserts a key into the AVL Tree.
     * @param {number} key - The key to insert.
     */
    insert(key: number): void {
        this.root = this._insert(this.root, key);
    }

    private _insert(root: AVLNode | null, key: number): AVLNode {
        if (!root) {
            return {
                key,
                left: null,
                right: null,
                height: 1,
            } as AVLNode;
        }
        if (root.key === key) {
            return root;
        }
        if (key < root.key) {
            root.left = this._insert(root.left, key);
        } else {
            root.right = this._insert(root.right, key);
        }

        this._updateHeight(root);

        const balance = this._getBalanceFactor(root);

        if (balance > 1 && root.left && key < root.left.key) {
            return this._singleRightRotate(root);
        }
        if (balance < -1 && root.right && key > root.right.key) {
            return this._singleLeftRotate(root);
        }
        if (balance > 1 && root.left && key > root.left.key) {
            return this._doubleLeftRightRotate(root);
        }
        if (balance < -1 && root.right && key < root.right.key) {
            return this._doubleRightLeftRotate(root);
        }

        return root;
    }

    /**
     * Deletes a key from the AVL Tree.
     * @param {number} key - The key to delete.
     */
    delete(key: number): void {
        this.root = this._delete(this.root, key);
    }

    private _delete(root: AVLNode | null, key: number): AVLNode | null {
        if (root === null) {
            return null;
        }
        if (key < root.key) {
            root.left = this._delete(root.left, key);
        } else if (key > root.key) {
            root.right = this._delete(root.right, key);
        } else if (root.left === null) {
            root = root.right;
        } else if (root.right === null) {
            root = root.left;
        } else {
            const minNode = this._getMinNode(root.right);
            root.key = minNode.key;
            root.right = this._delete(root.right, minNode.key);
        }
        if (root === null) {
            return null;
        }

        this._updateHeight(root);

        const balance = this._getBalanceFactor(root);

        if (
            balance > 1 &&
            root.left &&
            this._getBalanceFactor(root.left) >= 0
        ) {
            return this._singleRightRotate(root);
        }
        if (
            balance < -1 &&
            root.right &&
            this._getBalanceFactor(root.right) <= 0
        ) {
            return this._singleLeftRotate(root);
        }
        if (balance > 1 && root.left && this._getBalanceFactor(root.left) < 0) {
            return this._doubleLeftRightRotate(root);
        }
        if (
            balance < -1 &&
            root.right &&
            this._getBalanceFactor(root.right) > 0
        ) {
            return this._doubleRightLeftRotate(root);
        }

        return root;
    }

    /**
     * Searches for a key in the AVL Tree.
     * @param {number} key - The key to search for.
     * @returns {AVLNode | null} - The node with the key, or null if not found.
     */
    search(key: number): AVLNode | null {
        return this._search(this.root, key);
    }

    private _search(root: AVLNode | null, key: number): AVLNode | null {
        if (!root) {
            return null;
        }
        if (key === root.key) {
            return root;
        }
        if (key < root.key) {
            return this._search(root.left, key);
        } else {
            return this._search(root.right, key);
        }
    }

    private _updateHeight(node: AVLNode): void {
        node.height =
            Math.max(this._getHeight(node.left), this._getHeight(node.right)) +
            1;
    }

    private _getHeight(node: AVLNode | null): number {
        return node ? node.height : 0;
    }

    private _getBalanceFactor(node: AVLNode): number {
        return this._getHeight(node.left) - this._getHeight(node.right);
    }

    private _singleRightRotate(node: AVLNode): AVLNode {
        if (node.left === null) {
            return node;
        }
        const newRoot = node.left;
        node.left = newRoot.right;
        newRoot.right = node;
        this._updateHeight(node);
        this._updateHeight(newRoot);
        return newRoot;
    }

    private _singleLeftRotate(node: AVLNode): AVLNode {
        if (!node.right) {
            return node;
        }
        const newRoot = node.right;
        node.right = newRoot.left;
        newRoot.left = node;
        this._updateHeight(node);
        this._updateHeight(newRoot);
        return newRoot;
    }

    private _doubleLeftRightRotate(node: AVLNode): AVLNode {
        node.left = this._singleLeftRotate(node.left as AVLNode);
        return this._singleRightRotate(node);
    }

    private _doubleRightLeftRotate(node: AVLNode): AVLNode {
        node.right = this._singleRightRotate(node.right as AVLNode);
        return this._doubleLeftRightRotate(node);
    }

    private _getMinNode(root: AVLNode): AVLNode {
        if (root.left) {
            return this._getMinNode(root.left);
        }
        return root;
    }
}
