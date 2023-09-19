/**
 * Definition for a binary tree node.
 */
export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val: number, left?: TreeNode | null, right?: TreeNode | null) {
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
        const node = new TreeNode(val);
        if (!this.root) {
            this.root = node;
            return;
        }
        const insert = (parentNode: TreeNode, node: TreeNode): void => {
            if (node.val <= parentNode.val && parentNode.left !== null) {
                return insert(parentNode.left, node);
            }
            if (node.val <= parentNode.val) {
                parentNode.left = node;
                return;
            }
            if (parentNode.right) {
                return insert(parentNode.right, node);
            }
            parentNode.right = node;
        };
        return insert(this.root, node);
    }

    /**
     * Searches for a value in the BST.
     * @param {number} val - The value to search for.
     * @returns {boolean} True if the value is found, otherwise false.
     */
    search(val: number): boolean {
        const search = (root: TreeNode | null): boolean => {
            if (!root) {
                return false;
            }
            if (root.val === val) {
                return true;
            }
            return search(root.left) || search(root.right);
        };
        return search(this.root);
    }

    /**
     * Deletes a value from the BST.
     * @param {number} val - The value to delete.
     */
    delete(val: number): void {
        if (this.root === null) {
            return;
        }
        const [node, parentNode] = this.findNode(val);
        if (!node) {
            return;
        }
        const [leftMinNode, parentLeftMinNode] = this.findMinNode(node.left);
        const isRoot = this.root === node;
        if (leftMinNode) {
            this.removeNode(leftMinNode, parentLeftMinNode ?? node);
            this.switchNodes(node, leftMinNode, parentNode, isRoot);
            return;
        }
        const [rightMinNode, parentRightMinNode] = this.findMinNode(node.right);
        if (rightMinNode) {
            this.removeNode(rightMinNode, parentRightMinNode ?? node);
            this.switchNodes(node, rightMinNode, parentNode, isRoot);
            return;
        }
        this.switchNodes(node, null, parentNode, isRoot);
    }

    private findNode(val: number): [TreeNode | null, TreeNode | null] {
        let parentNode = this.root;
        const search = (node: TreeNode | null): TreeNode | null => {
            if (!node) {
                return null;
            }
            if (node.val === val) {
                return node;
            }
            parentNode = node;
            return search(node.left) || search(node.right);
        };
        const node = search(parentNode);
        return [node, parentNode];
    }

    private findMinNode(
        root: TreeNode | null,
    ): [TreeNode | null, TreeNode | null] {
        if (root === null) {
            return [null, null];
        }
        let parent: TreeNode | null = root;
        const findMin = (node: TreeNode | null): TreeNode | null => {
            if (!node) {
                return null;
            }
            if (node.left) {
                parent = node;
                return findMin(node.left);
            }
            return node;
        };
        const minNode = findMin(parent);
        parent = parent === minNode ? null : parent;
        return [minNode, parent];
    }

    private removeNode(node: TreeNode, parent: TreeNode): void {
        if (parent.left === node) {
            parent.left = null;
        }
        if (parent.right === node) {
            parent.right = null;
        }
    }

    private switchNodes(
        node: TreeNode,
        newNode: TreeNode | null,
        parentNode: TreeNode | null,
        isRoot = false,
    ): void {
        if (isRoot) {
            this.root = newNode;
        }
        if (!parentNode) {
            return;
        }
        if (parentNode.left === node) {
            parentNode.left = newNode;
        }
        if (parentNode.right === node) {
            parentNode.right = newNode;
        }
    }
}
