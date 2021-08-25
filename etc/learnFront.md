case 1 ~ 3 함수 직전 까지 (2021-08-25)
https://learnjs.vlpt.us/

김민태의 프론트엔드 아카데미
1. 참조 사전
식별자 : https://developer.mozilla.org/ko/docs/Glossary/Identifier

식별자는 코드의 일부이지만 문자열은 데이터이기 때문에, 식별자와 문자열은 다릅니다. JavaScript에서 식별자를 문자열로 변환하는 방법은 없지만, 어떤 경우 문자열을 분석해 식별자로 사용할 수 있습니다.
상수는 대문자로 쓰자
이름이 길면 단어 섞어 사용 setAge => 카멜 케이스

문법- 값 : value
https://typescript-kr.github.io/
https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures
- var 문제점을 검색 하기

문법 변수
상수를 많이 쓰기를 권고

표현식과 연산자
https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Expressions_and_Operators
- 구조 분해 할당
- 우선 순위
- 문과 식 차이

참조와 복사 매커니즘
- 얕은 복사와 깊은 복사
- 값이 복사 되면서 의미가 없어진다.
- 기본형 데이터 타입

문법 - 조건문
- if 문
- 스위치 문 => 일치되는 케이스까지 가고, 브레이크 없으면 계속 실행 됨 :: 브레이크 필수


반복문
무한 반복을 하다.
- 비교식 참인 동안 반복 된다.

for ( let i=0; i< arr.length; i++) {
console.log(arr[i]);
}

- for 문
- do while 문
- while 문
======= > do는 무조건

응용1
for ( const item of arr ) {
console.log(item);
} 
// 리스트

응용2
for (const index in arr ) {
console.log(arr[index]);
}

예외 상황
- do exception
- try catch

타입 스크립트 특징?!
- 인터페이스와 타입 별칭 차이점
타입 별칭은 X
원칙을 세우자 : 차이점을 알고 문법적인 사항이 아닌 구체적인 타입을 제시하는 타입 별칭만 가능하다는 점 데이터를 표현 할때는 타입 알리아스를 사용할 것 또한 메소드와 같은 구체적인 행위까지 포함된 객체를 디자인 할 때는 인터페이스를 사용







