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
    if (input === "") {
        return ["", null, {}];
    }
    const freqTable = initFrequencyTable(input);
    const priorityQueue = initPriorityQueue(freqTable);
    const tree = buildHuffmanTree(priorityQueue);
    const code = buildHuffmanCode(tree);
    const encoded = encode(code, input);
    return [encoded, tree, code];
};

function initFrequencyTable(input: string): Map<string, number> {
    const freq = new Map();
    for (const char of input) {
        const count = freq.get(char) ?? 0;
        freq.set(char, count + 1);
    }
    return freq;
}

function initPriorityQueue(
    freq: Map<string, number>,
): PriorityQueue<HuffmanNode> {
    const queue = new PriorityQueue<HuffmanNode>(
        (a, b) => a.frequency - b.frequency,
    );
    for (const [character, frequency] of freq.entries()) {
        const node: HuffmanNode = {
            type: "Leaf",
            character,
            frequency,
        };
        queue.enqueue(node);
    }
    return queue;
}

function buildHuffmanTree(queue: PriorityQueue<HuffmanNode>): HuffmanNode {
    if (queue.size === 0) {
        throw new Error("Queue is empty");
    }
    while (queue.size > 1) {
        const left = queue.dequeue()!;
        const right = queue.dequeue()!;
        const internalNode: InternalNode = {
            type: "Internal",
            frequency: left.frequency + right.frequency,
            left,
            right,
        };
        queue.enqueue(internalNode);
    }
    return queue.dequeue()!;
}

function buildHuffmanCode(root: HuffmanNode, prefix = ""): HuffmanCode {
    if (root.type === "Leaf") {
        return {
            [root.character]: prefix || "0",
        };
    }

    return {
        ...buildHuffmanCode(root.left, prefix + "0"),
        ...buildHuffmanCode(root.right, prefix + "1"),
    };
}

function encode(code: HuffmanCode, input: string): string {
    return input
        .split("")
        .map((char) => code[char])
        .join("");
}

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
    let node = root;
    let output = "";
    for (let bit of encoded) {
        if (node.type === "Internal") {
            node = bit === "0" ? node.left : node.right;
        }
        if (node.type === "Leaf") {
            output += node.character;
            node = root;
        }
    }
    return output;
};
