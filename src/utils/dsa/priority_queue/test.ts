import { PriorityQueue } from "./index";

describe("PriorityQueue", () => {
    let pq: PriorityQueue<number>;

    // Comparator function for numbers (ascending)
    const numberComparator = (a: number, b: number) => a - b;

    beforeEach(() => {
        pq = new PriorityQueue<number>(numberComparator);
    });

    test("should have size 0 when initialized", () => {
        expect(pq.size).toBe(0);
    });

    test("should enqueue items and maintain priority", () => {
        pq.enqueue(3);
        pq.enqueue(1);
        pq.enqueue(4);
        pq.enqueue(2);
        expect(pq.size).toBe(4);
        expect(pq.dequeue()).toBe(1);
        expect(pq.dequeue()).toBe(2);
        expect(pq.dequeue()).toBe(3);
        expect(pq.dequeue()).toBe(4);
    });

    test("should dequeue items in priority order", () => {
        pq.enqueue(5);
        pq.enqueue(1);
        expect(pq.dequeue()).toBe(1);
        expect(pq.dequeue()).toBe(5);
        expect(pq.dequeue()).toBeUndefined();
    });

    test("should handle enqueue and dequeue operations together", () => {
        pq.enqueue(1);
        pq.enqueue(2);
        pq.dequeue();
        pq.enqueue(3);
        expect(pq.dequeue()).toBe(2);
        expect(pq.dequeue()).toBe(3);
    });

    test("should return undefined if dequeue is called on an empty queue", () => {
        expect(pq.dequeue()).toBeUndefined();
    });
});
