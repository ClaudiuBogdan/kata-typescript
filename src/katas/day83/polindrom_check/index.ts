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
  const str1 = str
      .split("")
      .map((char) => char.toLowerCase())
      .filter((char) => char.match(/[a-z]/));
  for (let i = 0; i < str1.length / 2; i++) {
      if (str1[i] !== str1[str1.length - i - 1]) {
          return false;
      }
  }
  return true;
}
