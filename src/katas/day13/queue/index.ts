export default class Queue<T> {
    private _head: ListNode<T> | undefined;
    private _tail: ListNode<T> | undefined;
    private _length: number;

    public get length(): number {
        return this._length;
    }

    constructor() {
        this._length = 0;
        this._head = undefined;
        this._tail = undefined;
    }

    enqueue(item: T): void {
        const node = this.createNode(item);
        if (this.length === 0) {
            this._head = node;
        }
        const oldTail = this._tail;
        this._tail = node;
        this.linkNodes(oldTail, this._tail);
        this._length++;
    }
    deque(): T | undefined {
        if (this.length === 0) {
            return undefined;
        }
        const oldHead = this._head;
        this._head = oldHead?.next;
        this.linkNodes(undefined, this._head);

        if (this.length === 1) {
            this._tail = this._head;
        }
        this._length--;
        return oldHead?.value
    }
    peek(): T | undefined {
        return this._head?.value
    }

    private createNode(value: T): ListNode<T> {
        return {
            value,
        };
    }

    private linkNodes(nodeA?: ListNode<T>, nodeB?: ListNode<T>): void {
        if (nodeA) {
            nodeA.next = nodeB;
        }
        if (nodeB) {
            nodeB.prev = nodeA;
        }
    }
}
