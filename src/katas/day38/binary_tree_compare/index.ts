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
    if (!rootA && !rootB) {
        return true;
    }
    if ((rootA && !rootB) || (!rootA && rootB)) {
        return false;
    }
    if (rootA?.value !== rootB?.value) {
        return false;
    }
    return (
        compare(rootA!.left, rootB!.left) && compare(rootA!.right, rootB!.right)
    );
}
