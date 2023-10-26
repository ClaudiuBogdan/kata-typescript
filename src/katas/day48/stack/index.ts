export default class Stack<T> {
    private _length: number;
    private _head: Node<T> | null;

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
            prev: this._head,
        };

        this._head = node;
        this._length++;
        return;
    }

    pop(): T | undefined {
        if (this.length === 0) {
            return;
        }
        const oldHead = this._head!;
        this._head = oldHead.prev;
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
};
