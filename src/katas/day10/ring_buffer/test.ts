import RingBuffer from "./index";

test("RingBuffer", function () {
    const buffer: IRingBuffer<number> = new RingBuffer<number>(3);

    buffer.enqueue(1)
    buffer.enqueue(1)
    buffer.enqueue(1)
    expect(buffer.isFull()).toBe(true)
    buffer.dequeue()
    buffer.dequeue()
    buffer.dequeue()
    expect(buffer.isEmpty()).toBe(true)

    buffer.enqueue(5);
    expect(buffer.dequeue()).toEqual(5);
    expect(buffer.dequeue()).toEqual(undefined);

    buffer.enqueue(42);
    buffer.enqueue(9);
    expect(buffer.isEmpty()).toEqual(false);
    expect(buffer.dequeue()).toEqual(42);
    expect(buffer.dequeue()).toEqual(9);
    expect(buffer.dequeue()).toEqual(undefined);
    expect(buffer.isEmpty()).toEqual(true);

    buffer.enqueue(42);
    expect(buffer.peak()).toEqual(42);
    expect(buffer.dequeue()).toEqual(42);

    expect(buffer.isEmpty()).toEqual(true);
    expect(buffer.isFull()).toEqual(false);
    buffer.enqueue(43);
    buffer.enqueue(44);
    buffer.enqueue(45);
    expect(buffer.isFull()).toEqual(true);
});
