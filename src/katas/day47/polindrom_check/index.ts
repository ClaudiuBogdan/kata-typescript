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
    const input = str
        .split("")
        .filter((char) => char.match(/[a-z]/i))
        .map((char) => char.toLowerCase());

    for (let i = 0; i < input.length / 2; i++) {
        if (input[i] !== input[input.length - i - 1]) {
            return false;
        }
    }
    return true;
}
