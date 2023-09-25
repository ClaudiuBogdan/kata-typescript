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
            parent: null,
            left: null,
            right: null,
            color: "RED",
        };
        function insert(
            root: RBNode | null,
            parent: RBNode | null,
            key: number,
        ): RBNode {
            if (root === null) {
                node.parent = parent;
                return node;
            }
            if (key === root.key) {
                node = root;
                return node;
            }
            if (key < root.key) {
                root.left = insert(root.left, root, key);
            } else {
                root.right = insert(root.right, root, key);
            }
            return root;
        }
        this.root = insert(this.root, null, key);
        this._fixupInsert(node);
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

    private _search(node: RBNode | null, key: number): RBNode | null {
        if (node === null) {
            return null;
        }
        if (node.key === key) {
            return node;
        }
        if (key < node.key) {
            return this._search(node.left, key);
        } else {
            return this._search(node.right, key);
        }
    }

    private _fixupInsert(node: RBNode): void {
        if (this.root === node) {
            node.color = "BLACK";
            return;
        }
        const parent = node.parent as RBNode;
        if (isBlack(parent)) {
            return;
        }
        const grandparent = parent.parent as RBNode;
        const uncle = getUncle(node);
        if (uncle && isRed(uncle)) {
            parent.color = "BLACK";
            uncle.color = "BLACK";
            grandparent.color = "RED";
            this._fixupInsert(parent);
            return;
        }
        if (isLeft(parent) && isLeft(node)) {
            this._rotateRight(grandparent);
            swapColors(grandparent, parent);
            this._fixupInsert(parent);
            return;
        }
        if (isRight(parent) && isRight(node)) {
            this._rotateLeft(grandparent);
            swapColors(grandparent, parent);
            this._fixupInsert(parent);
            return;
        }
        if (isLeft(parent) && isRight(node)) {
            this._rotateLeft(parent);
            this._fixupInsert(parent);
            return;
        }
        if (isRight(parent) && isLeft(node)) {
            this._rotateRight(parent);
            this._fixupInsert(parent);
            return;
        }
    }

    private _rotateRight(node: RBNode): void {
        if (!node.left) {
            return;
        }
        const parent = node.parent;
        const leftChild = node.left;
        leftChild.parent = parent;
        node.parent = leftChild;
        node.left = leftChild.right;
        leftChild.right = node;
        if (node.left) {
            node.left.parent = node;
        }
        if (parent === null) {
            this.root = leftChild;
        }
    }

    private _rotateLeft(node: RBNode): void {
        if (!node.right) {
            return;
        }
        const parent = node.parent;
        const rightChild = node.right;
        rightChild.parent = parent;
        node.parent = rightChild;
        node.right = rightChild.left;
        rightChild.left = node;
        if (node.right) {
            node.right.parent = node;
        }
        if (parent === null) {
            this.root = rightChild;
        }
    }
}
function getUncle(node: RBNode): RBNode | null {
    if (node.parent === null || node.parent.parent === null) {
        return null;
    }
    if (node.parent.parent.left === node.parent) {
        return node.parent.parent.right;
    } else {
        return node.parent.parent.left;
    }
}

function isRed(node: RBNode | null): boolean {
    return node !== null && node.color === "RED";
}

function isBlack(node: RBNode | null): boolean {
    return node === null || node.color === "BLACK";
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
