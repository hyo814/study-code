<a href="https://leetcode.com/problems/group-anagrams/">풀어야하는 문제</a>
<a href="https://leetcode.com/tag/hash-table/">해쉬 테이블 문제</a>

# 영어
Given an array of strings strs, group the anagrams together.   
You can return the answer in any order.  
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.  

# 해석

## 풀이
```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */

// 예시안 순서 : bat 1개 nat tan 2개 ate eat tea 3개로 순환

function groupAnagrams(strs) {
  let answer = {};

for (let word of strs) {
    let anyOrder = word.split("").sort().join("");
    // console.log(anyOrder) 시 예상되는 값 aet aet ant aet ant abt
    // console.log(answer[anyOrder])
    if (answer[anyOrder]) {
      answer[anyOrder].push(word); // push에 추가함
    } else { // undefined로 나오면
      answer[anyOrder] = [word];
    }
  }
  // console.log(answer) => 키와 값으로 나올 예정
return Object.values(answer);
}

// Object.keys, values, entries 사용법
// Object.keys(obj) – 객체의 키만 담은 배열을 반환
// Object.values(obj) – 객체의 값만 담은 배열을 반환
// Object.entries(obj) – [키, 값] 쌍을 담은 배열을 반환
```
