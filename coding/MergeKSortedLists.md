<a href="https://leetcode.com/tag/linked-list/">전체 링크드 리스트 문제 </a>  
<a href="https://leetcode.com/problems/merge-k-sorted-lists/description/">참고해야할 사이트</a>    
## (영어)
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
Merge all the linked-lists into one sorted linked-list and return it.

- k == lists.length
- 0 <= k <= 10^4
- 0 <= lists[i].length <= 500
- -10^4 <= lists[i][j] <= 10^4
- lists[i] is sorted in ascending order.
- The sum of lists[i].length won't exceed 10^4.

## (해석)
<a href='https://ifh.cc/v-5SBdvu' target='_blank'><img src='https://ifh.cc/g/5SBdvu.png' border='0'></a>

## (풀이)
```js
let array = [];
let mergeKLists = function(lists) {
    //for 문을 이용
    for(let i=0; i<lists.length; i++) {
        getValue(lists[i]);
    }
    // sort 사용    
    array.sort((a,b) => b-a);
    
    let answer = new ListNode(0);
    let temp = answer;
    
    //while 문
    while(array.length > 0) {
    //new ListNode 사용
        temp.next = new ListNode(array.pop());
        temp = temp.next;
    }
    return answer.next;
};

function getValue(node) {
// node 사용
    while(node) {
        array.push(node.val);
        node = node.next;
    }
}

```
