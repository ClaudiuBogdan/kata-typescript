/**
 * @module BTPostOrder
 * @param {BinaryNode<number>} root
 * @returns {number[]}
 * @description Given the root of a binary tree, return the postorder traversal of its nodes' values. The root node is visited after the left and right subtrees.
 * @see https://www.geeksforgeeks.org/postorder-traversal-of-binary-tree/
 */

const BTPostOrder = (root: BinaryNode<number>): number[] => {
  const path: number[] = []
  function recursive(root: BinaryNode<number> | null): number[]{
    if(!root){
      return path
    }
    if(root.left){
      recursive(root.left)
    }
    if(root.right){
      recursive(root.right)
    }
    path.push(root.value)
    return path
  }
  return recursive(root)
};

export default BTPostOrder;
