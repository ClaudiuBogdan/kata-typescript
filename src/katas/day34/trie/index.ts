import { ITrie } from "./types";

/**
 * @class Trie
 * @description A trie is a tree-like data structure whose nodes store the letters of an alphabet. It is used for efficient retrieval of a key in a large data set of strings.
 * @link https://www.geeksforgeeks.org/introduction-to-trie-data-structure-and-algorithm-tutorials/
 */
export default class Trie implements ITrie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode("", true, null);
    }
    insert(word: string): void {
        let prevNode = this.root;
        for (const char of word) {
            if (!prevNode.children.has(char)) {
                const newNode = new TrieNode(char, false, prevNode);
                prevNode.children.set(char, newNode);
                prevNode = newNode;
            } else {
                prevNode = prevNode.children.get(char) as TrieNode;
            }
        }
        prevNode.terminal = true;
    }
    delete(word: string): void {
        let lastNode = this._getLastNode(word);
        if (!lastNode || !lastNode.terminal) {
            return;
        }
        const shouldDelete = lastNode.children.size === 0;
        for (let i = word.length - 1; i >= 0 && lastNode; i++) {
            if (!shouldDelete) {
                lastNode.terminal = false;
                break;
            }
            if (i < word.length - 1 && lastNode.terminal) {
                break;
            }
            const char = word[i];
            lastNode.parent?.children.delete(char);
            lastNode = lastNode?.parent;
        }
    }

    search(word: string): boolean {
        let prevNode: TrieNode | null | undefined = this.root;
        for (let i = 0; i < word.length && prevNode; i++) {
            const char = word[i];
            prevNode = prevNode.children.get(char);
        }
        return !!prevNode && prevNode.terminal;
    }
    startsWith(prefix: string): string[] {
        const lastNode = this._getLastNode(prefix);
        return this._startsWith(prefix, lastNode, []);
    }

    private _startsWith(
        prefix: string,
        node: TrieNode | null,
        words: string[],
    ): string[] {
        if (!node) {
            return words;
        }
        if (node.terminal) {
            words.push(prefix);
        }
        for (const child of node.children.values()) {
            this._startsWith(prefix + child.char, child, words);
        }
        return words;
    }

    private _getLastNode(word: string): TrieNode | null {
        let prevNode: TrieNode | null | undefined = this.root;
        for (let i = 0; i < word.length && !!prevNode; i++) {
            const char = word[i];
            prevNode = prevNode.children.get(char);
        }
        return prevNode || null;
    }
}

class TrieNode {
    public children: Map<string, TrieNode>;
    constructor(
        public char: string,
        public terminal: boolean,
        public parent: TrieNode | null,
    ) {
        this.children = new Map();
    }
}
