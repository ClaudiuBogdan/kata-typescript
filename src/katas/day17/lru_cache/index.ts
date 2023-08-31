/**
 * @class LRU
 * @description LRU stands for "Least Recently Used" and is a caching algorithm used to manage memory. The LRU cache stores a limited number of items and discards the least recently used item when the cache is full and a new item is added. The LRU class is a TypeScript implementation of this algorithm, which can be used to manage a cache of key-value pairs.
 * @link https://www.geeksforgeeks.org/lru-cache-implementation/
 */
export default class LRU<K, V> {
    private _length: number;
    private _capacity: number;
    private _head: LRUNode<K, V> | undefined;
    private _tail: LRUNode<K, V> | undefined;
    private _map: Map<K, LRUNode<K, V>>;

    constructor(capacity: number) {
        if (capacity <= 0) {
            throw new Error("Invalid capacity");
        }
        this._capacity = capacity;
        this._length = 0;
        this._head = undefined;
        this._tail = undefined;
        this._map = new Map();
    }

    update(key: K, value: V): void {
        let node = this._map.get(key);
        if (node) {
            node.value = value;
            this.unlinkNode(node);
        } else {
            node = this.createNode(key, value);
            this._map.set(key, node);
        }
        this.linkNodes(node, this._head);
        this._head = node;
        if (this._length === 0) {
            this._tail = this._head;
        }
        this._length++;
        this.checkAndRemoveTail();
    }

    get(key: K): V | undefined {
        const node = this._map.get(key);
        if (!node) {
            return;
        }
        this.unlinkNode(node);
        this.linkNodes(node, this._head);
        this._head = node;
        if(this._length === 1){
            this._tail = node;
        }
        return node.value;
    }

    private unlinkNode(node: LRUNode<K, V>): void {
        const prevNode = node.prev;
        const nextNode = node.next;
        node.prev = undefined;
        node.next = undefined;
        if (prevNode) {
            prevNode.next = nextNode;
        }
        if (nextNode) {
            nextNode.prev = prevNode;
        }
        if (node === this._head) {
            this._head = nextNode;
        }
        if (node === this._tail) {
            this._tail = prevNode;
        }
    }

    private linkNodes(nodeA?: LRUNode<K, V>, nodeB?: LRUNode<K, V>): void {
        if (nodeA) {
            nodeA.next = nodeB;
        }
        if (nodeB) {
            nodeB.prev = nodeA;
        }
    }

    private createNode(key: K, value: V): LRUNode<K, V> {
        return {
            key,
            value,
        };
    }

    private checkAndRemoveTail(): void {
        if (this._length <= this._capacity) {
            return;
        }
        const oldTail = this._tail;
        if (!oldTail) {
            return;
        }
        const newTail = oldTail.prev;
        this.unlinkNode(oldTail);
        this._map.delete(oldTail.key);
        this._tail = newTail;
        this._length--;
    }
}

type LRUNode<K, V> = {
    key: K;
    value: V;
    prev?: LRUNode<K, V>;
    next?: LRUNode<K, V>;
};
