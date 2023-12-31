declare type Point = {
    x: number;
    y: number;
};

declare type ListNode<T> = {
    value: T;
    next?: ListNode<T>;
    prev?: ListNode<T>;
};

declare interface List<T> {
    get length(): number;
    removeAt(index: number): T | undefined;
    remove(item: T): T | undefined;
    get(index: number): T | undefined;
    prepend(item: T): void;
    append(item: T): void;
    insertAt(item: T, idx: number): void;
}

declare type CompleteGraphEdge = { from: number; to: number; weight: number };
declare type GraphEdge = { to: number; weight: number };
declare type WeightedAdjacencyList = GraphEdge[][];
declare type WeightedAdjacencyMatrix = number[][]; // A number means weight

declare type AdjacencyList = number[][];
declare type AdjacencyMatrix = number[][]; // A 1 means connected

declare type BinaryNode<T> = {
    value: T;
    left: BinaryNode<T> | null;
    right: BinaryNode<T> | null;
};

declare type GeneralNode<T> = {
    value: T;
    children: GeneralNode<T>[];
};

declare interface ILRU<K, V> {
    update(key: K, value: V): void;
    get(key: K): V | undefined;
}

declare interface IRingBuffer<T> {
    enqueue(item: T): void; // Adds an item to the buffer
    dequeue(): T | undefined; // Removes and returns the oldest item from the buffer
    peak(): T | undefined; // View the element at the head position without removing it.
    isFull(): boolean; // Checks if the buffer is full
    isEmpty(): boolean; // Checks if the buffer is empty
}

declare type TemplateMetaData = {
    id: string;
    name: string;
    category: string;
    difficulty: TemplatesDifficulty;
    disabled?: boolean;
    startTime?: Date;
    endTime?: Date;
};

declare type TemplatesDifficulty =
    | "easy"
    | "medium"
    | "hard"
    | "very hard"
    | "expert";

declare type FrequencyTable = Map<string, number>;
declare type HuffmanNode = LeafNode | InternalNode;

declare interface LeafNode {
    type: "Leaf";
    character: string;
    frequency: number;
}

declare interface InternalNode {
    type: "Internal";
    frequency: number;
    left: HuffmanNode;
    right: HuffmanNode;
}

declare type HuffmanCode = Record<string, string>;
