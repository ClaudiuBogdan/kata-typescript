export interface ITrie {
    insert(word: string): void;
    delete(word: string): void;
    search(word: string): boolean;
    startsWith(prefix: string): string[];
}

export type TrieChildren = Map<string, TrieNode>;

export type TrieNode = {
    char: string;
    parent: TrieNode | null
    children: TrieChildren;
    isTerminal: boolean;
};
