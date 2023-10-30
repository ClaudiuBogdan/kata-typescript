export default class Queue<T> {
    private _length: number;
    private _head: Node<T> | null;
    private _tail: Node<T> | null;

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
        if (this.length === 0) {
            this._head = node;
        } else {
            this._tail!.next = node;
        }
        this._tail = node;
        this._length++;
    }

    deque(): T | undefined {
        if (this.length === 0) {
            return undefined;
        }
        const oldHead = this._head!;
        this._head = oldHead.next;
        if (this.length === 1) {
            this._tail = null;
            this._head = null;
        } else {
            this._head!.prev = null;
            oldHead.next = null;
        }
        this._length--;
        return oldHead.value;
    }

    peek(): T | undefined {
        if (this.length === 0) {
            return undefined;
        }
        return this._head!.value;
    }
}

type Node<T> = {
    value: T;
    prev: Node<T> | null;
    next: Node<T> | null;
};
