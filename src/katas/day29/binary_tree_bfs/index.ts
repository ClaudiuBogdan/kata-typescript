/**
 * @function breadthFirstSearch - Breadth First Search in a binary tree
 * @description Given a binary tree and a target value, return true if the target is found in the binary tree.
 * @description Level Order Traversal technique is defined as a method to traverse a Tree such that all nodes present in the same level are traversed completely before traversing the next level.
 * @link https://www.geeksforgeeks.org/level-order-tree-traversal/
 * @param head
 * @param target
 * @returns {boolean}
 */

export default function breadthFirstSearch(
    head: BinaryNode<number>,
    target: number,
): boolean {
    const q: BinaryNode<number>[] = [];
    q.push(head);
    while (q.length > 0) {
        const node = q.shift() as BinaryNode<number>;
        if (node.value === target) {
            return true;
        }
        if (node.left) {
            q.push(node.left);
        }
        if (node.right) {
            q.push(node.right);
        }
    }
    return false;
}
