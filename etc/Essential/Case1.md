<a href="https://developer.mozilla.org/ko/docs/Glossary/Identifier">식별자</a>
식별자는 코드의 일부이지만 문자열은 데이터이기 때문에, 식별자와 문자열은 다릅니다. JS에서 식별자를 문자열로 변환하는 방법은 없지만, 어떤 경우 문자열을 분석해 식별자로 사용할 수 있습니다.
상수는 대문자로 하자
변수는 카멜케이스를 선호합니다.

```js
let age = 10;
let sdfsfdsdgsddgsdg = 20;
function setAge() {
}

const o = {
age : 10,
['myName']: '김'
}

o['myName'];

```
