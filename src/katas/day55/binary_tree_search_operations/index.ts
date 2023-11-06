/**
 * Definition for a binary tree node.
 */
export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

/**
 * Class representing a Binary Search Tree (BST).
 */
export class BST {
    root: TreeNode | null;

    constructor() {
        this.root = null;
    }

    /**
     * Inserts a value into the BST.
     * @param {number} val - The value to insert.
     */
    insert(val: number): void {
        let parent = this.root;
        let node = parent;
        while (node) {
            parent = node;
            if (val === node.val) {
                return;
            }
            if (val < node.val) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        const newNode: TreeNode = {
            val,
            left: null,
            right: null,
        };
        if (!parent) {
            this.root = newNode;
        } else if (val < parent.val) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }
    }

    /**
     * Searches for a value in the BST.
     * @param {number} val - The value to search for.
     * @returns {boolean} True if the value is found, otherwise false.
     */
    search(val: number): boolean {
        let node = this.root;

        while (node) {
            if (node.val === val) {
                return true;
            } else if (val < node.val) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return false;
    }

    /**
     * Deletes a value from the BST.
     * @param {number} val - The value to delete.
     */
    delete(val: number): void {
        // TODO: iterative approach https://chat.openai.com/c/ee8e6bfc-e5a2-478e-8080-142852cfee9d
        let parent: TreeNode | null = null;
        let node: TreeNode | null = this.root;
        while (node && node.val !== val) {
            parent = node;
            if (val < node.val) {
                node = node.left;
            } else {
                node = node.right;
            }
        }

        if (!node) {
            return;
        }

        // If both left and right are not null
        if (node.left && node.right) {
            let successor = node.right;
            let successorParent = node;

            while (successor.left !== null) {
                successorParent = successor;
                successor = successor.left;
            }
            node.val = successor.val;
            node = successor;
            parent = successorParent;
        }

        const child: TreeNode | null = node.left ? node.left : node.right;

        if (parent === null) {
            this.root = child;
        } else {
            if (node === parent.left) {
                parent.left = child;
            } else {
                parent.right = child;
            }
        }
    }
}
