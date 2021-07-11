## Case16 : Progress Bar


### 케이스 주제
Q. Progressbar 구현
데이터를 받아오거나 전달을 할때 대기 중인 로딩창이나 혹은 완성 되기 전 대기 화면에서 쓰일 수 있는 프로세스 상태바를 구현하도록 합니다.
- 슬라이드, 카로셀 만들때 이용 가
- -mbti 등의 이전 다음 페이지 ui 이용시 활용 가능


### 기능 요구사항
1) 총 4번 스텝 이동을 할수 있고 숫자는 조절 가능하도록 합니다.

2) 이전 으로 하면 왼쪽으로(25%), 다음으로 오른쪽(25%)으로 설계 합니다.

3) 다 채우거나 다 사라지면 클릭해도 이벤트 작동은 하지 않습니다.


### 기능 작동 이미지
![progressbar](https://user-images.githubusercontent.com/12206933/107072156-175f4700-6829-11eb-89dd-728c42894dd4.gif)


### 실행 방법 / 풀이 방법 안내
- jQuery 와 Vanilia.js 는 span 안에 width 값을 조절합니다.
- css 로는 애니메이션 효과를 주지않고, setInterval 함수를 사용합니다.
> q1. Javascript - q1_index.html 실행합니다.

> q2. JQuery - q2_index.html 실행합니다.

> q3. React
- css를 활용합니다. ( src/ProgressBar.js 에 transition 참고)
- 다음이나 이전을 연속클릭해도 함께 동작하지 않게 합니다.


### 문제


q1. Javascript - 주어진 템플릿(`q_index.html`)으로 캐러셀 구현 시도 합니다.  

-a. targetElement( 기본 세팅을 구성합니다.)  
```js
function ProgressBar( targetElement ){
  this.targetElement = targetElement; // 타겟 엘리먼트
  this.current = 0; // 현재 스텝의 위치
  this.limit = 4; // 총 스텝의 길이
  this.intervalSpeed = 10; // 애니메이션 스피드
  this.range = 100 / this.limit; // 25 % 씩 이동한다.
}
```

-b. 이전 상태바 이동  
```js
ProgressBar.prototype.movePrev = function(){
  // ... 이전 생략

  var intervalId = setInterval(frame, this.intervalSpeed );

  var elem = this.targetElement;

  function frame() {
    // setInterval로 반복하면서
    // 다 줄어들면 clearInterval(intervalId);
    // 그게 아니면 width를 늘리는 것을 완성하세요.
    if ( start <= end ) {
      clearInterval(intervalId);
    } else {
      start--;
      elem.style.width = start + "%";
    }
  }

```
이전 상태바 이동시에는 이렇게 진행이 됩니다.
- 1.frame 함수를 호출합니다.
- 2.시작지점의 길이가 끝지점의 길이보다 작으면 setInterval 해제합니다.
- 3.그밖에 지속적으로 감소합니다.
- 4.setInterval(함수, 시간) : 시간 간격마다 함수 실행
```javascript
const timer = setInterval(() => {
  console.log('hello')
},3000)
}
```
-5.clearInterval() : 설정된 Interval 함수를 종료
```javascript
const h1E1 = document.querySelector('h1')
h1El.addEventListener('click',()=>{
clearInterval(timer)
})
```

-c.다음으로 이동  
```js
function frame() {
    // setInterval로 반복하면서
    // 다 줄어들면 clearInterval(intervalId);
    // 그게 아니면 width를 늘리는 것을 완성하세요.
  if ( start >= end ) {
    clearInterval(intervalId);
  } else {
    start++;
    elem.style.width = start + "%";
  }
}
```
다음으로 이동시에는  
- 1.도착지점보다 길면 인터벌 해제됩니다.  
- 2.그밖에는 지속적으로 길이 감소합니다.  

-d.문법 정리 querySelector, addEventListener    
(예시)
```js
document.addEventListener("DOMContentLoaded", function(){

  var targetElement = document.querySelector('.progress-bar span')
  var progressBar = new ProgressBar(targetElement);

  document.querySelector('#prev').addEventListener('click' , function(){
    progressBar.movePrev();
  });

  document.querySelector('#next').addEventListener('click' , function(){
    progressBar.moveNext();
  });
```
문법 정리  
-1.querySelector : 제공한 선택자가 일치하는 문서 내 첫번째 element를 반환 합니다. 불 일치시 null 값을 반환 합니다.  

-2.addEventListener : EventTarget의 addEventListener() 메서드는 지정한 이벤트가 대상에 전달될 때마다 호출할 함수를 설정합니다. 일반적인 대상은 Element, Document, Window지만, XMLHttpRequest와 같이 이벤트를 지원하는 모든 객체를 대상으로 지정할 수 있습니다. addEventListener()는 EventTarget의 주어진 이벤트 유형에, EventListener를 구현한 함수 또는 객체를 이벤트 처리기 목록에 추가해 작동합니다.


q2. Jquery -  Javascript로 구현한 기능을 동일하게 Jquery로도 구현해보는 문제
#### A) 중점포인트

- jQuery animate 의 이해 
- 1.animate는 애니메이션 효과를 만듭니다.
- 2.효과를 줄 속성은 아래 링크를 확인 해주세요.
- 3.<a href="https://www.codingfactory.net/11820">animate</a>  

#### 해설
-a. 이전으로 가기 클릭시
```js
$('#prev').click(function(){

  if( current  == 0 ) return;

  current--;

  $(".progress-bar > span").animate({
      width: 25 * current + '%'
  }, 500);

});
```
이전으로 가기 클릭시
- 1.25%씩 줄어든 길이를 입력해 놓으면 해당 지점까지 애니메이션을 보여주며 이동합니다.
- 2.500은 애니메이션 스피드로 확인 합니다.
- 3.다음으로 이동하기도 늘어난 길이를 입력합니다.  

-b. 다음으로 클릭시
```js
  $('#next').click(function(){

    if( current  === limit ) return;

    current++;


    $(".progress-bar > span").animate({
        width: 25 * current + '%'
    }, 500);

  });
```
다음으로 클릭시 : js 처럼 거꾸로 생각하고 처리를 합니다. (current  === limit)


q3. React - 주어진 코드를 이해하고, 상태를 조작하는 훅을 이용해서 완성
#### A)

- 애니메이션이 진행되는동안 이벤트 작동 안되게 처리
- useRef 활용
★★

#### 해설

-a. src/App.js  
=> 하는 동안에는 이벤트가 작동되지 않도록 처리 하기 위해 useRef를 이용한다.  
```js
const isLoading = useRef(false);

```
하게 된다면,  
- 1.애니메이션이 진행되는지 체크합니다.
- 2.컴포넌트가 리랜더링되더라도 유지합니다.

-b. 애니메이션 딜레이 체크 하는 함수
```js
const delay = ( delay ) => {
  isLoading.current = true;
  return new Promise( () => 
    setTimeout( 
      () => isLoading.current = false
      , delay ) 
  );
}
```
하게 된다면,  
- 1.true로 설정합니다.
- 2.params 로 받은 delay 시간뒤에 false로 바꿉니다.
- 3.await 로 처리하기 위해 Promise 를 리턴합니다.

-c.다음으로 이동
```js
const handleNext = async() => {

  if( isLoading.current ) return;
  if( current  === limit ) return;
  setCurrent( current + 1 );
  await delay(animationSpeed);

}
```
하게 된다면,  
- 애니메이션이 진행중이면 함수 종료
- 마지막 까지 다차면 종료
- 그게 아니면 스텝 증가
- delay 를 실행한다.

-d.이전으로 이동
```js
if( isLoading.current ) return;
if( current  === 0 ) return;
```
하게 된다면,  
- 함수 종료 조건 : 애니메이션 중인가 or progressbar 가 처음
- 이하 다음으로 이동과 동일

기타.
- material ui <a href="https://material-ui.com/components/progress">material-ui</a>
- react-bootstrap <a href="https://react-bootstrap.github.io/components/progress">react-bootstrap</a>
- bootstrap <a href="https://getbootstrap.com/docs/4.0/components/progress">bootstrap</a>
- ant design <a href="https://ant.design/components/progress">ant design</a>
- semetic ui <a href="https://semantic-ui.com/modules/progress.html">semetic ui</a>
