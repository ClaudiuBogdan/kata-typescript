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
    // Handle the empty string edge case
    if (input === "") {
        return ["", null, {}];
    }
    const frequencyTable = buildFrequencyTable(input);
    const priorityQueue = initPriorityQueue(frequencyTable);
    const huffmanTree = buildHuffmanTree(priorityQueue);
    const huffmanCode = generateHuffmanCodes(huffmanTree);
    const encoded = encode(input, huffmanCode);
    return [encoded, huffmanTree, huffmanCode];
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
    let node = root;
    let output: string = "";
    for (const bit of encoded) {
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

function buildFrequencyTable(input: string): FrequencyTable {
    return input.split("").reduce((freq, char) => {
        const count = freq.get(char) ?? 0;
        freq.set(char, count + 1);
        return freq;
    }, new Map());
}

function initPriorityQueue(
    frequencyTable: FrequencyTable,
): PriorityQueue<HuffmanNode> {
    const queue = new PriorityQueue<HuffmanNode>(
        (a, b) => a.frequency - b.frequency,
    );
    for (const [character, frequency] of frequencyTable.entries()) {
        queue.enqueue({ type: "Leaf", character, frequency } as HuffmanNode);
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

function generateHuffmanCodes(
    root: HuffmanNode,
    prefix: string = "",
): HuffmanCode {
    if (root.type === "Leaf" && prefix === "") {
        return { [root.character]: "0" };
    }
    if (root.type === "Leaf") {
        return { [root.character]: prefix };
    }

    return {
        ...generateHuffmanCodes(root.left, prefix + "0"),
        ...generateHuffmanCodes(root.right, prefix + "1"),
    };
}

function encode(input: string, huffmanCode: HuffmanCode): string {
    return [...input].map((char) => huffmanCode[char]).join("");
}
