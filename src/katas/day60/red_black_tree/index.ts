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
        let node: RBNode | null = this.root;
        let parent: RBNode | null = null;

        while (node) {
            parent = node;
            if (key === node.key) {
                return;
            } else if (key < node.key) {
                node = node.left;
            } else {
                node = node.right;
            }
        }

        const newNode: RBNode = {
            key,
            left: null,
            right: null,
            parent,
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
        while (node && node.key !== key) {
            node = key < node.key ? node.left : node.right;
        }
        return node;
    }

    private fixupInsert(node: RBNode): void {
        if (this.root && this.root.color === "RED") {
            this.root.color = "BLACK";
        }
        if (node === this.root) {
            return;
        }
        const parent = node.parent!;
        if (parent.color === "BLACK") {
            return;
        }
        const grandparent = parent.parent!;
        const uncle = getUncle(node);
        if (uncle && uncle.color === "RED") {
            uncle.color = "BLACK";
            parent.color = "BLACK";
            grandparent.color = "RED";
            this.fixupInsert(parent);
            return;
        }

        // Uncle is black and parent is red
        if (isLeft(parent) && isLeft(node)) {
            this.rotateRight(grandparent);
            swapColors(parent, grandparent);
            this.fixupInsert(parent);
            return;
        }

        if (isRight(parent) && isRight(node)) {
            this.rotateLeft(grandparent);
            swapColors(parent, grandparent);
            this.fixupInsert(parent);
            return;
        }

        if (isLeft(parent) && isRight(node)) {
            this.rotateLeft(parent);
            this.fixupInsert(parent);
            return;
        }
        if (isRight(parent) && isLeft(node)) {
            this.rotateRight(parent);
            this.fixupInsert(parent);
            return;
        }
    }

    private rotateLeft(node: RBNode): void {
        const rightNode = node.right!;
        const parent = node.parent;
        rightNode.parent = parent;
        node.parent = rightNode;
        node.right = rightNode.left;
        rightNode.left = node;
        if (node.right) {
            node.right.parent = node;
        }
        if (parent === null) {
            this.root = rightNode;
        }
    }

    private rotateRight(node: RBNode): void {
        const leftNode = node.left!;
        const parent = node.parent;
        leftNode.parent = parent;
        node.parent = leftNode;
        node.left = leftNode.right;
        leftNode.right = node;
        if (node.left) {
            node.left.parent = node;
        }
        if (parent === null) {
            this.root = leftNode;
        }
    }
}

function isLeft(node: RBNode): boolean {
    return !!node.parent && node.parent.left === node;
}

function isRight(node: RBNode): boolean {
    return !!node.parent && node.parent.right === node;
}

function getUncle(node: RBNode): RBNode | null {
    const parent = node.parent!;
    const grandparent = parent.parent!;
    return isLeft(parent) ? grandparent.right : grandparent.left;
}

function swapColors(nodeA: RBNode, nodeB: RBNode): void {
    const colorA = nodeA.color;
    nodeA.color = nodeB.color;
    nodeB.color = colorA;
}
