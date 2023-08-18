/**
 * @class LRU
 * @description LRU stands for "Least Recently Used" and is a caching algorithm used to manage memory. The LRU cache stores a limited number of items and discards the least recently used item when the cache is full and a new item is added. The LRU class is a TypeScript implementation of this algorithm, which can be used to manage a cache of key-value pairs.
 * @link https://www.geeksforgeeks.org/lru-cache-implementation/
 */
export default class LRU<K, V> {
    private length: number;
    private list: DoubleLinkedList<K, V>;
    private map: Map<K, Node<K, V>>;

    constructor(length: number) {
        this.length = length;
        this.map = new Map();
        this.list = new DoubleLinkedList();
    }

    update(key: K, value: V): void {
        // Create node if doesn't exist
        // Get node from map
        const node = this.getOrCreateNode(key, value);
        // Move node to head
        this.list.prepend(node);
        // Remove tail if exceeded size limit
        if (this.list.size > this.length) {
            const lastNode = this.list.removeLast();
            if (lastNode) this.map.delete(lastNode.key);
        }
    }

    get(key: K): V | undefined {
        // Find node in map
        const node = this.map.get(key);
        // Move node to head
        if (!node) {
            return undefined;
        }
        // Move node to head
        this.list.prepend(node);
        return node.value;
    }

    private getOrCreateNode(key: K, value: V): Node<K, V> {
        const node = this.map.get(key);
        if (node) {
            this.list.updateNode(node, value);
            return node;
        } else {
            const node = this.list.createNode(key, value);
            this.map.set(key, node);
            return node;
        }
    }
}

class DoubleLinkedList<K, V> {
    private _size: number;
    private _head: Node<K, V> | undefined;
    private _tail: Node<K, V> | undefined;

    public get size(): number {
        return this._size;
    }

    constructor() {
        this._size = 0;
    }

    public prepend(node: Node<K, V>): void {
        this.unlinkNode(node);
        const oldHead = this._head;
        this._head = node;
        node.next = oldHead;

        if (oldHead) {
            oldHead.prev = node;
        } else {
            this._tail = node;
        }
        this._size++;
    }

    public createNode(key: K, value: V): Node<K, V> {
        return {
            key,
            value,
        };
    }

    public unlinkNode(node: Node<K, V>): void {
        const prevNode = node.prev;
        const nextNode = node.next;
        if (prevNode) {
            prevNode.next = nextNode;
        }
        if (nextNode) {
            nextNode.prev = prevNode;
        }
        node.next = undefined;
        node.prev = undefined;
    }

    public updateNode(node: Node<K, V>, value: V): void {
        node.value = value;
    }

    public removeLast(): Node<K, V> | undefined {
        if (this._tail === undefined) {
            return;
        }
        const oldTail = this._tail;
        this._tail = oldTail.prev;
        oldTail.prev = undefined;
        if (this._tail) {
            this._tail.next = undefined;
        } else {
            this._head = undefined;
        }
        this._size--;
        return oldTail;
    }
}

type Node<K, V> = {
    key: K;
    value: V;
    prev?: Node<K, V>;
    next?: Node<K, V>;
};
