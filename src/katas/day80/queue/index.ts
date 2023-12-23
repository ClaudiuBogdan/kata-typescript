export default class Queue<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private len: number;

    public get length(): number {
        return this.len;
    }

    constructor() {
        this.head = null;
        this.tail = null;
        this.len = 0;
    }

    enqueue(item: T): void {
        const node: Node<T> = {
            value: item,
            next: null,
            prev: this.tail,
        };
        if (this.len === 0) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail!.next = node;
            this.tail = node;
        }
        this.len++;
    }

    deque(): T | undefined {
        if (this.len === 0) {
            return undefined;
        }
        if (this.len === 1) {
            const oldHead = this.head!;
            this.head = null;
            this.tail = null;
            this.len--;
            return oldHead.value;
        }
        const oldHead = this.head!;
        this.head = oldHead.next!;
        this.head.prev = null;
        oldHead.next = null;
        this.len--;
        return oldHead.value;
    }

    peek(): T | undefined {
        if (this.len === 0) {
            return undefined;
        }
        return this.head!.value;
    }
}

type Node<T> = {
    value: T;
    prev: Node<T> | null;
    next: Node<T> | null;
};