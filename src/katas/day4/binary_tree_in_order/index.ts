/**
 * @function in_order_traversal
 * @param root {BinaryNode<number>}
 * @returns {number[]}
 * @description Given the root of a binary tree, return the inorder traversal of its nodes' values. The root node is visited between the left and right subtrees.
 * @see https://www.geeksforgeeks.org/inorder-traversal-of-binary-tree/
 *
 */
export default function in_order_traversal(head: BinaryNode<number>): number[] {
    return in_order_aux(head);
}

function in_order_aux(head: BinaryNode<number>, acc: number[] = []): number[] {
    // 1. Print left branch
    // 2. Print node value
    // 3. Print right branch
    if (head.left) {
        in_order_aux(head.left, acc);
    }
    acc.push(head.value);
    if (head.right) {
        in_order_aux(head.right, acc);
    }
    return acc;
}
