import Trie from "./index";

describe("Trie", function () {
    test('search', () => {
        const trie = new Trie();
        trie.insert('hello');
        expect(trie.search('hell')).toEqual(false)
        expect(trie.search('hello')).toEqual(true)

        trie.insert('hell');
        expect(trie.search('hell')).toEqual(true)
        expect(trie.search('hello')).toBe(true)
    })

    test('delete', () => {
        const trie = new Trie();
        trie.insert('hello')
        trie.insert('hell')
        expect(trie.search('hello')).toBe(true)
        expect(trie.search('hell')).toBe(true)
        
        trie.delete('hell')
        expect(trie.search('hell')).toBe(false)
        expect(trie.search('hello')).toBe(true)
    })

    test('startsWith', () => {
        const trie = new Trie();
        trie.insert('hel');
        trie.insert('hell');
        trie.insert('hello');
        expect(trie.startsWith('hell')).toEqual(['hell', 'hello'])
        expect(trie.startsWith('helloo')).toEqual([])
    })

    test("trie", () => {
        const trie = new Trie();
        trie.insert("foo");
        trie.insert("fool");
        trie.insert("foolish");
        trie.insert("bar");

        expect(trie.startsWith("fo").sort()).toEqual([
            "foo",
            "fool",
            "foolish",
        ]);
        
        expect(trie.search("fool")).toEqual(true);

        trie.delete("fool");

        expect(trie.search("fool")).toEqual(false);

        expect(trie.startsWith("fo").sort()).toEqual(["foo", "foolish"]);
    });
});
