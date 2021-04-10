# 다크 모드 공부하기
1. 다크모드의 정의
- 소프트웨어에서 밝은 화면에 검은 글자 테마 대신에 어두운 화면에 흰 글자 테마를 지원하는 것. 
- 배경화면뿐만 아니라 유저 인터페이스 전반의 분위기를 의미.
- 예시 이미지
<a href='https://ifh.cc/v-DGwgth' target='_blank'><img src='https://ifh.cc/g/DGwgth.png' border='0'></a>

1.1 원리
웹 스토리지의 key와 value 값을 통하여 dark 모드를 볼 수 있습니다.<br/>
사용자 모드에서 application을 찾아 storage 부분을 보게 되면<br/>
theme에 dark가 저장이 되면 다시 f5를 누르게 되어도 그대로 dark 상태에 있습니다.<br/>
theme에 light라 저장이 되어 있다면 light 버젼으로 화면을 볼 수 있습니다.<br/>
- 예시 이미지
<a href='https://ifh.cc/v-42PKNj' target='_blank'><img src='https://ifh.cc/g/42PKNj.png' border='0'></a>

 1.2 타이머 함수와 예시
- setTimeout(함수, 시간) : 일정 시간 후 함수 실행(1000당 1초입니다.)
```javascript
const timer = setTimeout(() => {
  console.log('hello')
},3000)
}
```
- setInterval(함수, 시간) : 시간 간격마다 함수 실행
```javascript
const timer = setInterval(() => {
  console.log('hello')
},3000)
}
```
- clearTimeout() : 설정된 Timeout 함수를 종료
```javascript
const h1E1 = document.querySelector('h1')
h1El.addEventListener('click',()=>{
clearTimeout(timer)
})
```
- clearInterval() : 설정된 Interval 함수를 종료
```javascript
const h1E1 = document.querySelector('h1')
h1El.addEventListener('click',()=>{
clearInterval(timer)
})
```

1.3 localstorage  
웹 스토리지(web storage)에는 로컬 스토리지(localStorage)와 세션 스토리지(sessionStorage)가 있습니다.<br/>
이 두 개의 매커니즘의 차이점은 데이터가 어떤 범위 내에서 얼마나 오래 보존되느냐에 있습니다.<br/>
세션 스토리지는 웹페이지의 세션이 끝날 때 저장된 데이터가 지워지는 반면에, 로컬 스토리지는 웹페이지의 세션이 끝나더라도 데이터가 지워지지 않습니다.<br/> 
다시 말해, 브라우저에서 같은 웹사이트를 여러 탭이나 창에 띄우면, 여러 개의 세션 스토리지에 데이터가 서로 격리되어 저장되며, 각 탭이나 창이 닫힐 때 저장해 둔 데이터도 함께 소멸합니다.<br/>
반면에, 로컬 스토리지의 경우 여러 탭이나 창 간에 데이터가 서로 공유되며 탭이나 창을 닫아도 데이터는 브라우저에 그대로 남아 있습니다.<br/>
- <출처 자료> 
  - <a href='https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage'>자료1번</a>
  - <a href='https://jess2.github.io/2018/06/06/JavaScript/JS-%EB%A1%9C%EC%BB%AC-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-Local-Storage/'>자료2번</a>
  - <a href='https://ponyozzang.tistory.com/341'>자료3번</a>
  - <a href='https://www.daleseo.com/js-web-storage/'>자료 4번</a>
 
 1.4 콜백 함수
 - 콜백함수  
 함수의 인수로 사용되는 함수 - 실행 위치를 보장하는 용도로 활용한다.<br/>
<자세히...><br/>
CallBack 함수란 이름 그대로 나중에 호출되는 함수를 말한다.<br/>
콜백함수라고 해서 그 자체로 특별한 선언이나 문법적 특징을 가지고 있지는 않다.<br/>
콜백함수도 일반적인 자바스크립트 함수일 뿐이다.<br/>
콜백 함수는 코드를 통해 명시적으로 호출하는 함수가 아니라, 개발자는 단지 함수를 동록하기만 하고, 어떤 이벤트가 발생했거나 특정 시점에 도달했을 때 시스템에서 호출하는 함수를 말한다.<br/>
즉 콜백함수는 콜백함수라는 유니크한 문법적 특징을 가지고 있는 것이 아니라, 호출방식에 의한 구분이다.<br/>
 ex. setTimeout (함수,시간)
 ```javascript
 function timeout() {
  setTimeout ((cb) => {
    console.log('hello')
  cb()
  },3000)
 }
 timeout(()=>{
  console.log('bye')
 })
 ```
 - 콜백지옥<br/>
콜백 지옥은 JavaScript를 이용한 비동기 프로그래밍시 발생하는 문제로서, 함수의 매개 변수로 넘겨지는 콜백 함수가 반복되어 코드의 들여쓰기 수준이 감당하기 힘들 정도로 깊어지는 현상을 말한다.
```javascript
step1(function (value1) {
    step2(function (value2) {
        step3(function (value3) {
            step4(function (value4) {
                step5(function (value5) {
                    step6(function (value6) {
                        // Do something with value6
                    });
                });
            });
        });
    });
});
```
해결 방법으로는<br/>
- 동기 함수를 사용한다
```javascript
let result = fs.readFileSync('file.txt', 'utf8');
console.log(result);
```
- 콜백 함수를 분리한다 - 익명 함수를 포기하라
```javascript
step1(afterStep1);
function afterStep1(value1) {
    step2(afterStep2);
}
function afterStep2(value2) {
    step3(afterStep3);
}
// 생략
```
- Promise 패턴 도입
```javascript
somethingAsync(value1)
    .then((result) => {
        // 성공시 수행할 작업
    })
    .catch((error) => {
        // 실패시 수행할 작업
    });
```
- Async Function (async - await)
```javascript
function f() {
    return somethingAsync(value1)
        .then((result) => {
            // 성공시 수행할 작업
        })
        .catch((error) => {
            // 실패시 수행할 작업
        });
}
```
- <출처자료>
   - <a href='https://bravenamme.github.io/2019/10/29/javascript-promise/'>자료 1번</a>
   - <a href='https://kongda.tistory.com/20'>자료 2번</a>
   - <a href='https://geundung.dev/52'>자료 3번</a>
   - <a href='https://librewiki.net/wiki/%EC%BD%9C%EB%B0%B1_%EC%A7%80%EC%98%A5'>자료 4번</a>
 

2. DarkMode의 Basic Code<br/>
2.1 토글 버튼?<br/>
토글버튼(Toggle button)은 두가지 상태중에 하나로 토글되어지도록 만든 버튼이다.<br/>
토글 두가지 상태 중 하나를 선택할 수 있다는 점에서 라디오 버튼을 떠올릴 수 도 있지만, 불이 꺼지고 켜지는 상태를 표시하는 스위치 같은 역할을 한다고 생각하면 된다.<br/>
On 상태에서는 On이라는 글자와 함께 불이 들어오고, Off 상태에서는 Off라는 글자와 함께 불이 꺼진다.<br/>
```html
   <div class="toggle-button">
      <div class="toggle-button-switch"></div>
      <div class="toggle-button-text">
        <div class="toggle-button-text-on"><i class="far fa-sun fa-lg"></i></div>
        <div class="toggle-button-text-off"><i class="far fa-moon fa-lg"></i></div>
      </div>
    </div>
```
2.2 원리<br/>
- 토글 버튼의 내부의 원이 왼쪽으로 52px을 이동을 하면 light에서 dark 방향으로 위치변경이 됩니다.
```css
.toggle-button>.toggle-button-switch {
    position: absolute;
    top: 2px;
    left: 2px;
    /* toggle => left: 52px */
    width: 46px;
    height: 46px;
    background-color: #fff;
    border-radius: 100%;
    transition: left 0.3s;
}
```
- body-class가 dark가 되면 dark 모드가 됩니다.
```css
/* Dark Theme */
body.dark {
    background-color: #232323;
}
body.dark .toggle-button>.toggle-button-switch {
    left: 52px;
}
body.dark .toggle-button>.toggle-button-text {
    background-color: #fc3164;
}
body.dark article {
    color: #fff;
}
```
3. DarkMode - window.matchMedia
- <a href="https://developer.mozilla.org/ko/docs/Web/API/Window"> window mdn </a>

4. DarkMode - react- styledComponent
- <출처자료>
  - <a href="https://react-icons.github.io/react-icons/">react - icon</a>
  - <a href="https://react-bootstrap.github.io/">react bootstrap</a>
  - <a href=https://material-ui.com/>react material - ui</a>

5. DarkMode - react 기능 구현
