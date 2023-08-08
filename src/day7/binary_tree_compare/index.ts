export default function compareBinaryTrees(
    rootA: BinaryNode<number>,
    rootB: BinaryNode<number>,
): boolean {
    return compare(rootA, rootB);
}

function compare<T>(
    rootA?: BinaryNode<T> | null,
    rootB?: BinaryNode<T> | null,
): boolean {
    if (rootA === undefined && rootB === undefined) {
        return true;
    }
    if (rootA === null && rootB === null) {
        return true;
    }
    if (rootA?.value !== rootB?.value) {
        return false;
    }
    return (
        compare(rootA?.left, rootB?.left) && compare(rootA?.right, rootB?.right)
    );
}
