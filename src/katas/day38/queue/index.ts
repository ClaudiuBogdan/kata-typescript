type Node<T> = {
    value: T;
    next: Node<T> | null;
    prev: Node<T> | null;
};
export default class Queue<T> {
    private _head: Node<T> | null;
    private _tail: Node<T> | null;
    private _length: number;

    public get length(): number {
        return this._length;
    }

    constructor() {
        this._length = 0;
        this._head = null;
        this._tail = null;
    }

    enqueue(item: T): void {
        const node: Node<T> = {
            value: item,
            next: null,
            prev: null,
        };
        if (this.length === 0) {
            this._head = node;
            this._tail = node;
        } else {
            this.linkNodes(this._tail!, node);
            this._tail = node;
        }
        this._length++;
    }
    deque(): T | undefined {
        if (this.length === 0) {
            return;
        }
        if (this.length === 1) {
            this._tail = null;
        }
        const oldHead = this._head!;
        this._head = oldHead.next;
        this.unlinkNode(oldHead);
        this._length--;
        return oldHead.value;
    }

    peek(): T | undefined {
        if (this.length === 0) {
            return;
        }
        return this._head!.value;
    }

    private linkNodes(nodeA: Node<T>, nodeB: Node<T>): void {
        nodeA.next = nodeB;
        nodeB.prev = nodeA;
    }

    private unlinkNode(node: Node<T>): void {
        const { prev, next } = node;
        if (prev) {
            prev.next = next;
        }
        if (next) {
            next.prev = prev;
        }
    }
}
