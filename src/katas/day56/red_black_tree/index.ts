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
        } else {
            if (key < parent.key) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
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
        while (node) {
            if (key === node.key) {
                return node;
            } else if (key < node.key) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return null;
    }

    private fixupInsert(node: RBNode): void {
        const root = this.root;
        if (root && isRed(root)) {
            root.color = "BLACK";
        }
        if (node === root) {
            return;
        }
        const parent = node.parent!;
        const grandparent = parent.parent!;
        if (parent.color === "BLACK") {
            return;
        }
        const uncle = getUncle(node);
        if (uncle && isRed(uncle)) {
            uncle.color = "BLACK";
            parent.color = "BLACK";
            grandparent.color = "RED";
            return this.fixupInsert(node);
        }
        // Uncle and parent are black
        if (isLeft(parent) && isLeft(node)) {
            this.rotateRight(grandparent);
            swapColors(grandparent, parent);
            return this.fixupInsert(parent);
        }
        if (isRight(parent) && isRight(node)) {
            this.rotateLeft(grandparent);
            swapColors(grandparent, parent);
            return this.fixupInsert(parent);
        }
        if (isLeft(parent) && isRight(node)) {
            this.rotateLeft(parent);
            this.fixupInsert(parent);
        }
        if (isRight(parent) && isLeft(node)) {
            this.rotateRight(parent);
            this.fixupInsert(parent);
        }
    }

    private rotateLeft(node: RBNode): void {
        const parent = node.parent;
        const rightNode = node.right!;
        rightNode.parent = parent;
        node.parent = rightNode;
        node.right = rightNode.left;
        rightNode.left = node;
        if (node.right) {
            node.right.parent = node;
        }
        if (this.root === node) {
            this.root = rightNode;
        }
    }

    private rotateRight(node: RBNode): void {
        const parent = node.parent;
        const leftNode = node.left!;
        leftNode.parent = parent;
        node.parent = leftNode;
        node.left = leftNode.right;
        leftNode.right = node;
        if (node.left) {
            node.left.parent = node;
        }
        if (this.root === node) {
            this.root = leftNode;
        }
    }
}

function isRed(node: RBNode | null): boolean {
    return !!node && node.color === "RED";
}

function isBlack(node: RBNode | null): boolean {
    return !!node && node.color === "BLACK";
}

function swapColors(nodeA: RBNode, nodeB: RBNode): void {
    const colorA = nodeA.color;
    nodeA.color = nodeB.color;
    nodeB.color = colorA;
}

function isRight(node: RBNode): boolean {
    return node.parent!.right === node;
}

function isLeft(node: RBNode): boolean {
    return node.parent!.left === node;
}

function getUncle(node: RBNode): RBNode | null {
    const parent = node.parent!;
    const grandparent = parent.parent!;
    return isLeft(parent) ? grandparent.right : grandparent.left;
}
