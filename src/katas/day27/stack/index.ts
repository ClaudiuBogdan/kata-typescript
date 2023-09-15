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

        const tail = this._tail as ListNode<T>;
        this._tail = tail.prev;
        tail.prev = undefined;
        if (this._tail) {
            this._tail.next = undefined;
        }
        this._length--;
        return tail.value;
    }

    peek(): T | undefined {
        return this._tail?.value;
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
