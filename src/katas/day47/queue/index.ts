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
            next: null,
            prev: this._tail,
        };
        if (this._length === 0) {
            this._head = node;
            this._tail = node;
        } else {
            this._tail!.next = node;
            this._tail = node;
        }
        this._length++;
    }

    deque(): T | undefined {
        if (this._length === 0) {
            return;
        }
        const oldHead = this._head!;
        this._head = oldHead.next;
        oldHead.next = null;
        if (this._head) {
            this._head.prev = null;
        }
        if (this._length === 1) {
            this._head = null;
            this._tail = null;
        }
        this._length--;
        return oldHead.value;
    }

    peek(): T | undefined {
        if (this._length === 0) {
            return;
        }
        return this._head!.value;
    }
}

type Node<T> = {
    value: T;
    next: Node<T> | null;
    prev: Node<T> | null;
};
