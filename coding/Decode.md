### decode 좀 더 추가하기
```js
const decodeString = function (string) {
    // g나 i는 수정자라고 함.
    // 이때 g는 모든 전역을 의미하며
    // i는 대소문자 없이를 의미
  while (string.match(/\d/gi)) 
      //string.prototype.match()는 문자열이 정규식과 매치되는 부분을 검색
    // 숫자가 매핑될 때까지 반복, 아직 디코딩이 끝나지 않음을 뜻함
  { 
      string = string.replace(/\d+\[[a-z]+\]/gi, (matched) =>
        // 정규 표현식으로 매칭된 문자열을 첫번째 인자로 사용
    { 
      const repeatNumber = Number(matched.match(/\d+/gi)[0]); 
        // number 매칭
      const internalString = matched.match(/[a-z]+/gi); 
        // a to z characters 매칭
      return internalString[0].repeat(repeatNumber); 
        // 괄호 안에 담긴 문자열을 반복해서 return 하면 매칭된 문자열이 변환
    });
  }

  return string;
}
```

### ★ 공부해보기
<a href='https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/match'>1</a>
<a href='https://programmers.co.kr/learn/courses/30/lessons/12926'>2</a>
<a href='https://programmers.co.kr/learn/courses/30/lessons/12948'>3</a>
<a href='https://blog.naver.com/lovysunny7/221610023491'>4</a>
<a href='https://blog.naver.com/ggamjige8888/222055605559'>5</a>
<a href='https://aljjabaegi.tistory.com/449'>6</a>
