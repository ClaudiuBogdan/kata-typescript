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
    const parsedStr = str
        .split("")
        .map((char) => char.toLowerCase())
        .filter((char) => char.match(/[a-z]/));
    for (let i = 0; i < parsedStr.length / 2; i++) {
        if (parsedStr[i] !== parsedStr[parsedStr.length - i - 1]) {
            return false;
        }
    }
    return true;
}
