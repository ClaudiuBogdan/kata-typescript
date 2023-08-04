export default function post_order_search(head: BinaryNode<number>): number[] {
    return post_order_aux(head);
}

function post_order_aux(
    head: BinaryNode<number>,
    acc: number[] = [],
): number[] {
    // 1. Print left branch
    // 2. Print right branch
    // 3. Print node value

    if (head.left) {
        post_order_aux(head.left, acc);
    }
    if (head.right) {
        post_order_aux(head.right, acc);
    }
    acc.push(head.value);
    return acc;
}
