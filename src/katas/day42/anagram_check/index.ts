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
            .map((ch) => ch.toLowerCase())
            .filter((ch) => ch.match(/[a-z]/));

    const input1 = parse(str1);
    const input2 = parse(str2);
    const freq = input1.reduce((freq, char) => {
        const count = freq.get(char) ?? 0;
        freq.set(char, count + 1);
        return freq;
    }, new Map());

    return input2.reduce((isAnagram, char) => {
        if (!isAnagram) {
            return false;
        }
        const count = freq.get(char) ?? 0;
        freq.set(char, count - 1);
        return count >= 1;
    }, true);
}
