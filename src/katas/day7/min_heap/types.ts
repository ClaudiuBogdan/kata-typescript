export interface IHeap<T> {
  readonly size: number;
  insert(value: T): void;
  peek(): T | undefined;
  pop(): T | undefined;
}