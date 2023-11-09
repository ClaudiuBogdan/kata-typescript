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
    // frequency
    const freq = getFrequencyTable(input);
    // priority queue
    const queue = getPriorityQueue(freq);
    // tree
    const tree = getHuffmanTree(queue);
    // code
    const code = getHuffmanCode(tree);
    // encode
    const encoded = encode(input, code);
    return [encoded, tree, code];
};

function getFrequencyTable(input: string): Map<string, number> {
    const freq = new Map();
    for (const char of input) {
        const count = freq.get(char) ?? 0;
        freq.set(char, count + 1);
    }
    return freq;
}

function getPriorityQueue(
    freq: Map<string, number>,
): PriorityQueue<HuffmanNode> {
    const queue = new PriorityQueue<HuffmanNode>(
        (a, b) => a.frequency - b.frequency,
    );
    for (const [character, frequency] of freq.entries()) {
        const node: HuffmanNode = {
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
        const node: InternalNode = {
            left,
            right,
            frequency: left.frequency + right.frequency,
            type: "Internal",
        };
        queue.enqueue(node);
    }

    return queue.dequeue()!;
}

function getHuffmanCode(root: HuffmanNode, prefix = ""): HuffmanCode {
    if (root.type === "Leaf") {
        return { [root.character]: prefix || "0" };
    }

    return {
        ...getHuffmanCode(root.left, prefix + "0"),
        ...getHuffmanCode(root.right, prefix + "1"),
    };
}

function encode(input: string, code: HuffmanCode): string {
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
    if (!root) {
        return "";
    }
    let output = "";
    let node = root;
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
};
