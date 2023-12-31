/**
 * @module BTPreOrder
 * @param {BinaryNode<number>} root
 * @returns {number[]}
 * @description Given the root of a binary tree, return the preorder traversal of its nodes' values. The root node is visited before the left and right subtrees.
 * @see https://www.geeksforgeeks.org/preorder-traversal-of-binary-tree/
 */

const BTPreOrder = (root: BinaryNode<number>): number[] => {
  const path: number[] = []
  
  const travers = (root: BinaryNode<number> | null): void => {
    if(!root){
      return
    }
    path.push(root.value)
    travers(root.left)
    travers(root.right)
  }
  travers(root)
  return path
};

export default BTPreOrder;
