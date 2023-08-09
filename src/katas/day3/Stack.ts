type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class Stack<T> {
    private _length: number;
    private _tail?: Node<T>;
    private _head?: Node<T>;

    public get length() {
        return this._length;
    }
    constructor() {
        this._length = 0;
        this._head = undefined;
        this._tail = undefined;
    }

    push(item: T): void {
        const node = this.createNode(item);
        if (this.length === 0) {
            this._head = node;
            this._tail = node;
        } else {
            this.linkNodes(this._tail, node);
            this._tail = node;
        }
        this._length++;
    }
    pop(): T | undefined {
        const node = this._tail;
        if (!node) {
            return undefined;
        }
        if (this.length === 1) {
            this._head = undefined;
            this._tail = undefined;
        } else {
            this._tail = node.prev;
            this.linkNodes(this._tail, undefined);
        }
        this._length--;
        return node.value;
    }
    peek(): T | undefined {
        return this._tail?.value;
    }

    private createNode(value: T, next?: Node<T>, prev?: Node<T>): Node<T> {
        return {
            value,
            next,
            prev,
        };
    }

    private linkNodes(nodeA?: Node<T>, nodeB?: Node<T>): void {
        if (nodeA) {
            nodeA.next = nodeB;
        }
        if (nodeB) {
            nodeB.prev = nodeA;
        }
    }
}
