type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class Queue<T> {
    private _length: number;
    private _head: Node<T> | undefined;
    private _tail: Node<T> | undefined;

    public get length() {
        return this._length;
    }

    constructor() {
        this._length = 0;
        this._head = undefined;
        this._tail = undefined;
    }

    enqueue(item: T): void {
        // Add node to the end of the queue
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
    deque(): T | undefined {
        // Remove first element
        const head = this._head;
        if (!head) {
            return undefined;
        }
        this._head = head.next;
        this._length--;
        this.linkNodes(undefined, head.next);
        return head.value;
    }
    peek(): T | undefined {
        // Get first element
        return this._head?.value;
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
