/**
 * Calculates the Fibonacci number at a given position in the Fibonacci sequence.
 *
 * @param {number} n - The position in the Fibonacci sequence for which to calculate the Fibonacci number. Must be a non-negative integer.
 * @returns {number} The Fibonacci number at the given position.
 * @throws {Error} Throws an error if the input is a negative number.
 *
 * @example
 * fibonacci(0);  // returns 0
 * fibonacci(1);  // returns 1
 * fibonacci(10);  // returns 55
 */
export default function fibonacci(n: number): number {
    if(n < 0){
        throw new Error("Negative numbers are not supported");
        
    }
    if(n === 0 || n === 1){
        return n
    }
    return fibonacci(n - 1) + fibonacci( n - 2)
}
