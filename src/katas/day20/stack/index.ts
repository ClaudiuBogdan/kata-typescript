export default class Stack<T> {
    private _tail: ListNode<T> | undefined;
    private _length: number;

    public get length(): number {
        return this._length;
    }

    constructor() {
        this._length = 0;
        this._tail = undefined;
    }

    push(item: T): void {
        const node = this.createNode(item);
        this.linkNodes(this._tail, node);
        this._tail = node;
        this._length++;
    }

    pop(): T | undefined {
        if (this.length === 0) {
            return;
        }
        const node = this._tail;
        this._tail = this._tail?.prev;
        this._length--;
        return node?.value;
    }
    peek(): T | undefined {
        return this._tail?.value;
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
