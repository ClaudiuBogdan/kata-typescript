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
