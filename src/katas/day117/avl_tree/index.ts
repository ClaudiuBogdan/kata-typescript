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

    private _insert(node: AVLNode | null, key: number): AVLNode {
        if (!node) {
            return {
                key,
                height: 1,
                left: null,
                right: null,
            };
        }

        if (key < node.key) {
            node.left = this._insert(node.left, key);
        } else if (key > node.key) {
            node.right = this._insert(node.right, key);
        } else {
            return node;
        }

        this._updateHeight(node);
        return this._rebalance(node);
    }

    /**
     * Deletes a key from the AVL Tree.
     * @param {number} key - The key to delete.
     */
    delete(key: number): void {
        this.root = this._delete(this.root, key);
    }

    private _delete(node: AVLNode | null, key: number): AVLNode | null {
        if (!node) {
            return null;
        }

        if (key < node.key) {
            node.left = this._delete(node.left, key);
        } else if (key < node.key) {
            node.right = this._delete(node.right, key);
        } else {
            // Found the node to delete
            if (!node.left || !node.right) {
                node = node.left || node.right;
            } else {
                const minNode = this._getMinNode(node.right);
                node.key = minNode.key;
                node.right = this._delete(node.right, minNode.key);
            }
        }

        if (!node) {
            return null;
        }

        this._updateHeight(node);
        return this._rebalance(node);
    }

    /**
     * Searches for a key in the AVL Tree.
     * @param {number} key - The key to search for.
     * @returns {AVLNode | null} - The node with the key, or null if not found.
     */
    search(key: number): AVLNode | null {
        return this._search(this.root, key);
    }

    private _search(node: AVLNode | null, key: number): AVLNode | null {
        if (!node) {
            return null;
        } else if (key < node.key) {
            return this._search(node.left, key);
        } else if (key > node.key) {
            return this._search(node.right, key);
        } else {
            return node;
        }
    }

    private _updateHeight(node: AVLNode): void {
        node.height =
            1 +
            Math.max(this._getHeight(node.left), this._getHeight(node.right));
    }

    private _getHeight(node: AVLNode | null): number {
        if (!node) {
            return 0;
        }
        return node.height;
    }

    private _rebalance(node: AVLNode): AVLNode {
        const balanceFactor = this._getBalanceFactor(node);

        // Left Left Case
        if (
            node.left &&
            balanceFactor > 1 &&
            this._getBalanceFactor(node.left) >= 0
        ) {
            return this._singleRightRotate(node);
        }

        // Right Right Case
        if (
            balanceFactor < -1 &&
            node.right &&
            this._getBalanceFactor(node.right) <= 0
        ) {
            return this._singleLeftRotate(node);
        }

        // Left Right Case
        if (
            balanceFactor > 1 &&
            node.left &&
            this._getBalanceFactor(node.left) < 0
        ) {
            node.left = this._singleLeftRotate(node.left);
            return this._singleRightRotate(node);
        }

        // Right Left Case
        if (
            balanceFactor < -1 &&
            node.right &&
            this._getBalanceFactor(node.right) > 0
        ) {
            node.right = this._singleRightRotate(node.right);
            return this._singleLeftRotate(node);
        }

        return node;
    }

    private _singleRightRotate(node: AVLNode): AVLNode {
        const newRoot = node.left!;
        node.left = newRoot.right;
        newRoot.right = node;

        this._updateHeight(node);
        this._updateHeight(newRoot);

        return newRoot;
    }

    private _singleLeftRotate(node: AVLNode): AVLNode {
        const newRoot = node.right!;
        node.right = newRoot.left;
        newRoot.left = node;

        this._updateHeight(node);
        this._updateHeight(newRoot);

        return newRoot;
    }

    private _getMinNode(node: AVLNode): AVLNode {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    }

    private _getBalanceFactor(node: AVLNode): number {
        return this._getHeight(node.left) - this._getHeight(node.right);
    }
}
