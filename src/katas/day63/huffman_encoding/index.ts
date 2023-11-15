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

    const freq = getFrequencyTable(input);
    const queue = getPriorityQueue(freq);
    const tree = getHuffmanTree(queue);
    const code = getHuffmanCode(tree);
    const encoded = encode(code, input);
    return [encoded, tree, code];
};

function getFrequencyTable(input: string): Map<string, number> {
    const freq = new Map<string, number>();
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
        (nodeA, nodeB) => nodeA.frequency - nodeB.frequency,
    );
    for (const [character, frequency] of freq.entries()) {
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
        const node: InternalNode = {
            type: "Internal",
            frequency: left.frequency + right.frequency,
            left,
            right,
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
