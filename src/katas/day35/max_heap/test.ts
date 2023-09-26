import MaxHeap from "./index";

test("max heap", function () {
    const heap = new MaxHeap<number>();

    expect(heap.size).toEqual(0);

    heap.insert(5);
    heap.insert(3);
    heap.insert(69);
    heap.insert(420);
    heap.insert(4);
    heap.insert(1);
    heap.insert(8);
    heap.insert(7);

    expect(heap.size).toEqual(8);
    expect(heap.peek()).toEqual(420);
    expect(heap.pop()).toEqual(420);
    expect(heap.size).toEqual(7);
    expect(heap.peek()).toEqual(69);
    expect(heap.pop()).toEqual(69);
    expect(heap.size).toEqual(6);
    expect(heap.peek()).toEqual(8);
    expect(heap.pop()).toEqual(8);
    expect(heap.size).toEqual(5);
    expect(heap.peek()).toEqual(7);
    expect(heap.pop()).toEqual(7);
    expect(heap.size).toEqual(4);
    expect(heap.peek()).toEqual(5);
    expect(heap.pop()).toEqual(5);
    expect(heap.size).toEqual(3);
    expect(heap.peek()).toEqual(4);
    expect(heap.pop()).toEqual(4);
    expect(heap.size).toEqual(2);
    expect(heap.peek()).toEqual(3);
    expect(heap.pop()).toEqual(3);
    expect(heap.size).toEqual(1);
    expect(heap.peek()).toEqual(1);
    expect(heap.pop()).toEqual(1);
    expect(heap.size).toEqual(0);
    expect(heap.peek()).toEqual(undefined);
    expect(heap.pop()).toEqual(undefined);
    expect(heap.size).toEqual(0);
});
