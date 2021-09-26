<a href="https://leetcode.com/tag/heap/">힙 전체1</a>    
<a href="https://leetcode.com/tag/heap-priority-queue/">힙 전체2</a>   
<a href="https://leetcode.com/problems/ugly-number-ii/description/">참고해야할 사이트</a>      


## (영어)
An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.
Given an integer n, return the nth ugly number.


<a href='https://ifh.cc/v-70gv4p' target='_blank'><img src='https://ifh.cc/g/70gv4p.png' border='0'></a>


## (해석)
- 자바스크립트로 구현하는 자료구조 heap
- 우선 순위를 매겨서 항상 최우선의 우선 순위를 가진 자료를 가져 올 수 있는 자료구조가 heap이라고 합니다.
1. 힙은 최대 힙과 최소 힙으로 구분 될 수 있습니다.
2. 최대 힙은 모든 부모 노드의 값이 자식 노드의 값보다 큰 힙을 말하고, 최소 힙은 그 반대입니다.
3. 힙은 완전이진트리이기 때문에 배열로 쉽게 구현할 수 있습니다.
삽입과 삭제의 시간 복잡도는 : O(logN)


- 기타 관련 사이트 :
- https://velog.io/@cada/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%ED%9E%99-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
- https://velog.io/@longroadhome/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-JS%EB%A1%9C-%EA%B5%AC%ED%98%84%ED%95%98%EB%8A%94-HEAP


### 문제 풀이
예제 1번을 보게 되면 입력은 10이며 출력은 12 입니다.  
예상되는 값으로는 1, 2, 3, 4, 5, 6, 8, 9, 10, 12는 처음 10개의 못생긴 숫자의 시퀀스 입니다.  
2, 3 ,5 로만 인자가 이루어진 수를 ugly number라고 말합니다.  
우선 1 ~ 12 까지를 비교를 해보도록 합니다.  
1, 1 * 1   
2, 1 * 2  
3, 1 * 3  
4, 2 * 2  
5, 1 * 5  
6, 2 * 3  
7, 해당 없음  
8, 2 * 2 * 2  
9, 3 * 3  
10, 2 * 5  
11, 해당 없음  
12 2 * 2 * 3  


에제 2번의 경우 1은 초기의 ugly number 이기 떄문에 해당 됩니다.  
사유: 1에는 소인수가 없으므로 모든 소인수는 2, 3, 5로 제한됩니다.  


### (풀이) 주석(ㅇ)
```js

```   
