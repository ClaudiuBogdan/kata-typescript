import { ITrie } from "./types";

/**
 * @class Trie
 * @description A trie is a tree-like data structure whose nodes store the letters of an alphabet. It is used for efficient retrieval of a key in a large data set of strings.
 * @link https://www.geeksforgeeks.org/introduction-to-trie-data-structure-and-algorithm-tutorials/
 */
export default class Trie implements ITrie {
    private root: Node;

    constructor() {
        this.root = {
            char: "",
            parent: null,
            children: new Map(),
            terminal: true,
        };
    }

    insert(word: string): void {
        let parent = this.root;
        for (const char of word) {
            const node: Node = parent.children.get(char) ?? {
                char,
                parent,
                children: new Map(),
                terminal: false,
            };
            parent.children.set(char, node);
            parent = node;
        }
        parent.terminal = true;
    }
    delete(word: string): void {
        let node = this._getNode(word);
        if (!node || !node.terminal) {
            return;
        }
        node.terminal = false;
        if (node.children.size > 0) {
            return;
        }
        while (node && !node.terminal) {
            const parent: Node = node.parent!;
            parent.children.delete(node.char);
            node = parent;
        }
    }

    search(word: string): boolean {
        const node = this._getNode(word);
        return !!node?.terminal;
    }
    startsWith(prefix: string): string[] {
        const node = this._getNode(prefix);
        if (!node) {
            return [];
        }
        return this._startsWithAux(prefix, node, []);
    }

    private _getNode(word: string): Node | null {
        let node: Node | undefined = this.root;
        for (const char of word) {
            node = node.children.get(char);
            if (node === undefined) {
                return null;
            }
        }
        return node;
    }

    private _startsWithAux(
        prefix: string,
        node: Node,
        words: string[],
    ): string[] {
        if (node.terminal) {
            words.push(prefix);
        }
        for (const child of node.children.values()) {
            this._startsWithAux(prefix + child.char, child, words);
        }
        return words;
    }
}

type Node = {
    char: string;
    parent: Node | null;
    children: Map<string, Node>;
    terminal: boolean;
};
