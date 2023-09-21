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
        const node: RBNode = {
            key,
            color: "RED",
            left: null,
            right: null,
            parent: null,
        };
        const insert = (root: RBNode | null, parent: RBNode | null): RBNode => {
            if (root === null) {
                node.parent = parent;
                return node;
            }
            if (root.key === key) {
                return root;
            }
            if (key < root.key) {
                root.left = insert(root.left, root);
            } else {
                root.right = insert(root.right, root);
            }
            return root;
        };
        this.root = insert(this.root, null);

        this.insertFixup(node);
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
        const search = (node: RBNode | null): RBNode | null => {
            if (node === null) {
                return null;
            }
            if (key === node.key) {
                return node;
            }
            if (key < node.key) {
                return search(node.left);
            } else {
                return search(node.right);
            }
        };
        return search(this.root);
    }

    private insertFixup(node: RBNode | null): void {
        if (node === null) {
            return;
        }
        if (node === this.root) {
            node.color = "BLACK";
            return;
        }
        if (node.parent === null || node.parent.parent === null) {
            return;
        }
        if (isBlack(node.parent)) {
            return;
        }
        const uncle = getUncle(node);
        const parent = node.parent;
        const granParent = getGranParent(node) as RBNode;
        if (isRed(parent) && isRed(uncle)) {
            setColor(parent, "BLACK");
            setColor(uncle, "BLACK");
            setColor(granParent, "RED");
            return this.insertFixup(granParent);
        }
        // Parent is red and uncle is black
        if (isRightChild(parent) && isLeftChild(node)) {
            granParent.right = node;
            node.parent = granParent;
            node.right = parent;
            parent.left = null;
            parent.parent = node;
            return this.insertFixup(parent);
        }
        if (isLeftChild(parent) && isRightChild(node)) {
            granParent.left = node;
            node.parent = granParent;
            node.left = parent;
            parent.parent = node;
            return this.insertFixup(parent);
        }
        if (isRightChild(parent) && isRightChild(node)) {
            this.leftRotate(granParent);
            swapColors(granParent, parent);
            return this.insertFixup(parent);
        }
        if (isLeftChild(parent) && isLeftChild(node)) {
            this.rightRotate(granParent);
            swapColors(granParent, parent);
            return this.insertFixup(parent);
        }
    }

    private leftRotate(node: RBNode): void {
        if (node.right === null) {
            return;
        }
        const nodeB = node.right;
        const parent = node.parent;
        node.right = nodeB.left;
        nodeB.left = node;
        node.parent = nodeB;
        nodeB.parent = parent;
        if (this.root === node) {
            this.root = nodeB;
        }
    }

    private rightRotate(node: RBNode): void {
        if (node.left === null) {
            return;
        }
        const nodeB = node.left;
        const parent = node.parent;
        node.left = nodeB.right;
        nodeB.right = node;
        node.parent = nodeB;
        nodeB.parent = parent;
        if (this.root === node) {
            this.root = nodeB;
        }
    }
}

function isBlack(node: RBNode | null): boolean {
    return node === null || node.color === "BLACK";
}

function isRed(node: RBNode | null): boolean {
    return node !== null && node.color === "RED";
}

function getUncle(node: RBNode | null): RBNode | null {
    if (node === null || node.parent === null || node.parent.parent === null) {
        return null;
    }
    if (node.parent === node.parent.parent.left) {
        return node.parent.parent.right;
    } else {
        return node.parent.parent.left;
    }
}

function getGranParent(node: RBNode | null): RBNode | null {
    return node && node.parent && node.parent.parent;
}

function isLeftChild(node: RBNode | null): boolean {
    return !!node && !!node.parent && node.parent.left === node;
}

function isRightChild(node: RBNode | null): boolean {
    return !!node && !!node.parent && node.parent.right === node;
}

function setColor(node: RBNode | null, color: "RED" | "BLACK"): void {
    if (node === null) {
        return;
    }
    node.color = color;
}

function swapColors(nodeA: RBNode, nodeB: RBNode): void {
    const tmpColor = nodeA.color;
    nodeA.color = nodeB.color;
    nodeB.color = tmpColor;
}
