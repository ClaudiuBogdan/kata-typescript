export default function compareBinaryTrees(
    rootA: BinaryNode<number> | null,
    rootB: BinaryNode<number> | null,
): boolean {
    if (rootA && rootB) {
        return (
            rootA.value === rootB.value &&
            compareBinaryTrees(rootA.left, rootB.left) &&
            compareBinaryTrees(rootA.right, rootB.right)
        );
    }
    if (rootA === null && rootB == null) {
        return true;
    }
    return false;
}
