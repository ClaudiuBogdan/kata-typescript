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
    const parse = (str: string) => str.split("").filter(char => char.match(/[a-z]/i)).map(char => char.toLowerCase())
    const string1 = parse(str1)
    const string2 = parse(str2)

    const freq = new Map();
    for(const char of string1){
        const count = freq.get(char) ?? 0;
        freq.set(char, count + 1);
    }
    for(const char of string2){
        const count = freq.get(char) ?? 0;
        if(count === 0){
            return false
        }
        freq.set(char, count - 1)
    }
    return true;
}
