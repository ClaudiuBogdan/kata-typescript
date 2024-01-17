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
            children: new Map(),
            parent: null,
            terminal: true,
        };
    }

    insert(word: string): void {
        let node = this.root;
        for (const char of word) {
            if (node.children.has(char)) {
                node = node.children.get(char)!;
            } else {
                const newNode: Node = {
                    char,
                    children: new Map(),
                    parent: node,
                    terminal: false,
                };
                node.children.set(char, newNode);
                node = newNode;
            }
        }
        node.terminal = true;
    }

    delete(word: string): void {
        let node = this.getLastNode(word);
        if (!node || !node.terminal) {
            return;
        }
        node.terminal = false;
        if (node.children.size > 0) {
            return;
        }
        while (node && !node.terminal) {
            node.parent!.children.delete(node.char);
            node = node.parent!;
        }
    }

    search(word: string): boolean {
        const node = this.getLastNode(word);
        return !!node && node.terminal;
    }

    startsWith(prefix: string): string[] {
        const node = this.getLastNode(prefix);
        if (!node) {
            return [];
        }
        return this.startsWithAux(node, prefix, []);
    }

    private startsWithAux(node: Node, prefix: string, results: string[]) {
        if (node.terminal) {
            results.push(prefix);
        }
        for (const child of node.children.values()) {
            this.startsWithAux(child, prefix + child.char, results);
        }
        return results;
    }

    private getLastNode(word: string): Node | undefined {
        let node = this.root;
        for (const char of word) {
            if (node.children.has(char)) {
                node = node.children.get(char)!;
            } else {
                return;
            }
        }
        return node;
    }
}

type Node = {
    char: string;
    children: Map<string, Node>;
    parent: Node | null;
    terminal: boolean;
};