# Case19 : Scroll top
## 요구사항
  Q. 스크롤을 내렸을 경우 상단에 고정된 내비게이션바의 배경과 폰트 색상이 변경되는 기능을 구현합시다.  
## 기능 요구사항
  -1.스크롤을 내릴 경우 내비게이션 배경 색상과 폰트 색상이 변경됩니다.  
  -2.스크롤을 다시 올릴 경우 변경된 상태를 유지하다가 더 이상 올릴 수 없을 때(최상단에 스크롤이 위치할 때) 이전 상태로 돌아가게 됩니다.  
  -3.스크롤을 다시 올릴 경우 곧바로 배경/폰트 색상을 이전 상태로 변경하는 방식으로도 구현해봅니다.  
  
  예시 이미지
  <a href='https://ifh.cc/v-lqp7h9' target='_blank'><img src='https://ifh.cc/g/lqp7h9.jpg' border='0'></a>
## 문제(Main)
  q1. javaScript - 스크롤을 다시 올릴 경우 변경된 상태를 유지하다가 더 이상 올릴 수 없을 때(최상단에 스크롤이 위치할 때) 이전 상태로 변경  
      - 현재 스크롤 위치를 가져옵니다.  
      - 스크롤 위치를 바탕으로 active 클래스를 추가하거나 제거합니다.  
 
  q2. javaScript - 스크롤을 다시 올릴 경우 곧바로 배경/폰트 색상을 이전 상태로 변경합니다.  
      - 현재 스크롤 위치를 가져옵니다.  
      - oldvalue, 스크롤의 위치와 연산 작업을 하여 active 클래스를 추가하거나 제거합니다.  
      - oldvalue를 스크롤 위치로 변경합니다.  
      
  q3. javaScript - 자바스크립트에서 제공하는 마우수 휠 이벤트 동작 감지 기능을 사용해서 구현  
      - 마우스 휠 이벤트 동작을 감지하여 동작시킵니다.  
          *참고 : 자바스크립트에서는 마우스 휠 방향을 알 수 있는 mousewheel,wheel, DOMMouseScroll 이벤트를 제공합니다.  
          
          
#### 강의 A)

```js
window.addEventListener('wheel', mouseWheelEvent);
window.addEventListener('DOMMouseScroll', mouseWheelEvent);

function mouseWheelEvent(e) {
 const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
 (delta < 0)
 ? nav.classList.add('active')
 : nav.classList.remove('active');
}

// or

const isFireFox = (navigator.userAgent.indexOf('Firefox') !== -1);
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



#### 다른 해설 A)

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




## ETC. 이후부터는 제이쿼리 입니다.          
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


 
  
