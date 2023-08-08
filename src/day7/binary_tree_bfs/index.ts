/**
 * @function breadthFirstSearch - Breadth First Search in a binary tree
 * @description Given a binary tree and a target value, return true if the target is found in the binary tree.
 * @description Level Order Traversal technique is defined as a method to traverse a Tree such that all nodes present in the same level are traversed completely before traversing the next level.
 * @link https://www.geeksforgeeks.org/level-order-tree-traversal/
 * @param head
 * @param target
 * @returns {boolean}
 */
export default function breadthFirstSearch(
    head: BinaryNode<number>,
    target: number,
): boolean {
    const queue = new Queue(head);
    return bfs(queue, target);
}

function bfs<T>(q: Queue<BinaryNode<T>>, target: T): boolean {
    const node = q.deque();

    if (!node) {
        return false;
    }
    if (node.value === target) {
        return true;
    }
    if (node.left) {
        q.enqueue(node.left);
    }
    if (node.right) {
        q.enqueue(node.right);
    }
    return bfs(q, target);
}

type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};
class Queue<T> {
    private _length: number;
    private _head: Node<T> | undefined;
    private _tail: Node<T> | undefined;

    public get length() {
        return this._length;
    }

    constructor(item: T) {
        this._length = 0;
        this._head = undefined;
        this._tail = undefined;

        if (item) {
            this.enqueue(item);
        }
    }

    public enqueue(item: T): number {
        const node = this.createNode(item);

        if (this._tail === undefined) {
            this._head = node;
            this._tail = node;
        } else {
            this.linkNodes(this._tail, node);
            this._tail = node;
        }
        this._length++;
        return this.length;
    }

    public deque(): T | undefined {
        const head = this._head;
        if (!head) {
            return undefined;
        }

        this.linkNodes(undefined, head.next);
        this._head = head.next;

        if (this._head === undefined) {
            this._tail = undefined;
        }

        this._length--;
        return head.value;
    }

    private createNode(item: T): Node<T> {
        return {
            value: item,
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
