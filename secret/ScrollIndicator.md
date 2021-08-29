## Case 22 : Scroll Indicator

### 케이스 주제
Q. 요구사항 : 스크롤 시 현재 남의 컨텐츠의 분량을 화면에 표기합니다.


### 기능 요구사항
- 스크롤을 내리면 상단에 현재 스크롤이 어느 정도 내려갔는지를 나타내는 상태 표시바를 만듭니다.
- 스크롤이 끝까지 내려가면 Indicator도 끝까지 이동하고, 스크롤을 다시 상단으로 올리면 Indicator도 다시 뒤로 돌아가게 만듭니다.

### 기능 작동 이미지
<a href='https://ifh.cc/v-LQM3Xo' target='_blank'><img src='https://ifh.cc/g/LQM3Xo.gif' border='0'></a>


### 문제
- JavaScript로 해당 기능을 구현하시오.
1. scrollBar의 width값을 변경하는 방식으로 indicator를 적용합니다.
2. 스크롤 시 translateX를 사용하여 scrollBar 위치를 변경합니다.


### 주요 학습 키워드
q1. 크로스 브라우징을 고려하여 현재 문서의 높이를 가져오는 방법 학습합니다.
q2. width 또는 translateX를 사용하여 남은 컨텐츠를 표기하는 방법 학습합니다.


### 실전 풀이
q1. 첫 번째 방법 (1) : width 크기를 변경하도록 합니다.
- document.documentElement.scrollHeight, document.body.scrollHeight : 전체 문서의 높이
- document.documentElement.clientHeight, document.body.clientHeight : 현재 눈에 보이는 브라우저의 높이

#### 부록
- document.documentElement  
IE9미만을 고려해서 작업할 경우에 사용됩니다.  
참고로 위 두 속성을 IE9 미만에서는 지원하지 않습니다.  
하지만 크롬에서는 동작하지 않습니다.  
  
- document.body  
html 코드에 DTD가 선언 되어 있다면 동작하지 않는다고 합니다.

```js
const scrollBar = document.getElementById('scroll-bar');

window.addEventListener('scroll', function () {
// 크로스 브라우징을 고려하여 설계 합니다.
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight; // 문서의 전체 높이를 파악합니다.
  const clientHeight = document.body.clientHeight || document.documentElement.clientHeight; // 현재 눈에 보이는 브라우저의 높이도 파악합니다.
  
  // 이때 개발자 도구 및 상황에 따라 달라질 수 있습니다.

  // contentHeight : 눈에 보이지 않는 남은 범위를 기준값으로 합니다.
  const contentHeight = scrollHeight - clientHeight;
  const percent = (scrollTop / contentHeight) * 100; // 퍼센트로 해서 유용하게 할 수 있도록 합니다.
  
  scrollBar.style.width = percent + '%'; // style의 width 값으로 전달을 받습니다.
})
```

q2. 두 번째 방법 (2) : translateX 활용합니다.
- scrollBar의 width 값을 100%로 변경한 다음 최초 위치를 화면 왼쪽 영역 바깥으로 이동합니다.
- 스크롤 시 translateX를 사용하여 scrollBar 위치를 변경합니다


```js
const scrollBar = document.getElementById('scroll-bar');

window.addEventListener('scroll', function () {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
  const clientHeight = document.body.clientHeight || document.documentElement.clientHeight;

  const contentHeight = scrollHeight - clientHeight;
  const percent = (scrollTop / contentHeight) * 100;

  scrollBar.style.transition = 'transform 0.3s ease-out';
  scrollBar.style.transform = `translateX(-${100 - percent}%)`;
})
```

```css
#scroll-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: blue;

  width: 100%;
  transform: translateX(-100%);
}
```

### 기타( 검색 할 수 있는 목록들)
1. infinity scroll (*case3을 참고 할 수 있음*)
2. scrollTop(*case19을 참고 할 수 있음*)
3. pagination(*case18을 참고 할 수 있음*)

4. transfrom css <a href="https://developer.mozilla.org/ko/docs/Web/CSS/transform">transform</a>
5. calc< a href="https://developer.mozilla.org/ko/docs/Web/CSS/calc()">calc</a>

