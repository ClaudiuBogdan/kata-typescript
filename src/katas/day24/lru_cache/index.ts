type ListNode<K, V> = {
    key: K;
    value: V;
    next?: ListNode<K, V>;
    prev?: ListNode<K, V>;
};

/**
 * @class LRU
 * @description LRU stands for "Least Recently Used" and is a caching algorithm used to manage memory. The LRU cache stores a limited number of items and discards the least recently used item when the cache is full and a new item is added. The LRU class is a TypeScript implementation of this algorithm, which can be used to manage a cache of key-value pairs.
 * @link https://www.geeksforgeeks.org/lru-cache-implementation/
 */
export default class LRU<K, V> {
    private _head?: ListNode<K, V>;
    private _tail?: ListNode<K, V>;
    private _length: number;
    private _size: number;

    constructor(size: number) {
        if (size < 1) {
            throw new Error("Invalid size.");
        }
        this._size = size;
        this._length = 0;
        this._head = undefined;
        this._tail = undefined;
    }

    update(key: K, value: V): void {
        let node = this._head;
        while (node && node.key !== key) {
            node = node.next;
        }
        if (node) {
            node.value = value;
            this.unlinkNode(node);
        } else {
            node = this.createNode(key, value);
        }
        this._length++;
        this.updateHead(node);
    }

    get(key: K): V | undefined {
        let node = this._head;
        while (node && node.key !== key) {
            node = node.next;
        }
        if (!node) {
            return;
        }
        if(node === this._head){
            return node.value
        }
        this.unlinkNode(node);
        this.updateHead(node);
        return node.value;
    }

    private unlinkNode(node?: ListNode<K, V>): void {
        if (!node) {
            return;
        }
        const prev = node.prev;
        const next = node.next;
        this.linkNodes(prev, next);
        node.prev = undefined;
        node.next = undefined;
        if (node === this._head) {
            this._head = next;
        }
        if (node === this._tail) {
            this._tail = prev;
        }
    }

    private linkNodes(nodeA?: ListNode<K, V>, nodeB?: ListNode<K, V>): void {
        if (nodeA) {
            nodeA.next = nodeB;
        }
        if (nodeB) {
            nodeB.prev = nodeA;
        }
    }

    private createNode(key: K, value: V): ListNode<K, V> {
        return {
            key,
            value,
        };
    }

    private updateHead(node: ListNode<K, V>): void {
        if(node === this._head){
            return;
        }
        this.linkNodes(node, this._head);
        this._head = node;
        if (this._length === 1) {
            this._tail = node;
        }
        if (this._length > this._size) {
            const newTail = this._tail?.prev;
            this.unlinkNode(this._tail);
            this._tail = newTail;
            this._length--;
        }
    }
}
