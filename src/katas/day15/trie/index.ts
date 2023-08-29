import { ITrie } from "./types";

type TrieNode = {
    parent: TrieNode | null;
    char: string;
    children: Map<string, TrieNode>;
    terminal: boolean;
};

/**
 * @class Trie
 * @description A trie is a tree-like data structure whose nodes store the letters of an alphabet. It is used for efficient retrieval of a key in a large data set of strings.
 * @link https://www.geeksforgeeks.org/introduction-to-trie-data-structure-and-algorithm-tutorials/
 */
export default class Trie implements ITrie {
    private trie: TrieNode;

    constructor() {
        this.trie = {
            parent: null,
            char: "",
            children: new Map(),
            terminal: false,
        };
    }

    insert(word: string): void {
        let parent = this.trie;
        for (let i = 0; i < word.length; i++) {
            const char = word.charAt(i);
            parent = this.getOrCreateChildren(
                char,
                parent,
                i === word.length - 1,
            );
        }
    }

    delete(word: string): void {
        // find terminal node
        // remove until reached another terminal node or end of parent
        let node = this.getNode(word)
        if(!node || !node.terminal){
            return
        }
        if(node.children.size > 0){
            node.terminal = false
            return
        }
        let parent = node.parent;
        if (!parent) {
            return;
        }
        do {
            parent.children.delete(node.char);
            node = parent;
            parent = node.parent;
        } while (parent && !node.terminal);
    }

    search(word: string): boolean {
        const node = this.getNode(word);
        if (!node || !node.terminal) {
            return false;
        }
        return true;
    }
    startsWith(prefix: string): string[] {
        let node = this.getNode(prefix)
        if(!node){
            return []
        }
        return this.getWords(node, prefix, [])
    }

    private getOrCreateChildren(
        char: string,
        parent: TrieNode,
        terminal: boolean,
    ): TrieNode {
        const node = parent.children.get(char);
        if (node) {
            node.terminal ||= terminal;
            return node;
        }
        const newNode = {
            parent,
            char,
            children: new Map(),
            terminal,
        };
        parent.children.set(char, newNode);
        return newNode;
    }

    private getNode(word: string): TrieNode | undefined {
        let node = this.trie;
        for (let i = 0; i < word.length; i++) {
            const char = word.charAt(i);
            const child = node.children.get(char);
            const terminal = i === word.length - 1;
            if (!child) {
                return undefined;
            }
            node = child;
        }
        return node;
    }

    private getWords(node: TrieNode, prefix: string, arr: string[]): string[]{
        if(node.terminal){
            arr.push(prefix)
        }
        for(let [char, child] of node.children){
            const newPrefix = prefix + char
            this.getWords(child, newPrefix, arr)
        }
        return arr
    }
}