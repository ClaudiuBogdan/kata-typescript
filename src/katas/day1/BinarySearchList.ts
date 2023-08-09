export default function bs_list(haystack: number[], needle: number): boolean {
  return recursive_binary_search(haystack, 0, haystack.length - 1, needle) }

function recursive_binary_search(arr: number[], leftIndex: number, rightIndex: number, value: number): boolean{
  if(leftIndex > rightIndex){
    return false
  }
  const middleIndex = leftIndex + Math.floor((rightIndex - leftIndex)/2)
  if(arr[middleIndex] === value){
    return true
  }
  if(arr[middleIndex] > value){
    return recursive_binary_search(arr, leftIndex, middleIndex - 1, value)
  }
  else{
    return recursive_binary_search(arr, middleIndex + 1, rightIndex, value)
  }
}