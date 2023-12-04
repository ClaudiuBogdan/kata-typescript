export default class Queue<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private len: number;

    public get length(): number {
        return this.len;
    }

    constructor() {
        this.len = 0;
        this.head = null;
        this.tail = null;
    }

    enqueue(item: T): void {
        const node: Node<T> = {
            value: item,
            next: null,
            prev: this.tail,
        };
        if (this.len === 0) {
            this.tail = node;
            this.head = node;
        } else {
            this.tail!.next = node;
            this.tail = node;
        }
        this.len++;
    }

    deque(): T | undefined {
        if (this.len === 0) {
            return;
        }
        const oldHead = this.head!;
        if (this.len === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = oldHead.next!;
            this.head.prev = null;
            oldHead.next = null;
        }
        this.len--; // todo: decrease the len
        return oldHead.value;
    }

    peek(): T | undefined {
        if (this.len === 0) {
            return;
        }
        return this.head!.value;
    }
}

type Node<T> = {
    value: T;
    next: Node<T> | null;
    prev: Node<T> | null;
};
