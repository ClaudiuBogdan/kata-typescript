/**
 * @class LRU
 * @description LRU stands for "Least Recently Used" and is a caching algorithm used to manage memory. The LRU cache stores a limited number of items and discards the least recently used item when the cache is full and a new item is added. The LRU class is a TypeScript implementation of this algorithm, which can be used to manage a cache of key-value pairs.
 * @link https://www.geeksforgeeks.org/lru-cache-implementation/
 */
export default class LRU<K, V> {
    private keyMap: Map<K, Node<K, V>>;
    private head: Node<K, V> | null;
    private tail: Node<K, V> | null;
    private capacity: number;

    constructor(capacity: number) {
        this.head = null;
        this.tail = null;
        this.capacity = capacity;
        this.keyMap = new Map();
    }

    update(key: K, value: V): void {
        if (this.keyMap.has(key)) {
            const node = this.keyMap.get(key)!;
            this.unlinkNode(node);
            this.updateHead(node);
            return;
        }
        const node: Node<K, V> = {
            key,
            value,
            prev: null,
            next: null,
        };
        this.keyMap.set(key, node);
        this.updateHead(node);
        if (this.keyMap.size > this.capacity) {
            this.removeTail();
        }
    }

    get(key: K): V | undefined {
        const node = this.keyMap.get(key);
        if (!node) {
            return;
        }
        if (node === this.head) {
            return node.value;
        }
        this.unlinkNode(node);
        this.updateHead(node);
        return node.value;
    }

    private unlinkNode(node: Node<K, V>): void {
        const prevNode = node.prev;
        const nextNode = node.next;
        if (prevNode) {
            prevNode.next = nextNode;
        }
        if (nextNode) {
            nextNode.prev = prevNode;
        }
        if (this.tail === node) {
            this.tail = prevNode;
        }
        if (this.head === node) {
            this.head = nextNode;
        }
        node.prev = null;
        node.next = null;
    }

    private updateHead(node: Node<K, V>): void {
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    private removeTail(): void {
        if (!this.tail) {
            return;
        }
        this.keyMap.delete(this.tail.key);
        this.tail = this.tail.prev;
        if (this.tail) {
            this.tail.next = null;
        } else {
            this.head = null;
        }
    }
}

type Node<K, V> = {
    key: K;
    value: V;
    prev: Node<K, V> | null;
    next: Node<K, V> | null;
};