import { ITrie } from "./types";

/**
 * @class Trie
 * @description A trie is a tree-like data structure whose nodes store the letters of an alphabet. It is used for efficient retrieval of a key in a large data set of strings.
 * @link https://www.geeksforgeeks.org/introduction-to-trie-data-structure-and-algorithm-tutorials/
 */
export default class Trie implements ITrie {
    private root: TrieNode;

    constructor() {
        this.root = this.createNode("", true, null);
    }

    insert(word: string): void {
        let node = this.root;
        for (const char of word) {
            const hasChild = node.children.has(char);
            const child = hasChild
                ? node.children.get(char)!
                : this.createNode(char, false, node);
            if (!hasChild) {
                node.children.set(char, child);
            }
            node = child;
        }
        node.terminal = true;
    }

    delete(word: string): void {
        const lastNode = this.getLastNode(word);
        if (!lastNode) {
            return;
        }
        if (lastNode.children.size > 0) {
            lastNode.terminal = false;
            return;
        }
        let node = lastNode;
        for (let i = word.length - 1; i >= 0; i--) {
            if (!node.parent || node.terminal) {
                return;
            }
            const char = word[i];
            node.parent.children.delete(char);
            node = node.parent;
        }
    }
    search(word: string): boolean {
        const lastNode = this.getLastNode(word);
        return !!lastNode && lastNode.terminal;
    }
    startsWith(prefix: string): string[] {
        const lastNode = this.getLastNode(prefix);
        if (!lastNode) {
            return [];
        }
        const words: string[] = [];
        const search = (prefix: string, node: TrieNode): string[] => {
            if (node.terminal) {
                words.push(prefix);
            }
            for (const child of node.children.values()) {
                search(prefix + child.char, child);
            }
            return words;
        };
        return search(prefix, lastNode);
    }

    private getLastNode(word: string): TrieNode | undefined {
        let idx = 0;
        let node: TrieNode | undefined = this.root;
        while (node && idx < word.length) {
            node = node.children.get(word[idx]);
            idx++;
        }
        return node;
    }

    private createNode(
        char: string,
        terminal: boolean,
        parent: TrieNode | null,
    ) {
        return {
            char,
            terminal,
            parent,
            children: new Map(),
        };
    }
}

type TrieNode = {
    char: string;
    parent: TrieNode | null;
    children: Map<string, TrieNode>;
    terminal: boolean;
};
