export default function compareBinaryTrees(
    rootA: BinaryNode<number>,
    rootB: BinaryNode<number>,
): boolean {
    const compare = (
        rootA: BinaryNode<number> | null,
        rootB: BinaryNode<number> | null,
    ): boolean => {
        if (!rootA && !rootB) {
            return true;
        }
        if (!rootA && !!rootB) {
            return false;
        }
        if (!!rootA && !rootB) {
            return false;
        }
        return (
            rootA?.value === rootB?.value &&
            compare(rootA!.left, rootB!.left) &&
            compare(rootA!.right, rootB!.right)
        );
    };
    return compare(rootA, rootB);
}
