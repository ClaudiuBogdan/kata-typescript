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
        let parent: Node = this.root;
        for (const char of word) {
            const existingNode = parent.children.get(char);
            if (existingNode === undefined) {
                const newNode: Node = {
                    char,
                    parent,
                    children: new Map(),
                    terminal: false,
                };
                parent.children.set(char, newNode);
                parent = newNode;
            } else {
                parent = existingNode;
            }
        }
        parent.terminal = true;
    }

    delete(word: string): void {
        const node = this.getLastNode(word);
        if (!node || !node.terminal) {
            return;
        }
        node.terminal = false;
        if (node.children.size > 0) {
            return;
        }
        let lastNode = node;
        let lastChar = node.char;
        while (lastNode && !lastNode.terminal) {
            lastChar = lastNode.char;
            lastNode = lastNode.parent!;
        }
        lastNode.children.delete(lastChar);
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
        return this.startsWithAux(prefix, node, []);
    }

    private startsWithAux(
        prefix: string,
        node: Node,
        results: string[],
    ): string[] {
        if (node.terminal) {
            results.push(prefix);
        }
        for (const child of node.children.values()) {
            this.startsWithAux(prefix + child.char, child, results);
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
