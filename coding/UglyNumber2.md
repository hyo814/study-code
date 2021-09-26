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


- 기타 관련 사이트 :
- https://velog.io/@cada/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%ED%9E%99-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
- https://velog.io/@longroadhome/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-JS%EB%A1%9C-%EA%B5%AC%ED%98%84%ED%95%98%EB%8A%94-HEAP


### 문제 풀이
ugly nubers란 못생긴 숫자라고 번역이 되면서 2,3,5라는 소인수로만 이루어진 수를 말 합니다.
이때 인수란 어떤 수의 몇 개의 수의 곱으로 표현 할때 , 그 구성식의 각 요소들을 이야기 합니다.
약수로 처음에 비교분석을 하여 예제에 대해 알아보았습니다.
만약 12라는 숫자가 있다라면 약수는 1, 2, 3, 4, 6, 12 를 가지고 있을 것입니다.
이때 이 약수들 중에 소수인 인수들을 소인수라고 합니다.
우선 예제 1번을 보게 되면 입력은 10이며 출력은 12 입니다.10번째 ugly number는 12라는 뜻입니다.  
예상되는 값으로는 1, 2, 3, 4, 5, 6, 8, 9, 10, 12는 처음 10개의 못생긴 숫자의 시퀀스 이기 때문입니다.  
다시 말해서 2, 3 ,5 로만 인자가 이루어진 수를 ugly number라고 말합니다.

에제 2번의 경우 1은 초기의 ugly number 이기 떄문에 해당 됩니다.  
사유: 1에는 소인수가 없으므로 모든 소인수는 2, 3, 5로 제한됩니다.

``` md
- 자세하게 예제 1번을 보게 된다면 이렇게 됩니다.

1 일때, 1 * 1   
2 일때, 1 * 2  
3 일때, 1 * 3  
4 일때, 2 * 2  
5 일때, 1 * 5  
6 일때, 2 * 3  
7 일때, 해당 없음  
8 일때, 2 * 2 * 2  
9 일때, 3 * 3  
10 일때, 2 * 5  
11 일때, 해당 없음  
12 일때, 2 * 2 * 3

따라서 10번째 ugly number는 12라는 값이 나옵니다.
```


### (풀이) 주석(ㅇ)
```js
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
// 예제 2번에 의하여 1보다 작은 부분에서는 약수도 소인수도 나올 수가 없기 때문에 0으로 해결
  if (n < 1) return 0;

// 예제 2번에 의하여 1의 경우에는  1에는 소인수가 없으므로 모든 소인수는 2, 3, 5로 제한된다고 하니 포함할 것
  const uglyNumber = [1];
// uglyNumbers에 uglyNumbers 를 이루는 소인수, 즉 2, 3, 5를 곱해서 그 결과가 추가되었다면 다음 uglyNumbers에도 소인수인 2 , 3, 5를 곱해야 합니다.
  let ugly2 = 0;
  let ugly3 = 0;
  let ugly5 = 0;

  for (let i = 1; i < n; i++) {
  // 이미 다음 숫자로 넘어가서 소인수를 곱한 수와, 기존에 아직 곱하지 못한 소인수가 남아있는 경우를 대조해서, 더 작은 것을 먼저 배열에 추가해주어야 한다.
  // 에제 : 3 * 5 = 5 * 3 = 15를 의미 할때 작은 것이 먼저 시작 되어 중복이 없도록 유도
    uglyNumber[i] = Math.min(uglyNumber[ugly2] * 2, uglyNumber[ugly3] * 3, uglyNumber[ugly5] * 5);
    if(uglyNumber[i] === uglyNumber[ugly2]*2) ugly2++; 
    if(uglyNumber[i] === uglyNumber[ugly3]*3) ugly3++;
    if(uglyNumber[i] === uglyNumber[ugly5]*5) ugly5++;
  }

  return uglyNumber[n - 1];
};
```   
