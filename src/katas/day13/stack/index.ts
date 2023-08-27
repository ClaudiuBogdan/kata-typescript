export default class Stack<T> {
    private _head: ListNode<T> | undefined;
    private _length: number;

    public get length(): number {
        return this._length;
    }

    constructor() {
        this._length = 0;
        this._head = undefined;
    }

    push(item: T): void {
        const node = this.createNode(item);
        this.linkNodes(node, this._head);
        this._head = node;
        this._length++;
    }
    pop(): T | undefined {
        if(this.length === 0){
            return undefined
        }
        const oldHead = this._head
        this._head = this._head?.next
        this.linkNodes(undefined, this._head)
        this._length--
        return oldHead?.value
    }
    peek(): T | undefined {
        return this._head?.value
    }

    private linkNodes(nodeA?: ListNode<T>, nodeB?: ListNode<T>): void {
        if (nodeA) {
            nodeA.next = nodeB;
        }
        if (nodeB) {
            nodeB.prev = nodeA;
        }
    }

    private createNode(value: T): ListNode<T> {
        return {
            value,
        };
    }
}
