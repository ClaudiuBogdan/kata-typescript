export interface ITrie {
    insert(word: string): void;
    delete(word: string): void;
    search(word: string): boolean;
    startsWith(prefix: string): string[];
}
