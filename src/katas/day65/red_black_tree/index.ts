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
        let node: RBNode | null = this.root;
        while (node && node.key !== key) {
            if (key < node.key) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return node;
    }

    private fixupInsert(node: RBNode): void {
        const root = this.root;
        const black = "BLACK";
        const red = "RED";
        if (root && root.color === red) {
            root.color = black;
        }
        if (node === root) {
            return;
        }
        const parent = node.parent!;
        if (parent.color === black) {
            return;
        }
        const grandparent = parent.parent!;
        const uncle = getUncle(node);
        if (uncle && uncle.color === red) {
            uncle.color = black;
            parent.color = black;
            grandparent.color = red;
            this.fixupInsert(parent);
            return;
        }
        // Uncle black and parent red;
        if (isLeft(parent) && isLeft(node)) {
            swapColors(grandparent, parent);
            this.rotateRight(grandparent);
            return;
        }
        if (isRight(parent) && isRight(node)) {
            swapColors(grandparent, parent);
            this.rotateLeft(grandparent);
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

    private rotateRight(node: RBNode): void {
        const parent = node.parent;
        const leftNode = node.left!;
        node.parent = leftNode;
        leftNode.parent = parent;
        node.left = leftNode.right;
        leftNode.right = node;
        if (node.left) {
            node.left.parent = node;
        }
        if (node === this.root) {
            this.root = leftNode;
        }
    }

    private rotateLeft(node: RBNode): void {
        const parent = node.parent;
        const rightNode = node.right!;
        node.parent = rightNode;
        rightNode.parent = parent;
        node.right = rightNode.left;
        rightNode.left = node;
        if (node.right) {
            node.right.parent = node;
        }
        if (node === this.root) {
            this.root = rightNode;
        }
    }
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
