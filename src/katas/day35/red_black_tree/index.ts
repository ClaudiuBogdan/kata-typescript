/**
 * Represents a node in a Red-Black Tree.
 */
export interface RBNode {
    key: number;
    color: "RED" | "BLACK";
    left: RBNode | null;
    right: RBNode | null;
    parent: RBNode | null;
}

/**
 * Red-Black Tree class with basic operations like insert, delete, and search.
 */
export class RedBlackTree {
    root: RBNode | null;

    constructor() {
        this.root = null;
    }

    /**
     * Inserts a key into the Red-Black Tree.
     * @param {number} key - The key to insert.
     */
    insert(key: number): void {
        let node: RBNode = {
            key,
            left: null,
            right: null,
            parent: null,
            color: "RED",
        };
        let inserted = false;

        function insert(
            root: RBNode | null,
            parent: RBNode | null,
            key: number,
        ): RBNode {
            if (root === null) {
                node.parent = parent;
                inserted = true;
                return node;
            }
            if (root.key === key) {
                return root;
            }
            if (key < root.key) {
                root.left = insert(root.left, root, key);
            } else {
                root.right = insert(root.right, root, key);
            }
            return root;
        }
        this.root = insert(this.root, null, key);
        if (inserted) {
            this._fixUpInsert(node);
        }
    }

    private _fixUpInsert(node: RBNode): void {
        if (this.root === node) {
            node.color = "BLACK";
            return;
        }
        const parent = node.parent as RBNode;
        if (isBlack(parent)) {
            return;
        }
        const grandParent = parent.parent as RBNode;
        const uncle = getUncle(node);
        if (uncle && isRed(uncle)) {
            uncle.color = "BLACK";
            parent.color = "BLACK";
            grandParent.color = "RED";
            this._fixUpInsert(parent);
            return;
        }
        if (isLeft(parent) && isLeft(node)) {
            this._rotateRight(grandParent);
            swapColors(grandParent, parent);
            this._fixUpInsert(parent);
            return;
        }
        if (isRight(parent) && isRight(node)) {
            this._rotateLeft(grandParent);
            swapColors(grandParent, parent);
            this._fixUpInsert(parent);
            return;
        }
        if (isLeft(parent) && isRight(node)) {
            this._rotateLeft(parent);
            this._fixUpInsert(parent);
            return;
        }
        if (isRight(parent) && isLeft(node)) {
            this._rotateRight(parent);
            this._fixUpInsert(parent);
            return;
        }
    }

    private _rotateRight(node: RBNode): void {
        if (node.left === null) {
            return;
        }
        const parent = node.parent;
        const left = node.left;
        left.parent = parent;
        node.parent = left;
        node.left = left.right;
        if (left.right) {
            left.right.parent = node;
        }
        left.right = node;
        if (parent === null) {
            this.root = left;
        }
    }

    private _rotateLeft(node: RBNode): void {
        if (node.right === null) {
            return;
        }
        const parent = node.parent;
        const right = node.right;
        right.parent = parent;
        node.parent = right;
        if (right.left) {
            right.left.parent = node;
        }
        node.right = right.left;
        right.left = node;
        if (parent === null) {
            this.root = right;
        }
    }

    /**
     * Deletes a key from the Red-Black Tree.
     * @param {number} key - The key to delete.
     */
    delete(key: number): void {
        // Function implementation here
    }

    /**
     * Searches for a key in the Red-Black Tree.
     * @param {number} key - The key to search for.
     * @returns {RBNode | null} - The node with the key, or null if not found.
     */
    search(key: number): RBNode | null {
        return this._search(this.root, key);
    }

    private _search(root: RBNode | null, key: number): RBNode | null {
        if (root === null) {
            return null;
        }
        if (root.key === key) {
            return root;
        }
        if (key < root.key) {
            return this._search(root.left, key);
        } else {
            return this._search(root.right, key);
        }
    }
}

function isBlack(node: RBNode | null): boolean {
    return node === null || node.color === "BLACK";
}

function isRed(node: RBNode | null): boolean {
    return !!node && node.color === "RED";
}

function getUncle(node: RBNode): RBNode | null {
    const parent = node.parent as RBNode;
    const grandParent = parent.parent;
    if (!grandParent) {
        return null;
    }
    return isLeft(parent) ? grandParent.right : grandParent.left;
}

function isLeft(node: RBNode): boolean {
    return !!node.parent && node.parent.left === node;
}

function isRight(node: RBNode): boolean {
    return !!node.parent && node.parent.right === node;
}

function swapColors(nodeA: RBNode, nodeB: RBNode): void {
    const tmpColorA = nodeA.color;
    nodeA.color = nodeB.color;
    nodeB.color = tmpColorA;
}
