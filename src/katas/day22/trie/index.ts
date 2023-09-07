import { ITrie } from "./types";

type TrieNode = {
    char: string;
    children: Map<string, TrieNode>;
    parent: TrieNode | undefined;
    terminal: boolean;
};

/**
 * @class Trie
 * @description A trie is a tree-like data structure whose nodes store the letters of an alphabet. It is used for efficient retrieval of a key in a large data set of strings.
 * @link https://www.geeksforgeeks.org/introduction-to-trie-data-structure-and-algorithm-tutorials/
 */
export default class Trie implements ITrie {
    private root: TrieNode;

    constructor() {
        this.root = this.createNode("", true);
    }
    insert(word: string): void {
        let node = this.root;
        for (let char of word) {
            node = this.getOrCreateNode(char, node);
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
        let parent = lastNode.parent;
        for (let i = word.length - 1; i >= 0; i--) {
            const char = word[i];
            if (!parent) {
                return;
            }
            const node = parent.children.get(char);
            if (node?.terminal) {
                return;
            } else {
                parent.children.delete(char);
            }
            parent = parent.parent;
        }
    }
    search(word: string): boolean {
        const lastNode = this.getLastNode(word);
        if (!lastNode || !lastNode.terminal) {
            return false;
        }
        return true;
    }

    startsWith(prefix: string): string[] {
        const lastNode = this.getLastNode(prefix);
        const results: string[] = [];
        if (!lastNode) {
            return results;
        }

        const search = (prefix: string, node: TrieNode): void => {
            if (node.terminal) {
                results.push(prefix);
            }
            for (let [char, childNode] of node.children.entries()) {
                search(prefix + char, childNode);
            }
        };
        search(prefix, lastNode);
        return results;
    }

    private createNode(
        char: string,
        terminal: boolean,
        parent?: TrieNode,
    ): TrieNode {
        return {
            char,
            children: new Map(),
            parent,
            terminal,
        };
    }

    private getOrCreateNode(char: string, parent: TrieNode): TrieNode {
        let node = parent.children.get(char);
        if (!node) {
            node = this.createNode(char, false, parent);
            parent.children.set(char, node);
        }
        return node;
    }

    private getLastNode(word: string): TrieNode | undefined {
        let node: TrieNode | undefined = this.root;
        for (let char of word) {
            node = node.children.get(char);
            if (!node) {
                return;
            }
        }
        return node;
    }
}
