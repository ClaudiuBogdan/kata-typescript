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
export function isPalindrome(inputStr: string): boolean {
    const stack: string[] = [];
    const str = inputStr.split("").filter(char => char.match(/[a-z]/i)).map(char => char.toLowerCase())
    for (let i = 0; i < Math.floor(str.length / 2); i++) {
        const tailIndex = str.length - i - 1;
        if (str[i] !== str[tailIndex]) {
            return false;
        }
    }
    return true;
}
