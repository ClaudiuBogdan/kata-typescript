export default class Stack<T> {
    private _head: Node<T> | null;
    private _length: number;
    public get length(): number {
        return this._length;
    }

    constructor() {
        this._head = null;
        this._length = 0;
    }

    push(item: T): void {
        const node: Node<T> = {
            value: item,
            next: this._head,
        };
        this._head = node;
        this._length++;
    }

    pop(): T | undefined {
        if (this._length === 0) {
            return;
        }
        const oldHead = this._head!;
        this._head = oldHead.next;
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
    next: Node<T> | null;
};
