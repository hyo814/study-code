## Case2 : Scroll spy


### 케이스 주제
Q. 스크롤스파이 구현하기


### 기능 요구사항
1. 최초 화면: 상단메뉴의 ‘1’이 활성화되어 있음.
2. 스크롤을 내리면서 나오는 숫자가 상단 메뉴에 활성화된 숫자와 일치하도록 합니다.
3. 상단 메뉴를 클릭하여, 해당 숫자가 적힌 스크롤위치로 이동할 수 있습니다.


### 기능 작동 이미지
![scroll_spy](./scrollSpy.gif)


### 실행 방법 / 풀이 방법 안내
> 문제 풀기 방식 :
>
> 1. 레포지토리를 clone
> 2. 터미널에서 각 문제 폴더 디렉토리로 이동하여 `npm install`로 의존성을 설치
> 3. `package.json`을 참고하여, 명시된 scripts 명령어로 개발서버 실행.
> 4. 코드 수정하면서 문제 해결하세요

기본 번들러로 `parcel`을 사용했습니다. - `react` 문제의 경우, `react-scripts` 사용. 문제 디렉토리에서 `npm start` 또는 `npx parcel index.html watch`로 개발서버를 실행하세요.


### 문제
q1. offsetTop, scrollTop, clientHeight의 상관관계를 통해 해당 기능을 구현하시오.

q2. resize에 무관하게 동작하게끔 기능을 구현하시오.

q3. resize listener를 적용하여 동작을 구현하시오.

q4. throttle과 debounce를 통해 해당 동작을 구현하시오.

q5. Intersection Observer를 활용하여 기능을 구현하시오.

q6. Intersection Observer를 활용하여 React로 해당 기능을 구현하시오.

### 문제 풀이
q1. offsetTop, scrollTop, clientHeight의 상관관계를 통해 해당 기능을 구현하시오.
```javascript
const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);
const offsetTops = contentItems.map((elem) => {
  const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
  return [ofs - clh / 2, ofs + clh / 2];
});

window.addEventListener("scroll", (e) => {
  const { scrollTop } = e.target.scrollingElement;
  // do something
  const targetIndex = offsetTops.findIndex(([from, to]) => (
    scrollTop >= from && scrollTop < to
  ))
  Array.from(navElem.children).forEach((c, i) => {
    if (i !== targetIndex) c.classList.remove('on');
    else c.classList.add('on');
  });
});

navElem.addEventListener("click", (e) => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});



/**
 * 
 <해설>
 절대 위치는 시작점으로 부터 떨어진 크기 값 입니다. 시작 점이 어디인지 아는 것이 매우 중요  
 상대 위치는 어떤 기준으로부터 떨어진 크기의 값으로 어떤 기준은 시작점도 될 수 있으며, 시작점이 안니 다른 곳을 기준으로 삼을 수도 있다.  
 offsetTop 주로 절대 좌표를 구하게 된다.  대상의 위치 값을 나타낸다.  
 scrollTop 현재 스크롤의 위치값을 구하게 된다.  
 스크롤이 특정한 지점에 위치할 때, 이벤트가 발생하는 경우에 scrollTop과 offset이 모두 사용 된다.
 clientHeight 는 요소의 내부 높이입니다. 패딩 값은 포함되며, 스크롤바, 테두리, 마진은 제외됩니다.
 offsetHeight 는 요소의 높이입니다. 패딩, 스크롤 바, 테두리(Border)가 포함됩니다. 마진은 제외됩니다.
 scrollHeight  는 요소에 들어있는 컨텐츠의 전체 높이입니다. 패딩과 테두리가 포함됩니다. 마진은 제외됩니다.
 scrollIntoView  Element 인터페이스의 scrollIntoView() 메소드는 scrollIntoView()가 호출 된 요소가 사용자에게 표시되도록 요소의 상위 컨테이너를 스크롤합니다.  
 */
 ```

q2. resize에 무관하게 동작하게끔 기능을 구현하시오.
```javascript
const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);
const getOffsetTops = (() => {
  let ofst = 0;
  let res = [];
  return () => {
    if (window.innerHeight === ofst) {
      return res;
    }
    ofst = window.innerHeight;
    res = contentItems.map(elem => {
      const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
      return [ofs - clh / 2, ofs + clh / 2];
    });
    return res;
  };
})();

window.addEventListener("scroll", e => {
  const { scrollTop } = e.target.scrollingElement;
  const targetIndex = getOffsetTops().findIndex(([from, to]) => (
    scrollTop >= from && scrollTop < to
  ))
  Array.from(navElem.children).forEach((c, i) => {
    if (i !== targetIndex) c.classList.remove('on');
    else c.classList.add('on');
  })
});

navElem.addEventListener("click", e => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});
```

q3. resize listener를 적용하여 동작을 구현하시오.
```javascript
import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);

let offsetTops = [];
const getOffsetTops = () => {
  // do something
  offsetTops = contentItems.map(elem => {
    const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
    return [ofs - clh / 2, ofs + clh / 2];
  });
};
getOffsetTops();

window.addEventListener("scroll", e => {
  const { scrollTop } = e.target.scrollingElement;
  const targetIndex = offsetTops.findIndex(([from, to]) => (
    scrollTop >= from && scrollTop < to
  ))
  Array.from(navElem.children).forEach((c, i) => {
    if (i !== targetIndex) c.classList.remove('on');
    else c.classList.add('on');
  })
});

window.addEventListener("resize", getOffsetTops);

navElem.addEventListener("click", e => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }
});
```

q4. throttle과 debounce를 통해 해당 동작을 구현하시오.
```javascript
export const throttle = (func, delay) => {
  let throttled = false;
  // do something
  return (...args) => {
    if (!throttled) {
      throttled = true;
      setTimeout(() => {
        func(...args);
        throttled = false;
      }, delay);
    }
  };
};

export const debounce = (func, delay) => {
  let timeoutId = null;
  return (...arg) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(null, ...arg), delay);
  };
};
```
q5. Intersection Observer를 활용하여 기능을 구현하시오.
```javascript
import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);

const scrollSpyObserver = new IntersectionObserver(
  entries => {
    // do something
    const { target } = entries.find((entry) => entry.isIntersecting) || {};
    const index = contentItems.indexOf(target);
    Array.from(navElem.children).forEach((c, i) => {
      if (i === index) c.classList.add('on');
      else c.classList.remove('on');
    })
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  }
);
contentItems.forEach(item => scrollSpyObserver.observe(item));

navElem.addEventListener("click", e => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }
});
```

q6. Intersection Observer를 활용하여 React로 해당 기능을 구현하시오.
```javascript
import React, { useState, useRef, useEffect } from "react";
import Nav from "./Nav";
import Content from "./Content";
import "./style.css";

const pages = Array.from({ length: 8 }).map((_, i) => i + 1);

const App = () => {
  const [viewIndex, setViewIndex] = useState(0);
  const contentRef = useRef([]);
  const moveToPage = index => () => {
    // do something
    contentRef.current[index].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  const scrollSpyObserver = new IntersectionObserver(
    entries => {
      // do something
      const { target } = entries.find((entry) => entry.isIntersecting) || {};
      const index = contentRef.current.indexOf(target);
      setViewIndex(index);
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    }
  );

  useEffect(() => {
    contentRef.current.forEach((item) => scrollSpyObserver.observe(item));
    return () => {
      contentRef.current.forEach((item) => scrollSpyObserver.unobserve(item));
    };
  }, []);

  return (
    <div id="app">
      <Nav pages={pages} viewIndex={viewIndex} moveToPage={moveToPage} />
      <div id="contents">
        {pages.map((p, i) => (
          <Content key={p} ref={(r) => (contentRef.current[i] = r)} page={p} />
        ))}
      </div>
    </div>
  );
};

export default App;

```

### 주요 학습 키워드
- 스크롤 동작 감지
- offsetTop/scrollTop/clientHeight의 상관관계
- 이벤트 리스너, mousewheel, throttle과 debounce, IntersectionObserver, 
- useEffect
- javascript mapping
