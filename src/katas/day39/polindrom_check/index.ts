/**
 * Checks if a given string is a palindrome.
 *
 * @param {string} str - The string to check.
 * @returns {boolean} True if the string is a palindrome, otherwise false.
 *
 * @example
 * isPalindrome("racecar");  // returns true
 * isPalindrome("hello");    // returns false
 */
export function isPalindrome(str: string): boolean {
    const string1 = str
        .split("")
        .filter((char) => char.match(/[a-z]/i))
        .map((char) => char.toLowerCase());
    for (let i = 0; i < string1.length; i++) {
        if (string1[i] !== string1[string1.length - i - 1]) {
            return false;
        }
    }
    return true;
}
