<a href="https://leetcode.com/tag/linked-list/">전체 링크드 리스트 문제 </a>  
<a href="https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/">참고해야할 사이트</a>   

## (영어)
Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.
- The number of nodes in the list is in the range [0, 300].
- -100 <= Node.val <= 100
- The list is guaranteed to be sorted in ascending order.

<a href='https://ifh.cc/v-Si1jIf.7TL5L6' target='_blank'><img src='https://ifh.cc/g/Si1jIf.png' border='0'></a>
<a href='https://ifh.cc/v-Si1jIf.7TL5L6' target='_blank'><img src='https://ifh.cc/g/7TL5L6.png' border='0'></a>

## (해석)
돌아 가기 링크 된 목록을 분류 뿐만 아니라 head정렬된 연결 목록이 주어지면 각 요소가 한 번만 나타나도록 모든 중복 항목을 삭제합니다.  
예제가 바뀐 부분을 고려하여 처음부터 문제를 예시로 푼다면 이렇습니다.  
입력 값에서 1 , 1 , 2 가 되었다면 1,1 에서 중복이 되어서 삭제가 되고 1,2라는 출력값을 나타냅니다.  
다른 예제로는 입력한 값이 1, 1, 2, 3 , 3 이라면 1과 3에서 1,1 그리고 3,3 으로 중복이 되어 삭제가 되며 최종적으로는 출력값이 1,2,3으로 나타나 집니다.  
이러한 방법으로 문제를 풀어보고자 합니다.  

## (풀이) 주석(ㅇ)
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let deleteDuplicates = function (head) {
    // 정렬된 링크 리스트의 헤드가 주어졌을 때
  let present = head;
    // null 값이 아닌 while문 동안
  while (present!== null && present.next !== null) {
      // 1. next 란? 다음 요소를 선택할 수 있도록 유도 합니다.
      // 2. val 란? 일치하는 첫 번째 요소의 value 속성 내용을 가져 옵니다.
      // 3. 추가 설명 : .val()입력 요소 (또는 값 속성이있는 모든 요소)에서
      //  .text()작동하며 입력 요소에서는 작동하지 않습니다. 
      //  .val()유형에 관계없이 입력 요소의 값을 가져옵니다. 
      //  .text()일치하는 모든 요소의 innerText (HTML이 아님)를 가져옵니다.
    if (present.val === present.next.val) {
        // 같다면 ? 삭제를 하게 될 것이고 아니면 다음으로 이동합니다.
      present.next = present.next.next;
    } else {
      present = present.next;
    }
  }

  return head;
};
```

