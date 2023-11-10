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
            const node = parent.children.get(char);
            if (!node) {
                const newNode: Node = {
                    char,
                    parent,
                    children: new Map(),
                    terminal: false,
                };
                parent.children.set(char, newNode);
                parent = newNode;
            } else {
                parent = node;
            }
        }
        parent.terminal = true;
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
        while (!node.terminal) {
            const parent: Node = node.parent!;
            parent.children.delete(node.char);
            node = parent;
        }
    }
    search(word: string): boolean {
        let node = this.getLastNode(word);
        return !!node && node.terminal;
    }
    startsWith(prefix: string): string[] {
        const node = this.getLastNode(prefix);
        return this.startsWithAux(node, prefix, []);
    }

    private startsWithAux(
        node: Node | null,
        prefix: string,
        results: string[],
    ): string[] {
        if (!node) {
            return results;
        }
        if (node.terminal) {
            results.push(prefix);
        }
        for (const childNode of node.children.values()) {
            this.startsWithAux(childNode, prefix + childNode.char, results);
        }
        return results;
    }

    private getLastNode(word: string): Node | null {
        let node: Node | undefined = this.root;
        for (const char of word) {
            node = node.children.get(char);
            if (!node) {
                return null;
            }
        }
        return node;
    }
}

type Node = {
    char: string;
    parent: Node | null;
    children: Map<string, Node>;
    terminal: boolean;
};
