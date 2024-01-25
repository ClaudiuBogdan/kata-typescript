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
            if (node.key === key) {
                return;
            } else if (key < node.key) {
                node = node.left;
            } else {
                node = node.right;
            }
        }

        const newNode: RBNode = {
            key,
            color: "RED",
            left: null,
            right: null,
            parent,
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

        if (this.root === node) {
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
            return this.fixupInsert(parent);
        }

        if (isLeft(node) && isLeft(parent)) {
            swapColors(parent, grandparent);
            this.rotateRight(grandparent);
            return this.fixupInsert(parent);
        }

        if (isRight(node) && isRight(parent)) {
            swapColors(parent, grandparent);
            this.rotateLeft(grandparent);
            return this.fixupInsert(parent);
        }

        if (isLeft(node) && isRight(parent)) {
            this.rotateRight(parent);
            return this.fixupInsert(parent);
        }

        if (isRight(node) && isLeft(parent)) {
            this.rotateLeft(node);
            return this.fixupInsert(parent);
        }
    }

    private rotateLeft(node: RBNode): void {
        const parent = node.parent;
        const right = node.right!;
        node.right = right.left;
        right.left = node;
        node.parent = right;
        right.parent = parent;

        if (node.right) {
            node.right.parent = node;
        }

        if (parent === null) {
            this.root = right;
        }
    }

    private rotateRight(node: RBNode): void {
        const parent = node.parent;
        const left = node.left!;
        node.left = left.right;
        left.right = node;
        node.parent = left;
        left.parent = parent;

        if (node.left) {
            node.left.parent = node;
        }

        if (parent === null) {
            this.root = left;
        }
    }
}

function getUncle(node: RBNode): RBNode | null {
    const parent = node.parent!;
    const grandparent = parent.parent!;

    return isLeft(parent) ? grandparent.right : grandparent.left;
}

function swapColors(nodeA: RBNode, nodeB: RBNode): void {
    const tmpColorA = nodeA.color;
    nodeA.color = nodeB.color;
    nodeB.color = tmpColorA;
}

function isLeft(node: RBNode): boolean {
    return !!node.parent && node.parent.left === node;
}

function isRight(node: RBNode): boolean {
    return !!node.parent && node.parent.right === node;
}

