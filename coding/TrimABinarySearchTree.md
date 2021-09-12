<a href="https://leetcode.com/tag/tree/">전체 트리 문제 </a>  
<a href="https://leetcode.com/problems/trim-a-binary-search-tree/submissions/">참고해야할 사이트</a>   

## (영어)
Given the root of a binary search tree and the lowest and highest boundaries as low and high, trim the tree so that all its elements lies in [low, high]. Trimming the tree should not change the relative structure of the elements that will remain in the tree (i.e., any node's descendant should remain a descendant). It can be proven that there is a unique answer.

Return the root of the trimmed binary search tree. Note that the root may change depending on the given bounds.

## (풀이) 주석(ㅇ)
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
var trimBST = function(root, low, high) {
    if (!root) return root // root 권한이 아닐 때
    // .val()입력 요소 (또는 값 속성이있는 모든 요소)에서 .text()작동하며 입력 요소에서는 작동하지 않습니다. .val()유형에 관계없이 입력 요소의 값을 가져옵니다. .text()일치하는 모든 요소의 innerText (HTML이 아님)를 가져옵니다.
    // 조건문
    if (root.val < low) return trimBST(root.right,low, high)
    else if (root.val > high) return trimBST(root.left,low, high)
    //trimBST
    root.left = trimBST(root.left,low, high) 
    root.right = trimBST(root.right,low, high)
    // return
    return root
};
```

