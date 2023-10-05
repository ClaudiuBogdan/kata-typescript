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
    const string1 = str1
        .split("")
        .filter((char) => char.match(/[a-z]/i))
        .map((char) => char.toLowerCase());
    const string2 = str2
        .split("")
        .filter((char) => char.match(/[a-z]/i))
        .map((char) => char.toLowerCase());
    const freq = new Map();
    for (let char of string1) {
        const count = freq.get(char) ?? 0;
        freq.set(char, count + 1);
    }
    for (let char of string2) {
        const count = freq.get(char) ?? 0;
        if (count === 0) {
            return false;
        }
        freq.set(char, count - 1);
    }
    return true;
}
