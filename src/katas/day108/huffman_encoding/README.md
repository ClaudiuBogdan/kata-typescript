# Huffman coding

## Problem Description

Huffman coding is a lossless data compression algorithm used to minimize the average length of characters in a given data set. Given an input string (or a stream of data), the algorithm aims to encode the string in a way that uses fewer bits than the original string representation.

## Problem Requirements

1. **Input**: A string \( S \) consisting of \( n \) characters \( s_1, s_2, \ldots, s_n \).
2. **Frequency Counts**: A frequency table \( F \) where \( F[s_i] \) represents the number of occurrences of the character \( s_i \) in the input string \( S \).
3. **Output**: An encoded string using Huffman coding, along with a mapping that can decode the string back to its original form.

## Constraints

-   Lossless Compression: The encoded string should be decodable back to the original string.
-   Optimal Compression: The average length of the encoded characters should be minimized.

## Type of Algorithm

This problem can be efficiently solved using a greedy algorithm.

## Algorithm Steps

1. **Build Frequency Table**: Create a frequency table that counts the occurrences of each unique character in the input string.
2. **Priority Queue**: Initialize a priority queue (min-heap) and insert all characters of the input string along with their frequencies. The priority queue is sorted by frequency.
3. **Build Huffman Tree**:

-   While the size of the priority queue is greater than 1:
    1. Remove the two nodes with the lowest frequencies from the priority queue.
    2. Create a new node with a frequency equal to the sum of the frequencies of the two nodes.
    3. Add the new node back into the priority queue.
-   The remaining node is the root of the Huffman tree.

4. **Generate Codes**: Traverse the Huffman tree to generate a unique binary code for each character. The traversal is such that moving to the left child adds a "0" and moving to the right child adds a "1" to the code.
5. **Encode**: Use the generated codes to encode the input string.
6. **Decode**: Use the Huffman tree to decode the encoded string back to the original string.

## Implementation

Implementing the Huffman coding algorithm in a functional programming style will make it easier to write unit tests and maintain the code. Here's how you can implement it in TypeScript:

First, let's define some type aliases and data structures:

```typescript
type FrequencyTable = Record<string, number>;
type HuffmanNode = LeafNode | InternalNode;

interface LeafNode {
    type: "Leaf";
    character: string;
    frequency: number;
}

interface InternalNode {
    type: "Internal";
    frequency: number;
    left: HuffmanNode;
    right: HuffmanNode;
}

type HuffmanCode = Record<string, string>;
```

### Build Frequency Table

```typescript
const buildFrequencyTable = (input: string): FrequencyTable => {
    return [...input].reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {} as FrequencyTable);
};
```

### Initialize Priority Queue

You can use a package like `tinyqueue` for a simple priority queue or implement one yourself. The priority queue should be sorted based on the frequency.

```typescript
import TinyQueue from "tinyqueue";

const initPriorityQueue = (
    frequencyTable: FrequencyTable,
): TinyQueue<HuffmanNode> => {
    const queue = new TinyQueue<HuffmanNode>(
        [],
        (a, b) => a.frequency - b.frequency,
    );
    for (const [character, frequency] of Object.entries(frequencyTable)) {
        queue.push({ type: "Leaf", character, frequency });
    }
    return queue;
};
```

### Build Huffman Tree

```typescript
const buildHuffmanTree = (queue: TinyQueue<HuffmanNode>): HuffmanNode => {
    while (queue.length > 1) {
        const left = queue.pop()!;
        const right = queue.pop()!;
        const internalNode: InternalNode = {
            type: "Internal",
            frequency: left.frequency + right.frequency,
            left,
            right,
        };
        queue.push(internalNode);
    }
    return queue.pop()!;
};
```

### Generate Huffman Codes

```typescript
const generateHuffmanCodes = (
    root: HuffmanNode,
    prefix: string = "",
): HuffmanCode => {
    if (root.type === "Leaf") {
        return { [root.character]: prefix };
    }

    return {
        ...generateHuffmanCodes(root.left, prefix + "0"),
        ...generateHuffmanCodes(root.right, prefix + "1"),
    };
};
```

### Encode & Decode

```typescript
const encode = (input: string, huffmanCode: HuffmanCode): string => {
    return [...input].map((char) => huffmanCode[char]).join("");
};

const decode = (encoded: string, root: HuffmanNode): string => {
    let node: HuffmanNode = root;
    let output = "";
    for (const bit of encoded) {
        node = bit === "0" ? node.left : node.right;
        if (node.type === "Leaf") {
            output += node.character;
            node = root;
        }
    }
    return output;
};
```

### Putting it all together

```typescript
const huffmanCoding = (input: string): [string, HuffmanNode, HuffmanCode] => {
    const frequencyTable = buildFrequencyTable(input);
    const priorityQueue = initPriorityQueue(frequencyTable);
    const huffmanTree = buildHuffmanTree(priorityQueue);
    const huffmanCode = generateHuffmanCodes(huffmanTree);
    const encoded = encode(input, huffmanCode);
    return [encoded, huffmanTree, huffmanCode];
};
```

This implementation is already functional in style, making it easier to write unit tests for each function.

## Time Complexity

## References

-   [Youtube](https://www.youtube.com/watch?v=co4_ahEDCho)
-   [ChatGPT](https://chat.openai.com/c/e4360344-ed81-4912-8109-ef561158b4f1)
