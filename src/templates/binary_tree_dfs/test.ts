import { tree } from "./tree";
import dfs from "./index";

test("Depth first search on binary tree", function () {
    expect(dfs(tree, 45)).toEqual(true);
    expect(dfs(tree, 7)).toEqual(true);
    expect(dfs(tree, 69)).toEqual(false);
});
