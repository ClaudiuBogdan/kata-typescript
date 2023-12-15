export default class Stack<T> {
    private head: Node<T> | null;
    private len: number;

    public get length(): number {
        return this.len;
    }

    constructor() {
        this.len = 0;
        this.head = null;
    }

    push(item: T): void {
        const node: Node<T> = {
            value: item,
            next: this.head,
        };
        this.head = node;
        this.len++;
    }

    pop(): T | undefined {
        if (this.len === 0) {
            return;
        }
        const oldHead = this.head!;
        this.head = oldHead.next;
        this.len--;
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
};