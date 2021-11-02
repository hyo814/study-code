## Case7 : Analog clock

### 케이스 주제
Q. 아래와 같이 동작하는 아날로그 시계를 구현해보십시오.


### 기능 요구사항
> JavaScript
1. 시계의 시침(.hand.hour 요소), 분침(.hand.minute 요소), 초침(.hand.second 요소)을 1초 간격으로 회전시켜 현재 시간을 표시하시오.

2. 뷰의 기본 템플릿을 그대로 사용해도 좋으나, 더 나은 방법이 있다면 변경해도 좋습니다.

> React
3. 함수 컴포넌트와 훅을 사용해 구현하시오.

4. 스타일은 CSS, Sass, CSS Module, styled-components 중 어느 것을 사용해도 좋으나 가급적 styled-components 사용을 권장한다.



### 문제
1. JS : Javascript로 해당 기능을 구현하시오.
2. React : React로 해당 기능을 구현하시오.
- styled-components를 사용하여 뷰를 구현하시오.
- useRef와 훅을 사용하여 1번과 동일한 동작을 구현하시오.

### 문제 풀이
### q1. Javascript

#### A)

```js
const renderTime = (() => {
    const $hourHand = document.querySelector('.hand.hour');
    const $minuteHand = document.querySelector('.hand.minute');
    const $secondHand = document.querySelector('.hand.second');

    return () => {
        const date = new Date();
        const seconds = date.getSeconds();
        const minutes = date.getMinutes();
        const hours = date.getHours();

        // Updating a CSS variable(CSS custom property)
        // @see: https://css-tricks.com/updating-a-css-variable-with-javascript
        // 초침: 1초당 6도(360deg/60s) 회전
        $secondHand.style.setProperty('--deg', seconds * 6);
        // 분침: 1시간당 360도, 1분당 6도(360deg/60m), 1초당 0.1도(6deg/60s) 회전
        $minuteHand.style.setProperty('--deg', minutes * 6 + seconds * 0.1);
        // 시침: 1시간당 30도(360deg/12h), 1분당 0.5도(30deg/60m), 1초당 약 0.0083도(0.5deg/60s) 회전
        $hourHand.style.setProperty('--deg', hours * 30 + minutes * 0.5 + seconds * (0.5 / 60));
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    setInterval(renderTime, 1000);
});
```

### q2. React

#### A)
```javascript
import { useEffect, useRef } from 'react';

const useAnalogClock = () => {
  const $hourHand = useRef(null);
  const $minuteHand = useRef(null);
  const $secondHand = useRef(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date();

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      // 초침: 1초당 6도(360deg/60s) 회전
      $secondHand.current.style.setProperty('--deg', seconds * 6);
      // 분침: 1시간당 360도, 1분당 6도(360deg/60m), 1초당 0.1도(6deg/60s) 회전
      $minuteHand.current.style.setProperty('--deg', minutes * 6 + seconds * 0.1);
      // 시침: 1시간당 30도(360deg/12h), 1분당 0.5도(30deg/60m), 1초당 약 0.0083도(0.5deg/60s) 회전
      $hourHand.current.style.setProperty('--deg', hours * 30 + minutes * 0.5 + seconds * (0.5 / 60));
    }, 1000);

    // cleanup
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return [$hourHand, $minuteHand, $secondHand];
};

export default useAnalogClock;

```

### 주요 학습 키워드
- [CSS 변수(CSS 커스텀 프로퍼티)](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)
- [styled-components](https://styled-components.com/)
- [useRef](https://ko.reactjs.org/docs/hooks-reference.html#useref)
- [useEffect](https://ko.reactjs.org/docs/hooks-reference.html#useeffect)
