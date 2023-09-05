
export default class Queue<T> {
    private _head: ListNode<T> | undefined;
    private _tail: ListNode<T> | undefined;
    private _length: number;

    public get length(): number {
        return this._length;
    }

    constructor() {
        this._head = undefined;
        this._tail = undefined;
        this._length = 0;
    }

    enqueue(item: T): void {
        const node = this.createNode(item);
        this.linkNodes(this._tail, node);
        this._tail = node;
        if (this.length === 0) {
            this._head = node;
        }
        this._length++;
    }
    deque(): T | undefined {
        if (this.length === 0) {
            return undefined;
        }
        const node = this._head;
        this._head = this._head?.next;

        if (this.length === 1) {
            this._head = undefined;
            this._tail = undefined;
        }
        this._length--;
        return node?.value;
    }
    peek(): T | undefined {
        return this._head?.value;
    }

    private createNode(item: T): ListNode<T> {
        return {
            value: item,
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
