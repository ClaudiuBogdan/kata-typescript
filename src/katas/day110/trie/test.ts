import Trie from "./index";

test("Trie", function () {
    const trie = new Trie();
    trie.insert("foo");
    trie.insert("fool");
    trie.insert("foolish");
    trie.insert("bar");

    expect(trie.startsWith("fo").sort()).toEqual(["foo", "fool", "foolish"]);

    expect(trie.search("fool")).toEqual(true);

    trie.delete("fool");

    expect(trie.search("fool")).toEqual(false);

    expect(trie.startsWith("fo").sort()).toEqual(["foo", "foolish"]);
});
