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
        let node: RBNode | null = null;
        const insert = (
            root: RBNode | null,
            parent: RBNode | null,
            key: number,
        ): RBNode => {
            if (root === null) {
                node = {
                    key,
                    parent,
                    left: null,
                    right: null,
                    color: "RED",
                };
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
        };

        this.root = insert(this.root, null, key);
        if (node === null) {
            return;
        }
        this._insertFixUp(node);
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
        const search = (root: RBNode | null, key: number): RBNode | null => {
            if (root === null || root.key === key) {
                return root;
            }
            if (key < root.key) {
                return search(root.left, key);
            } else {
                return search(root.right, key);
            }
        };
        return search(this.root, key);
    }

    private _insertFixUp(node: RBNode): void {
        if (this.root === node) {
            node.color = "BLACK";
            return;
        }
        const parent = node.parent!;
        if (parent.color === "BLACK") {
            return;
        }
        const grandparent = parent.parent!;
        const uncle = getUncle(node);
        if (uncle && uncle.color === "RED") {
            grandparent.color = "RED";
            parent.color = "BLACK";
            uncle.color = "BLACK";
            this._insertFixUp(parent);
            return;
        }
        if (isLeft(parent) && isLeft(node)) {
            this._rotateRight(grandparent);
            swapColors(parent, grandparent);
            this._insertFixUp(parent);
            return;
        }
        if (isRight(parent) && isRight(node)) {
            this._rotateLeft(grandparent);
            swapColors(parent, grandparent);
            this._insertFixUp(parent);
            return;
        }
        if (isLeft(parent) && isRight(node)) {
            this._rotateLeft(parent);
            this._insertFixUp(parent);
            return;
        }
        if (isRight(parent) && isLeft(node)) {
            this._rotateRight(parent);
            this._insertFixUp(parent);
            return;
        }
    }

    private _rotateLeft(node: RBNode): void {
        const newRoot = node.right!;
        node.right = newRoot.left;
        if (node.right) {
            node.right.parent = node;
        }
        newRoot.left = node;
        newRoot.parent = node.parent;
        node.parent = newRoot;
        if (node === this.root) {
            this.root = newRoot;
        }
    }

    private _rotateRight(node: RBNode): void {
        const newRoot = node.left!;
        node.left = newRoot.right;
        if (node.left) {
            node.left.parent = node;
        }
        newRoot.right = node;
        newRoot.parent = node.parent;
        node.parent = newRoot;
        if (node === this.root) {
            this.root = newRoot;
        }
    }
}

function getUncle(node: RBNode): RBNode | null {
    const parent = node.parent;
    const grandparent = node.parent?.parent;
    if (!parent || !grandparent) {
        return null;
    }
    return isLeft(parent) ? grandparent.right : grandparent.left;
}

function isLeft(node: RBNode): boolean {
    const parent = node.parent;
    return !!parent && parent.left === node;
}

function isRight(node: RBNode): boolean {
    const parent = node.parent;
    return !!parent && parent.right === node;
}

function swapColors(nodeA: RBNode, nodeB: RBNode): void {
    const tmpColorA = nodeA.color;
    nodeA.color = nodeB.color;
    nodeB.color = tmpColorA;
}
