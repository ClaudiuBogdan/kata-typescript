export default function in_order_search(head: BinaryNode<number>): number[] {
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
