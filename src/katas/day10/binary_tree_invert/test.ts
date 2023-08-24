import invertTree from "./index";

test("Invert binary tree", function () {
    const tree: BinaryNode<number> = {
        value: 4,
        left: {
            value: 2,
            left: {
                value: 1,
                left: null,
                right: null,
            },
            right: {
                value: 3,
                left: null,
                right: null,
            },
        },
        right: {
            value: 7,
            left: {
                value: 6,
                left: null,
                right: null,
            },
            right: {
                value: 9,
                left: null,
                right: null,
            },
        },
    };

    const invertedTree: BinaryNode<number> = {
        value: 4,
        right: {
            value: 2,
            right: {
                value: 1,
                left: null,
                right: null,
            },
            left: {
                value: 3,
                left: null,
                right: null,
            },
        },
        left: {
            value: 7,
            right: {
                value: 6,
                left: null,
                right: null,
            },
            left: {
                value: 9,
                left: null,
                right: null,
            },
        },
    };

    expect(invertTree(tree)).toEqual(invertedTree);
    expect(invertTree(null)).toEqual(null);
});
