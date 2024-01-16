import { PriorityQueue } from "@utils/dsa/priority_queue";

/**
 * Applies Huffman coding algorithm on a given input string.
 *
 * @param {string} input - The input string to encode.
 * @returns {[string, HuffmanNode, HuffmanCode]} A tuple containing the encoded string,
 * the Huffman tree root, and the Huffman codes for each character.
 *
 * @example
 * const [encoded, huffmanTree, huffmanCode] = huffmanCoding("abracadabra");
 */
export const huffmanCoding = (
    input: string,
): [string, HuffmanNode | null, HuffmanCode] => {
    if (input.length === 0) {
        return ["", null, {}];
    }
    // Get freq map
    const freqMap = getFreqMap(input);
    // Get priority queue
    const queue = getPriorityQueue(freqMap);
    // Get tree from queue
    const tree = getHuffmanTree(queue);
    // Get code from tree
    const code = getHuffmanCode(tree);
    // Encode
    const encoded = encode(input, code);
    return [encoded, tree, code];
};

/**
 * Decodes a Huffman-encoded string back to its original form.
 *
 * @param {string} encoded - The Huffman-encoded string.
 * @param {HuffmanNode} root - The root node of the Huffman tree used for encoding.
 * @returns {string} The decoded string.
 *
 * @example
 * const decoded = decode("1010101", huffmanTree);
 */
export const decode = (encoded: string, root: HuffmanNode | null): string => {
    if (root === null) {
        return "";
    }
    // Navigate the tree until finding leaf node
    let node = root;
    let output = "";
    for (const char of encoded) {
        if (node.type === "Internal") {
            node = char === "0" ? node.left : node.right;
        }
        if (node.type === "Leaf") {
            output += node.character;
            node = root;
        }
    }
    return output;
    // Append to string until all code is decoded
};

function getFreqMap(input: string): Map<string, number> {
    const freqMap = new Map<string, number>();
    for (const char of input) {
        const count = freqMap.get(char) ?? 0;
        freqMap.set(char, count + 1);
    }
    return freqMap;
}

function getPriorityQueue(
    freqMap: Map<string, number>,
): PriorityQueue<HuffmanNode> {
    const queue = new PriorityQueue<HuffmanNode>(
        (a, b) => b.frequency - a.frequency,
    );

    for (const [character, frequency] of freqMap.entries()) {
        const node: LeafNode = {
            character,
            frequency,
            type: "Leaf",
        };
        queue.enqueue(node);
    }
    return queue;
}

function getHuffmanTree(queue: PriorityQueue<HuffmanNode>): HuffmanNode {
    while (queue.size > 1) {
        const left = queue.dequeue()!;
        const right = queue.dequeue()!;
        const internalNode: InternalNode = {
            frequency: left.frequency + right.frequency,
            type: "Internal",
            left,
            right,
        };
        queue.enqueue(internalNode);
    }
    return queue.dequeue()!;
}

function getHuffmanCode(node: HuffmanNode, prefix = ""): HuffmanCode {
    if (node.type === "Leaf") {
        return { [node.character]: prefix || "0" };
    }

    return {
        ...getHuffmanCode(node.left, prefix + "0"),
        ...getHuffmanCode(node.right, prefix + "1"),
    };
}

function encode(input: string, code: HuffmanCode): string {
    return input
        .split("")
        .map((char) => code[char])
        .join("");
}
