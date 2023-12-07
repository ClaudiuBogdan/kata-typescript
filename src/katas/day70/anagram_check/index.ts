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
    const parse = (str: string) =>
        str
            .split("")
            .map((char) => char.toLowerCase())
            .filter((char) => char.match(/[a-z]/));
    const parsedStr1 = parse(str1);
    const parsedStr2 = parse(str2);
    const freq = new Map<string, number>();
    for (let char of parsedStr1) {
        const count = freq.get(char) ?? 0;
        freq.set(char, count + 1);
    }
    for (let char of parsedStr2) {
        const count = freq.get(char) ?? 0;
        freq.set(char, count - 1);
    }
    for (let count of freq.values()) {
        if (count !== 0) {
            return false;
        }
    }
    return true;
}
