import { RedBlackTree, RBNode } from "./index";

describe("Red-Black Tree", () => {
    let rbTree: RedBlackTree;

    beforeEach(() => {
        rbTree = new RedBlackTree();
    });

    test("should start with an empty root", () => {
        expect(rbTree.root).toBeNull();
    });

    test("should insert a key and make it the root", () => {
        rbTree.insert(10);
        expect(rbTree.root?.key).toBe(10);
    });

    // test("should delete a key", () => {
    //     rbTree.insert(10);
    //     rbTree.delete(10);
    //     expect(rbTree.root).toBeNull();
    // });

    test("should search for a key and return the node", () => {
        rbTree.insert(10);
        const node = rbTree.search(10);
        expect(node?.key).toBe(10);
    });

    test("should return null when searching for a non-existent key", () => {
        const node = rbTree.search(10);
        expect(node).toBeNull();
    });

    test("should maintain balance after multiple insertions", () => {
        rbTree.insert(10);
        rbTree.insert(20);
        rbTree.insert(30);
        rbTree.insert(15);
        rbTree.insert(25);
        rbTree.insert(35);
        rbTree.insert(5);
        rbTree.insert(40);
        rbTree.insert(15);
        rbTree.insert(7);
        rbTree.insert(7);

        // Check if the root is black
        expect(rbTree.root?.color).toBe("BLACK");

        // Check if the tree is balanced
        const [balanced] = isBalanced(rbTree.root);
        const isRedBlack = hasRedParentBlackChildren(rbTree.root);
        expect(balanced).toBe(true);
        expect(isRedBlack).toBe(true);
    });

    // test("should maintain balance after multiple deletions", () => {
    //     rbTree.insert(10);
    //     rbTree.insert(20);
    //     rbTree.insert(30);
    //     rbTree.delete(20);
    //     // Add more checks to verify the tree is balanced
    // });
});

const isBalanced = (
    node: RBNode | null,
    blackCount: number = 0,
): [boolean, number] => {
    if (!node) {
        return [true, blackCount + 1];
    }

    if (node.color === "BLACK") {
        blackCount++;
    }

    if (node.color === "RED") {
        if (node.left?.color === "RED" || node.right?.color === "RED") {
            return [false, blackCount];
        }
    }

    const [leftBalanced, leftBlackCount] = isBalanced(node.left, blackCount);
    const [rightBalanced, rightBlackCount] = isBalanced(node.right, blackCount);

    return [
        leftBalanced && rightBalanced && leftBlackCount === rightBlackCount,
        leftBlackCount,
    ];
};

const hasRedParentBlackChildren = <T>(node: RBNode | null): boolean => {
    if (!node) {
        return true;
    }

    if (node.color === "RED") {
        if (node.left?.color === "RED" || node.right?.color === "RED") {
            return false;
        }
    }

    return (
        hasRedParentBlackChildren(node.left) &&
        hasRedParentBlackChildren(node.right)
    );
};
