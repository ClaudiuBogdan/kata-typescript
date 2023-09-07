import MinHeap from "./index";

test("min heap", function () {
    const heap = new MinHeap<number>();

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
    expect(heap.pop()).toEqual(1);
    expect(heap.pop()).toEqual(3);
    expect(heap.pop()).toEqual(4);
    expect(heap.pop()).toEqual(5);
    expect(heap.size).toEqual(4);
    expect(heap.peek()).toEqual(7);
    expect(heap.pop()).toEqual(7);
    expect(heap.pop()).toEqual(8);
    expect(heap.pop()).toEqual(69);
    expect(heap.pop()).toEqual(420);
    expect(heap.size).toEqual(0);
});
