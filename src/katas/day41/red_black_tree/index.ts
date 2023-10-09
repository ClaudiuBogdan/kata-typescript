import { TreeNode } from "../../../templates/binary_tree/binary_tree_lowest_common_ancestor/index";
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
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else {
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
            if (node.key === key) {
                return node;
            } else if (key < node.key) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return null;
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
}

function isLeft(node: RBNode): boolean {
    throw new Error("not implemented");
}

function isRight(node: RBNode): boolean {
    throw new Error("not implemented");
}

function 
