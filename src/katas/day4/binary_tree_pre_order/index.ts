/**
 * @module BTPreOrder
 * @param {BinaryNode<number>} root
 * @returns {number[]}
 * @description Given the root of a binary tree, return the preorder traversal of its nodes' values. The root node is visited before the left and right subtrees.
 * @see https://www.geeksforgeeks.org/preorder-traversal-of-binary-tree/
 */
export default function pre_order_search(head: BinaryNode<number>): number[] {
    return pre_order_aux(head);
}

function pre_order_aux(head: BinaryNode<number>, acc: number[] = []): number[] {
    // 1. Print node
    // 2. Print left branch
    // 3. Print right branch
    acc.push(head.value);
    if (head.left) {
        pre_order_aux(head.left, acc);
    }
    if (head.right) {
        pre_order_aux(head.right, acc);
    }
    return acc;
}
