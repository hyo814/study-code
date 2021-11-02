## Case8 : Carousel


### 케이스 주제
Q. 아래와 같이 작동하는 케러셀을 구현하시오.
> 캐러셀(Carousel)은 컨텐츠를 슬라이드 형태로 순환하며 표시하는 UI를 말한다. [캐러셀은 비생산적인 디자인 패턴](https://brunch.co.kr/@ebprux/41)이라는 주장이 있기도 하지만 사용자가 스크롤을 내리지 않은 상태에서도 많은 정보를 노출할 수 있는 장점이 있어 많은 웹사이트에서 사용하고 있다.


### 기능 요구사항
요구 사항은 아래와 같다.

1. 무한 루핑 기능을 지원한다.
2. 슬라이딩 애니메이션을 지원한다.
3. 각 슬라이드의 width/height는 가변적이다. 단, 모든 슬라이드의 width/height는 동일하다.
4. 슬라이드 이동 버튼을 연타해도 이상없이 동작해야 한다.
5. 캐러셀 슬라이더를 표시할 HTML 요소와 슬라이드 이미지의 url로 구성된 배열을 전달하면 동적으로 캐러셀 슬라이더를 생성한다.

- 캐러셀 슬라이더 알고리즘
  - 정상적으로 한칸씩 이동하는 경우
  - 슬라이더의 선두 또는 가장 뒤에서 이동하는 경우

#### React
1. 함수 컴포넌트와 훅을 사용해 구현한다.
2. 스타일은 CSS, Sass, CSS Module, styled-components 중 어느 것을 사용해도 좋으나 가급적 styled-components 사용을 권장한다.

### 문제 풀이
1. javascript
```javascript
const carousel = ($container, images) => {
  // 현재 표시중인 슬라이드의 인덱스. 슬라이드의 인덱스가 0 또는 images.lenth + 1이면 클론 슬라이드다.
  let currentSlide = 0;
  // 현재 transition 중인지 여부
  let isMoving = false;
  // transiton duration(ms)
  const DURATION = 500;

  const timerId = null;
  let $carouselSlides = null;

  // currentSlide를 기준으로 carousel-slides 요소를 이동시킨다.
  const move = (currentSlide, duration = 0) => {
    // duration이 0이 아니면 transition이 시작된다. isMoving은 transionend 이벤트가 발생하면 false가 된다.
    if (duration) isMoving = true;
    $carouselSlides.style.setProperty('--duration', duration);
    $carouselSlides.style.setProperty('--currentSlide', currentSlide);
  };

  // Event bindings
  document.addEventListener('DOMContentLoaded', () => {
    // images 배열의 앞뒤에 클론 슬라이드를 추가한다.
    $container.innerHTML = `
      <div class="carousel-slides">
        ${[images[images.length - 1], ...images, images[0]].map(url => `<img src="${url}" />`).join('')}
      </div>
      <button class="carousel-control prev">&laquo;</button>
      <button class="carousel-control next">&raquo;</button>
    `;

    $carouselSlides = document.querySelector('.carousel-slides');
  });

  window.onload = () => {
    // carousel의 width 결정
    // img 요소의 width는 가변적이므로 첫번째 img 요소의 width를 offsetWidth으로 취득해 설정한다.
    const { offsetWidth } = $carouselSlides.querySelector('img');
    $container.style.width = `${offsetWidth}px`;
    $container.style.opacity = 1;

    move(++currentSlide);
    
    // Autoplay
    // timerId = setInterval(() => move(++currentSlide, DURATION), 3000);
  };

  $container.onclick = ({ target }) => {
    // isMoving 상태를 확인하여 transition 중에는 이동을 허용하지 않는다.
    if (!target.classList.contains('carousel-control') || isMoving) return;

    // clearInterval(timerId);

    // prev 버튼이 클릭되면 currentSlide를 -1하고 next 버튼이 클릭되면 currentSlide를 +1한다.
    const delta = target.classList.contains('prev') ? -1 : 1;
    currentSlide += 1 * delta;
    move(currentSlide, DURATION);
  };

  $container.ontransitionend = () => {
    isMoving = false;

    // currentSlide === 0, 즉 선두에 추가한 클론 슬라이드면 currentSlide += images.length로 image의 마지막(images.length)으로 이동
    // currentSlide === images.length + 1, 즉 마자막에 추가한 클론 슬라이드면 currentSlide -= images.length로 image의 선두(1)로 이동
    // 클론 슬라이드가 아니면 currentSlide += 0으로 이동하지 얺는다.
    const delta = currentSlide === 0 ? 1 : currentSlide === images.length + 1 ? -1 : 0;

    // 클론 슬라이드가 아니면(delta === 0) 이동하지 않는다.
    if (!delta) return;

    currentSlide += images.length * delta;
    move(currentSlide);
  };
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);
```
2. react - hook
```javascript
import { useState } from 'react';

const useCarousel = () => {
  const [width, setWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  // currentSlide를 기준으로 carousel-slides 요소를 이동시킨다.
  const move = (_currentSlide, _duration = 0) => {
    // _duration이 0이 아니면 transition이 시작된다. isMoving은 transionend 이벤트가 발생하면 false가 된다.
    if (_duration) setIsMoving(true);
    setCurrentSlide(_currentSlide);
    setDuration(_duration);
  };

  return { width, currentSlide, duration, isMoving, setWidth, setIsMoving, move };
};

export default useCarousel;

```

### 주요 학습 키워드
- [CSS 변수(CSS 커스텀 프로퍼티)](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)
- [HTMLElement.offsetWidth](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)
- [HTMLElement: transitionend event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event)
- [styled-components](https://styled-components.com/)
- [useState](https://ko.reactjs.org/docs/hooks-state.html)

