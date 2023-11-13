export default class Stack<T> {
    private head: Node<T> | null;
    private len: number;
    public get length(): number {
        return this.len;
    }

    constructor() {
        this.head = null;
        this.len = 0;
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
        oldHead.next = null;
        this.len--;
        return oldHead.value;
    }
    peek(): T | undefined {
        return this.len === 0 ? undefined : this.head!.value;
    }
}

type Node<T> = {
    value: T;
    next: Node<T> | null;
};
