export default class Queue<T> {
    private _head: Node<T> | null;
    private _tail: Node<T> | null;
    private _length: number;
    public get length(): number {
        return this._length;
    }

    constructor() {
        this._head = null;
        this._tail = null;
        this._length = 0;
    }

    enqueue(item: T): void {
        const node: Node<T> = {
            value: item,
            prev: this._tail,
            next: null,
        };
        if (this._tail) {
            this._tail.next = node;
        }
        if (this.length === 0) {
            this._head = node;
        }
        this._tail = node;
        this._length++;
    }

    deque(): T | undefined {
        if (this.length === 0) {
            return;
        }
        const oldHead = this._head!;
        if (this.length === 1) {
            this._head = null;
            this._tail = null;
        } else {
            this._head = oldHead.next!;
            this._head.prev = null;
            oldHead.next = null;
        }
        this._length--;
        return oldHead.value;
    }

    peek(): T | undefined {
        if (this.length === 0) {
            return;
        }
        return this._head!.value;
    }
}

type Node<T> = {
    value: T;
    prev: Node<T> | null;
    next: Node<T> | null;
};
