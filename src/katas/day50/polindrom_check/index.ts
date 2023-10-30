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
    const myString = str
        .split("")
        .map((char) => char.toLowerCase())
        .filter((char) => char.match(/[a-z]/));
    for (let i = 0; i <= Math.floor(myString.length / 2); i++) {
        if (myString[i] !== myString[myString.length - i - 1]) {
            return false;
        }
    }
    return true;
}
