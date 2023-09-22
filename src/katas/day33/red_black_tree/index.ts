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
        const find = (node: RBNode | null): RBNode | null => {
            if (node === null) {
                return null;
            }
            if (node.key === key) {
                return node;
            } else if (key < node.key) {
                return find(node.left);
            } else {
                return find(node.right);
            }
        };
        return find(this.root);
    }

    private insertFixup(node: RBNode): void {
        // parent node is always black
        if (node.parent === null) {
            node.color = "BLACK";
            return;
        }
        if (isBlack(node.parent)) {
            return;
        }
        const uncle = getUncle(node);
        const parent = node.parent as RBNode;
        const granParent = node.parent.parent as RBNode;
        if (uncle && isRed(uncle)) {
            uncle.color = "BLACK";
            parent.color = "BLACK";
            granParent.color = "RED";
            return this.insertFixup(parent);
        }
        //  parent is red and uncle black
        if (isLeft(parent) && isLeft(node)) {
            this.rotateRight(granParent);
            swapColors(granParent, parent);
            return this.insertFixup(parent);
        }
        if (isRight(parent) && isRight(node)) {
            this.rotateLeft(granParent);
            swapColors(granParent, parent);
            return this.insertFixup(parent);
        }
        if (isLeft(parent) && isRight(node)) {
            this.rotateLeft(parent);
            return this.insertFixup(parent);
        }
        if (isRight(parent) && isLeft(node)) {
            this.rotateRight(parent);
            return this.insertFixup(parent);
        }
    }

    private rotateRight(node: RBNode): void {
        const leftChildren = node.left as RBNode;
        const parent = node.parent;
        leftChildren.parent = parent;
        node.parent = leftChildren;
        node.left = leftChildren.right;
        leftChildren.right = node;
        if (node.left) {
            node.left.parent = node;
        }
        if (parent === null) {
            this.root = leftChildren;
        }
    }

    private rotateLeft(node: RBNode): void {
        const rightChildren = node.right as RBNode;
        const parent = node.parent;
        rightChildren.parent = parent;
        node.parent = rightChildren;
        node.right = rightChildren.left;
        rightChildren.left = node;
        if (node.right) {
            node.right.parent = node;
        }
        if (parent === null) {
            this.root = rightChildren;
        }
    }
}

function isBlack(node: RBNode | null): boolean {
    return node === null || node.color === "BLACK";
}

function isRed(node: RBNode | null): boolean {
    return !isBlack(node);
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

function isLeft(node: RBNode): boolean {
    return !!node && !!node.parent && node.parent.left === node;
}

function isRight(node: RBNode): boolean {
    return !!node && !!node.parent && node.parent.right === node;
}

function swapColors(nodeA: RBNode, nodeB: RBNode): void {
    const tmpColor = nodeA.color;
    nodeA.color = nodeB.color;
    nodeB.color = tmpColor;
}
