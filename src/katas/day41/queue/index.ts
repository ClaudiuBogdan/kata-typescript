export default class Queue<T> {
    private _length: number;
    private _head: QueueNode<T> | null;
    private _tail: QueueNode<T> | null;

    public get length(): number {
        return this._length;
    }

    constructor() {
        this._head = null;
        this._tail = null;
        this._length = 0;
    }

    enqueue(item: T): void {
        const node: QueueNode<T> = {
            value: item,
            prev: this._tail,
            next: null,
        };
        if (this._length === 0) {
            this._head = node;
        } else {
            this._tail!.next = node;
        }
        this._tail = node;

        this._length++;
    }

    deque(): T | undefined {
        if (this.length <= 0) {
            return;
        }
        const oldHead = this._head!;
        this._head = oldHead.next;
        oldHead.next = null;
        if (this._head) {
            this._head.prev = null;
        }
        if (this.length === 1) {
            this._tail = null;
        }
        this._length--;
        return oldHead.value;
    }

    peek(): T | undefined {
        if (this.length <= 0) {
            return;
        }
        return this._head!.value;
    }
}

type QueueNode<T> = {
    value: T;
    prev: QueueNode<T> | null;
    next: QueueNode<T> | null;
};
