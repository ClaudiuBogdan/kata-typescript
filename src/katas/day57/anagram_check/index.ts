/**
 * Checks if two given strings are anagrams of each other.
 *
 * @param {string} str1 - The first string to check.
 * @param {string} str2 - The second string to check.
 * @returns {boolean} True if the strings are anagrams, otherwise false.
 *
 * @example
 * areAnagrams("listen", "silent");  // returns true
 * areAnagrams("triangle", "integral");  // returns true
 * areAnagrams("hello", "world");  // returns false
 */
export function areAnagrams(str1: string, str2: string): boolean {
    const parse = (str: string): string[] =>
        str
            .split("")
            .map((char) => char.toLowerCase())
            .filter((char) => char.match(/[a-z]/));
    const input1 = parse(str1);
    const input2 = parse(str2);

    const freqMap = new Map<string, number>();

    for (const char of input1) {
        const count = freqMap.get(char) ?? 0;
        freqMap.set(char, count + 1);
    }

    for (const char of input2) {
        const count = freqMap.get(char) ?? 0;
        freqMap.set(char, count - 1);
    }

    for (const count of freqMap.values()) {
        if (count !== 0) {
            return false;
        }
    }
    return true;
}
