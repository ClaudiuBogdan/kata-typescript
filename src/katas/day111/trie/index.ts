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
            terminal: true,
            parent: null,
        };
    }

    insert(word: string): void {
        let node = this.root;
        for (const char of word) {
            const child = node.children.get(char);
            if (child) {
                node = child;
            } else {
                const newNode = {
                    char,
                    children: new Map(),
                    terminal: false,
                    parent: node,
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
        while (!node.terminal) {
            const parent: Node = node.parent!;
            parent.children.delete(node.char);
            node = parent;
        }
    }
    search(word: string): boolean {
        const node = this.getLastNode(word);
        return !!node && node.terminal;
    }

    startsWith(prefix: string): string[] {
        let node = this.getLastNode(prefix);
        return this.startsWithAux(node, prefix, []);
    }

    private startsWithAux(
        node: Node | null,
        prefix: string,
        result: string[],
    ): string[] {
        if (!node) {
            return result;
        }
        if (node.terminal) {
            result.push(prefix);
        }
        for (const child of node.children.values()) {
            this.startsWithAux(child, prefix + child.char, result);
        }
        return result;
    }

    private getLastNode(word: string): Node | null {
        let node = this.root;
        for (const char of word) {
            const child = node.children.get(char);
            if (!child) {
                return null;
            }
            node = child;
        }
        return node;
    }
}

type Node = {
    char: string;
    children: Map<string, Node>;
    terminal: boolean;
    parent: Node | null;
};