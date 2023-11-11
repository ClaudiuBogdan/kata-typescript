export default function compareBinaryTrees(
    rootA: BinaryNode<number>,
    rootB: BinaryNode<number>,
): boolean {
    return compare(rootA, rootB);
}

function compare(
    rootA: BinaryNode<number> | null,
    rootB: BinaryNode<number> | null,
): boolean {
    if (rootA === null && rootB === null) {
        return true;
    }

    if (rootA && rootB) {
        return (
            rootA.value === rootB.value &&
            compare(rootA.left, rootB.left) &&
            compare(rootA.right, rootB.right)
        );
    }
    return false;
}
