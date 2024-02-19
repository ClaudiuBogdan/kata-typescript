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
        if (this.tail) {
            this.tail.next = node;
            this.tail = node;
        } else {
            this.head = node;
            this.tail = node;
        }
        this.len++;
    }

    deque(): T | undefined {
        if (this.len === 0) {
            return;
        }
        if (this.len === 1) {
            const val = this.head!.value;
            this.head = null;
            this.tail = null;
            this.len = 0;
            return val;
        } else {
            const oldHead = this.head!;
            this.head = oldHead.next!;
            oldHead.next = null;
            this.head.prev = null;
            this.len--;
            return oldHead.value;
        }
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