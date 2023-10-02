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
    const freq = new Map<string, number>();
    for (let char of str1) {
        char = char.toLowerCase();
        if (!char.match(/[a-z]/i)) {
            continue;
        }
        const prevVal = freq.get(char) ?? 0;
        freq.set(char, prevVal + 1);
    }
    for (let char of str2) {
        char = char.toLowerCase();
        if (!char.match(/[a-z]/i)) {
            continue;
        }
        const prevVal = freq.get(char) ?? 0;
        if (prevVal <= 0) {
            return false;
        }
        freq.set(char, prevVal - 1);
    }
    return true;
}
