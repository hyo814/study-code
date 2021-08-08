# Case19 : Scroll top
## 요구사항
  Q. 스크롤을 내렸을 경우 상단에 고정된 내비게이션바의 배경과 폰트 색상이 변경되는 기능을 구현합시다.  
## 기능 요구사항
  -1.스크롤을 내릴 경우 내비게이션 배경 색상과 폰트 색상이 변경됩니다.  
  -2.스크롤을 다시 올릴 경우 변경된 상태를 유지하다가 더 이상 올릴 수 없을 때(최상단에 스크롤이 위치할 때) 이전 상태로 돌아가게 됩니다.  
  -3.스크롤을 다시 올릴 경우 곧바로 배경/폰트 색상을 이전 상태로 변경하는 방식으로도 구현해봅니다.  
  
  예시 이미지
  <a href='https://ifh.cc/v-lqp7h9' target='_blank'><img src='https://ifh.cc/g/lqp7h9.jpg' border='0'></a>
## 문제(Main) - 주로 강의를 기반으로 설명을 하지만 이해가 되면 다른 설명도 해석해보기
### q1. javaScript - 스크롤을 다시 올릴 경우 변경된 상태를 유지하다가 더 이상 올릴 수 없을 때(최상단에 스크롤이 위치할 때) 이전 상태로 변경  
- 현재 스크롤 위치를 가져옵니다.  
- 스크롤 위치를 바탕으로 active 클래스를 추가하거나 제거합니다.  

#### 강의 A)
- 스크롤 다운은 배경과 폰트 색상 변경 / 스크롤 업은 변경 상태를 유지하닥 더 이상 올릴 수 없을 때(최상단에 스크롤이 위치할 때) 최초 상태로 변경
- 스크롤 동작을 감지하기 위해서는 window 객체 또는 document 객체에 addEventListener를 사용하여 스크롤 이벤트를 추가합니다. 스크롤 이벤트는 지금 스크롤 중인지 아닌지를 감지하게 됩니다. 

##### 해설
```js
// window 객체- 스크롤을 전달을 하면 이벤트를 감지할 수 있습니다.
window.addEventListener('scroll', function() {
 console.log(‘scrolling’);
})

// or
window.onscroll = function() {……}

// document 객체
document.addEventListener('scroll', function() {……})

```
- 만약 특정 영역 안에서 스크롤 이벤트를 적용하고 싶다면 아래와 같이 변경합니다. 

```js
// 선택자로 특정 영역을 가리킨 후 스크롤 이벤트 추가를 직접 선택 하여 처리 합니다.
// 특정 영역 지정을 하도록 유도 합니다.
const section1 = document.querySelector('#section-1');

section1.addEventListener('scroll', function() {……})
```

- 다음 스크롤 위치를 가져오는 코드를 추가합니다. 이 때 크로스 브라우징을 고려해서 복수의 코드를 입력해야 합니다. 각 코드가 지원하는 브라우저는 아래 표에서 확인할 수 있습니다. 

```js
// window 객체
window.addEventListener('scroll', function() {
//대부분의 지원이 됩니다.
//다시 말해서, 크로스 브라우저를 위하여 scrollY, pageYOffset, scrollTop에 맞도록 설계 합니다.
 const top = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
})
```  

- 스크롤 특정 위치를 가져올 수 있게 되었다면 조건문 또는 삼항 연산자를 사용하여 참일 경우에는 active 클래스를 추가하고 거짓을 경우에는 제거해주는 코드를 작성합니다.

```js
// window 객체
window.addEventListener('scroll', function() {
 const top = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
 console.log(top)
 // 가독성을 위해 if문이 아닌 삼향 연산자를 통해 참과 거짓을 구분 합니다.
 (top >= 50 )
 ? nav.classList.add('active')
 : nav.classList.remove(‘active');
})
```
#### 다른 방법 A)

```js
// main.js
const navEl = document.querySelector('nav');
const scrollThreshold = 50;
const debounceDelay = 10;

/**
 * 스크롤 이벤트가 연속적으로 발생하는 경우 성능저하를 방지하기 위해 `debounce` 유틸을 이용하여, 
 * 마지막 스크롤 이벤트가 발생하고 일정시간(debounceDelay=10ms) 이상 시간이 지연됐을때 이벤트 핸들러를 1회만 실행
 */
const handleDebounceScrollEvent = debounce(() => {
    const windowScrollY = window.scrollY;
    if (windowScrollY > scrollThreshold) {
        /**
         * 스크롤된 값이 임계값 보다 큰 경우 `nav` 엘리먼트에 `active` 클래스 추가
         */
        navEl.classList.add('active');
    } else {
        /**
         * 스크롤된 값이 임계값 보다 큰 경우 `nav` 엘리먼트에 `active` 클래스 제거
         */
        navEl.classList.remove('active');
    }
}, debounceDelay);

window.addEventListener('scroll', handleDebounceScrollEvent);
```

```js
// debounce.js
/**
 * 입력된 `func` 함수가 연속하여 호출되도 마지막으로 "함수가 호출된 시간 + `delay`" 시간이후에 1회만 실행
 * 
 * @param {function} func 
 * @param {number} delay 단위는 milliseconds 입니다.
 */
const debounce = (func, delay) => {
    /**
     * `setTimeout` 아이디를 저장
     */
    let procId = null;
    return (...args) => {
        if (procId) {
            /**
             * `procId`가 존재하면 실행되지 않도록 제거
             */
            window.clearTimeout(procId);
        }
        /**
         * `delay` 이후 해당 함수가 실행되도록 `setTimeout`에 태스크를 등록
         */
        procId = setTimeout(() => func(...args), delay);
    }
};
```

##### 해설
- 기본적인 접근 방법은 `window` 객체에 `scroll` 이벤트를 바인딩하고, 스크롤 이벤트가 발생할때 `window.scrollY` 값을 확인하여 클래스를 적용하는 것입니다.
- 스크롤 이벤트는 스크롤이 진행되는동안 짧은시간내 수십여번 실행될 수 있기 때문에 성능문제를 고려해야 하는데, 이러한 부부은 `debounce` 유틸을 구현하여 해결하였습니다.


### q2. javaScript - 스크롤을 다시 올릴 경우 곧바로 배경/폰트 색상을 이전 상태로 변경합니다.  
- 현재 스크롤 위치를 가져옵니다.  
- oldvalue, 스크롤의 위치와 연산 작업을 하여 active 클래스를 추가하거나 제거합니다.  
- oldvalue를 스크롤 위치로 변경합니다.  

#### 강의 A)
```js
// 최초상태의 값은 0이고 실시간으로 바뀌는 값은 new입니다.
let oldValue = 0;
window.addEventListener('scroll', function(e){
 const newValue = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
 // 연산작업으로는 이렇게 진행됩니다.
 // 음수는 스크롤 다운, 스크롤을 내리는 중임을 의미됩니다.
 // 양수는 스크롤 업, 실시간으로 변경되는 재할당의 값을 의미됩니다.
 if(oldValue - newValue < 0) nav.classList.add('active');
 if(oldValue - newValue > 0) nav.classList.remove('active');
 // 기준 값을 변경 값으로 치환, 최종값으로는 확인 되어야합니다.
 oldValue = newValue;
});
```

##### 해설
- 스크롤 다운은 배경과 폰트 색상 변경 / 스크롤 업은 이전 상태로 변경합니다.
- 최초 기준 값을 설정한 후 기준 값 - 변경 값을 연산하여 스크롤 다운 / 스크롤 업 상태를 판단할 수 있습니다.
- 기준 값 - 변경 값 연산이 음수면 스크롤 다운, 양수면 스크롤 업입니다.
- 기준 값은 항상 변경 값으로 치환하여 새롭게 갱신을 해야 합니다.

#### 다른 방법 A)
```js
// main.js
const navEl = document.querySelector('nav');
const scrollThreshold = 50;
const throttleDelay = 100;

/**
 * 스크롤 이벤트가 연속적으로 발생하는 경우 성능저하를 방지하기 위해 `debounce` 유틸을 이용하여, 
 * 마지막 스크롤 이벤트가 발생하고 일정시간(throttle=100ms) 이상 시간이 지연됐을때 이벤트 핸들러를 1회만 실행
 */
let latestWindowScrollY = 0;
const handleThrottleScrollEvent = throttle(() => {
    const windowScrollY = window.scrollY;
    if (latestWindowScrollY - windowScrollY > 0) {
        navEl.classList.remove('active');
    } else {
        navEl.classList.add('active');
    }
    latestWindowScrollY = windowScrollY;
}, throttleDelay);

window.addEventListener('scroll', handleThrottleScrollEvent);
```

```js
// debounce.js
/**
 * 입력된 `func` 함수가 연속하여 호출되도 마지막으로 "함수가 호출된 시간 + `delay`" 시간이후에 1회만 실행
 * 
 * @param {function} func 
 * @param {number} delay 단위는 milliseconds 입니다.
 */
const debounce = (func, delay) => {
    /**
     * `setTimeout` 아이디를 저장
     */
    let procId = null;
    return (...args) => {
        if (procId) {
            /**
             * `procId`가 존재하면 실행되지 않도록 제거
             */
            window.clearTimeout(procId);
        }
        /**
         * `delay` 이후 해당 함수가 실행되도록 `setTimeout`에 태스크를 등록
         */
        procId = setTimeout(() => func(...args), delay);
    }
};
```  


##### 해설
- 기본적인 접근 방법은 `window` 객체에 `scroll` 이벤트를 바인딩하고, 스크롤 이벤트가 발생할때 가장 마지막으로 실행된 스크롤 이벤트에서 `window.scrollY` 값을 `latestWindowScrollY` 변수에 저장합니다.
- `latestWindowScrollY` 변수에서 `window.scrollY` 값을 뺀 결과 값이 0보다 큰 경우 `active` 클래스를 부여, 그렇지 않은경우 제거하는 원리입니다.
- 스크롤 이벤트는 스크롤이 진행되는동안 짧은시간내 수십여번 실행될 수 있기 때문에 성능문제를 고려해야 하는데, 이러한 부부은 `throttle` 유틸을 구현하여 해결하였습니다.


### q3. javaScript - 자바스크립트에서 제공하는 마우수 휠 이벤트 동작 감지 기능을 사용해서 구현  
- 마우스 휠 이벤트 동작을 감지하여 동작시킵니다.  
  *참고 : 자바스크립트에서는 마우스 휠 방향을 알 수 있는 mousewheel,wheel, DOMMouseScroll 이벤트를 제공합니다.  
          
          
#### 강의 A)
```js
// firefox에서는 제공되는 경우가 아닌 부분도 고려해야합니다.
window.addEventListener('wheel', mouseWheelEvent);
window.addEventListener('DOMMouseScroll', mouseWheelEvent);

function mouseWheelEvent(e) {
// -e.detail로 음수 확인합니다.
 const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
 (delta < 0)
 ? nav.classList.add('active')
 : nav.classList.remove('active');
}

// or
// firefox인지 아닌지 구별을 하면 한번에 해결 할 수 있습니다.
//navigator.userAgent.indexOf('Firefox')로 탐색합니다.
const isFireFox = (navigator.userAgent.indexOf('Firefox') !== -1);
// 각각에 맞는 적용을 해야합니다.
const wheelEvt = isFireFox ? 'DOMMouseScroll' : 'wheel';

window.addEventListener(wheelEvt, mouseWheelEvent);

function mouseWheelEvent(e) {
 const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
 (delta < 0)
 ? nav.classList.add('active')
 : nav.classList.remove('active');
}
```

##### 자세한 해설
- 자바스크립트에서는 마우스 휠 방향을 알 수 있는 mousewheel, wheel, DOMMouseScroll 이벤트를 제공합니다.
- mousewheel은 비표준으로, wheel을 사용해야 합니다.
- 파이어폭스에서는 DOMMouseScroll을 사용해야 합니다.

#### 다른 방법 A)
```js
// main.js
const scrollThreshold = 50;
const debounceDelay = 10;

/**
 * q1 문제와 동일한 방법으로 구현, Jquery에서 지원하는 함수를 응용하여 DOM을 제어
 */
const handleThrottleScrollEvent = debounce(() => {
    const windowScrollY = window.scrollY;
    if (scrollThreshold < windowScrollY) {
        $nav.addClass('active');
    } else {
        $nav.removeClass('active');
    }
    latestWindowScrollY = windowScrollY;
}, debounceDelay);

/**
 * [!] `mousewheel` 이벤트를 사용하는 경우 (마우스가 아닌)키보드 또는 스크린리더등으로 
 * 스크롤을 제어하는 경우 이벤트를 트리거 할 수 없음
 */
$(window).on('scroll', handleThrottleScrollEvent);
```

```js
// debounce.js
/**
 * 입력된 `func` 함수가 연속하여 호출되도 마지막으로 "함수가 호출된 시간 + `delay`" 시간이후에 1회만 실행
 * 
 * @param {function} func 
 * @param {number} delay 단위는 milliseconds 입니다.
 */
const debounce = (func, delay) => {
    /**
     * `setTimeout` 아이디를 저장
     */
    let procId = null;
    return (...args) => {
        if (procId) {
            /**
             * `procId`가 존재하면 실행되지 않도록 제거
             */
            window.clearTimeout(procId);
        }
        /**
         * `delay` 이후 해당 함수가 실행되도록 `setTimeout`에 태스크를 등록
         */
        procId = setTimeout(() => func(...args), delay);
    }
};
```

##### 해설
- 기본적인 접근 방법은 `q1` 문제와 동일합니다. `scroll` 이벤트와 `mousewheel` 이벤트 차이에 대해 알아두시면 도움이 될 것 같습니다.
- [!] `mousewheel` 이벤트를 사용하는 경우 (마우스가 아닌)키보드 또는 스크린리더등으로 스크롤을 제어하는 경우 이벤트를 트리거 할 수 없습니다. 주의하세요!


----------------------------------------------------------------------------------------------------        
### 참고해야할 경우 
  q4. jQuery - 스크롤을 다시 올릴 경우 변경된 상태를 유지하다가 더 이상 올릴 수 없을 때(최상단에 스크롤이 위치할 때) 이전 상태로 변경
      - 스크롤 위치를 기준으로 적용합니다.
      - 현재 스크롤 위치를 가져옵니다.  
      - 스크롤 위치를 바탕으로 active 클래스를 추가하거나 제거합니다.  
     
#### 강의 A)

```js
$(window).scroll(function () {
 const $top = $(this).scrollTop();
 console.log($top);
 
 ($top >= 50 )
 ? $nav.addClass('active')
 : $nav.removeClass('active');
});
```

##### 해설
- 스크롤 위치를 기준으로 적용합니다.
- 스크롤 다운은 배경과 폰트 색상 변경 / 스크롤 업은 변경 상태를 유지하되 더 이상 올릴 수 없을 때(최상단에 스크롤이 위치할 때) 최초 상태로 변경합니다.
- scrollTop()는 제이쿼리에서 스크롤의 위치를 가져올 때 사용되는 메서드입니다. 이를 사용하면 자바스크립트 구현 방법 1과 동일한 방식으로 구현할 수 있습니다.

#### 다른 해설 A)

```js
//main.js
const scrollThreshold = 50;
const throttleDelay = 250;
const debounceDelay = 100;

let latestWindowScrollY = 0;

const handleScrollEvent = () => {
    const windowScrollY = window.scrollY;
    if (latestWindowScrollY - windowScrollY > 0) {
        $nav.addClass('active');
    } else {
        $nav.removeClass('active');
    }
    latestWindowScrollY = windowScrollY;
};

const handleThrottleScrollEvent = throttle(handleScrollEvent, throttleDelay);

/**
 * `throttle`, `debounce` 모두 이용하여 이벤트를 바인딩 하였는데,
 * - 유저가 너무 빠른속도로 스크롤 방향을 바꾸는경우 `throttleDelay`에 의해 중간과정은 생략될 수 있으나 성능은 유지할 수 있음.
 */
$(window).on('scroll', handleThrottleScrollEvent)
```

##### 해설(외 참고사항들)
- `throttle`의 딜레이를 늘려 함수가 실행되는 횟수를 줄여 성능을 향상시켰습니다.
-  `throttle`: 
-  `debounce`:
- `throttleDelay`:

  q5. jQuery - 스크롤을 다시 올릴 경우 곧바로 배경/폰트 색상을 이전 상태로 변경 
    - 마우스 휠 방향을 기준으로 적용합니다. 
    - 크로스 브라우징을 고려하여 스크롤 위치를 가져오는 방법입니다.
    - 전체를 고려한 case 설계 합니다. (ex.firefox mousewheel DOMMouseScrol)
    - e.originalEvent를 통해 처리합니다.
    
#### A)

```js
$(window).on('mousewheel DOMMouseScroll', function(e) {
 const delta = e.originalEvent.wheelDelta
 ? e.originalEvent.wheelDelta
 : -e.originalEvent.detail;
 
 console.log(delta);

//q4와 동일
 (delta < 0)
 ? $nav.addClass('active')
 : $nav.removeClass('active');
});

```  
##### 자세한 해설
- 스크롤 다운은 배경과 폰트 색상 변경 / 스크롤 업은 이전 상태로 변경
- 제이쿼리에서도 마우스 휠 이벤트를 적용할 수 있습니다.
- originalEvent : 제이쿼리의 이벤트 객체에서 지원하지 않는 브라우저 기능을 활용하고자 할 때 사용되는 이벤트 객체
 
 ## 기타
 - <a href="https://ant.design/components/back-top/">스크롤탑 1</a>
 - <a href="https://www.npmjs.com/package/debounce">2</a>
 - <a href="https://www.npmjs.com/package/lodash.throttle">3</a>
