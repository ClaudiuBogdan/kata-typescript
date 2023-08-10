import { ITrie, TrieChildren, TrieNode } from "./types";

/**
 * @class Trie
 * @description A trie is a tree-like data structure whose nodes store the letters of an alphabet. It is used for efficient retrieval of a key in a large data set of strings.
 * @link https://www.geeksforgeeks.org/introduction-to-trie-data-structure-and-algorithm-tutorials/
 */
export default class Trie implements ITrie {
    private children: Map<string, TrieNode>;

    constructor() {
        this.children = new Map();
    }

    insert(word: string): void {
        let parent = null;
        let children = this.children;
        for (let i = 0; i < word.length; i++) {
            const char = word.charAt(i);
            const isTerminal = i === word.length - 1;
            const node = this.getOrCreateNode(
                char,
                parent,
                children,
                isTerminal,
            );
            children = node.children;
            parent = node;
        }
    }
    delete(word: string): void {
        // Navigate to the last node
        // Check if the last node has children.
        // If has children, set isTerminal to false
        // If it doesn't have children, remove nodes until reaching a node that is terminal or the node has not parent
        // Considerations: the trie may not have the word
        let children = this.children;
        let node: TrieNode | null | undefined = null;
        for (let i = 0; i < word.length; i++) {
            const char = word.charAt(i);
            node = children.get(char);
            if (!node) {
                break;
            }
            children = node.children;
        }
        // word doesn't exist in the trie
        if (!node) {
            return;
        }

        if (node.children.size > 0) {
            node.isTerminal = false;
            return;
        }

        let char = node.char;
        do {
            char = node.char;
            node = node.parent;
        } while (node && !node.isTerminal);

        if (!node) {
            this.children.delete(char);
        } else {
            node.children.delete(char);
        }
    }
    search(word: string): boolean {
        let children = this.children;
        for (let i = 0; i < word.length; i++) {
            const char = word.charAt(i);
            const node = children.get(char);
            if (!node) {
                return false;
            }
            if (i === word.length - 1 && !node.isTerminal) {
                return false;
            }
            children = node.children;
        }
        return true;
    }
    startsWith(prefix: string): string[] {
        let children = this.children;
        let node: TrieNode | undefined;
        for (let i = 0; i < prefix.length; i++) {
            const char = prefix.charAt(i);
            node = children.get(char);
            if (!node) {
                break;
            }
            children = node.children;
        }
        if (!node) {
            return [];
        }
        const initialPrefix = prefix.substring(0, prefix.length - 1);
        return this.getWords(initialPrefix, node, []);
    }

    private getOrCreateNode(
        char: string,
        parent: TrieNode | null,
        parentChildren: TrieChildren,
        isTerminal = false,
    ): TrieNode {
        const existingNode = parentChildren.get(char);
        if (existingNode) {
            existingNode.isTerminal ||= isTerminal;
            return existingNode;
        }
        const newNode: TrieNode = {
            char,
            parent,
            children: new Map(),
            isTerminal,
        };
        parentChildren.set(char, newNode);

        return newNode;
    }

    private getWords(
        prefix: string,
        node: TrieNode,
        matches: string[],
    ): string[] {
        const newPrefix = prefix + node.char;
        if (node.isTerminal) {
            matches.push(newPrefix);
        }
        for (let child of node.children.values()) {
            this.getWords(newPrefix, child, matches);
        }
        return matches;
    }
}
