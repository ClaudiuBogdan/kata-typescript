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
        let node = this.root;
        let parent = null;
        while (node) {
            parent = node;
            if (node.key === key) {
                return;
            }
            if (key < node.key) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        const newNode: RBNode = {
            key,
            parent,
            left: null,
            right: null,
            color: "RED",
        };
        if (parent === null) {
            this.root = newNode;
        } else if (key < parent.key) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }

        this._fixupInsert(newNode);
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
        let node: RBNode | null = this.root;
        while (node) {
            if (node.key === key) {
                return node;
            }
            if (key < node.key) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return null;
    }

    private _fixupInsert(node: RBNode): void {
        if (this.root && isRed(this.root)) {
            this.root.color = "BLACK";
        }
        if (node === this.root) {
            node.color = "BLACK";
            return;
        }
        const parent = node.parent!;
        if (isBlack(parent)) {
            return;
        }
        const grandparent = parent.parent!;
        const uncle = getUncle(node);
        if (uncle && isRed(uncle)) {
            uncle.color = "BLACK";
            parent.color = "BLACK";
            grandparent.color = "RED";
            return this._fixupInsert(parent);
        }
        if (isLeft(parent) && isLeft(node)) {
            this.rotateRight(grandparent);
            swapColors(grandparent, parent);
            return this._fixupInsert(parent);
        }
        if (isRight(parent) && isRight(node)) {
            this.rotateLeft(grandparent);
            swapColors(grandparent, parent);
            return this._fixupInsert(parent);
        }
        if (isLeft(parent) && isRight(node)) {
            this.rotateLeft(parent);
            return this._fixupInsert(parent);
        }
        if (isRight(parent) && isLeft(node)) {
            this.rotateRight(parent);
            return this._fixupInsert(parent);
        }
    }

    private rotateLeft(node: RBNode): void {
        const rightNode = node.right!;
        rightNode.parent = node.parent;
        node.parent = rightNode;
        node.right = rightNode.left;
        rightNode.left = node;
        if (node.right) {
            node.right.parent = node;
        }
        if (node === this.root) {
            this.root = rightNode;
        }
    }

    private rotateRight(node: RBNode): void {
        const leftNode = node.left!;
        leftNode.parent = node.parent;
        node.parent = leftNode;
        node.left = leftNode.right;
        leftNode.right = node;
        if (node.left) {
            node.left.parent = node;
        }
        if (node === this.root) {
            this.root = leftNode;
        }
    }
}

function isBlack(node: RBNode): boolean {
    return node.color === "BLACK";
}

function isRed(node: RBNode): boolean {
    return node.color === "RED";
}

function getUncle(node: RBNode): RBNode | null {
    const parent = node.parent!;
    const grandparent = parent.parent!;
    return isLeft(parent) ? grandparent.right : grandparent.left;
}

function isLeft(node: RBNode): boolean {
    return node.parent!.left === node;
}

function isRight(node: RBNode): boolean {
    return node.parent!.right === node;
}

function swapColors(nodeA: RBNode, nodeB: RBNode): void {
    const colorA = nodeA.color;
    nodeA.color = nodeB.color;
    nodeB.color = colorA;
}
