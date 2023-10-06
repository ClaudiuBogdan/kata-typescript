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

        // Find the parent of the new node
        while (node) {
            parent = node;
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else {
                // Key already exist.
                return;
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
        this.fixupInsert(newNode);
    }

    private fixupInsert(node: RBNode): void {
        if (node === this.root) {
            node.color = "BLACK";
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
            return this.fixupInsert(parent);
        }
        // Uncle is black and parent red
        if (isLeft(parent) && isLeft(node)) {
            this.rotateRight(grandparent);
            swapColor(grandparent, parent);
            return this.fixupInsert(parent);
        }
        if (isRight(parent) && isRight(node)) {
            this.rotateLeft(grandparent);
            swapColor(grandparent, parent);
            return this.fixupInsert(parent);
        }
        if (isLeft(parent) && isRight(node)) {
            this.rotateLeft(parent);
            return this.fixupInsert(parent);
        }
        if (isRight(parent) && isLeft(node)) {
            this.rotateRight(parent);
            return this.fixupInsert(parent);
        }
    }

    private rotateRight(node: RBNode): void {
        const newRoot = node.left!;
        newRoot.parent = node.parent;
        node.parent = newRoot;
        node.left = newRoot.right;
        newRoot.right = node;
        if (node.left) {
            node.left.parent = node;
        }
        if (node === this.root) {
            this.root = newRoot;
        }
    }

    private rotateLeft(node: RBNode): void {
        const newRoot = node.right!;
        newRoot.parent = node.parent;
        node.parent = newRoot;
        node.right = newRoot.left;
        newRoot.left = node;
        if (node.right) {
            node.right.parent = node;
        }
        if (node === this.root) {
            this.root = newRoot;
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
        let node = this.root;
        while (node) {
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else {
                return node;
            }
        }
        return null;
    }
}

function isBlack(node: RBNode | null): boolean {
    return !node || node.color === "BLACK";
}

function isRed(node: RBNode | null): boolean {
    return !!node && node.color === "RED";
}

function swapColor(nodeA: RBNode, nodeB: RBNode): void {
    [nodeA.color, nodeB.color] = [nodeB.color, nodeA.color];
}

function getUncle(node: RBNode): RBNode | null {
    if (!node.parent?.parent) {
        return null;
    }
    return isLeft(node.parent)
        ? node.parent.parent.right
        : node.parent.parent.left;
}

function isLeft(node: RBNode | null): boolean {
    const parent = node?.parent;
    return !!parent && parent.left === node;
}

function isRight(node: RBNode | null): boolean {
    const parent = node?.parent;
    return !!parent && parent.right === node;
}
