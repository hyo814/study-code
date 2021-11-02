## Case3 : Infinite scroll


### 케이스 주제
Q. 무한 스크롤 목록뷰를 구현하세요.


### 기능 요구사항
1. 최초에는 20개의 목록을 불러옵니다.
2. 스크롤을 최하단으로 이동시 ‘loading’ 상태표시가 나타나며, 이후의 20개 목록을 더 가져옵니다.
3. 로딩 완료시 ‘loading’ 표시가 사라지며, 가져온 목록이 하단에 추가됩니다. (무한 반복)

### 문제
q1. Javascript - `scrollTop`, `clientHeight`, `scrollHeight` 등의 요소의 프로퍼티를 활용하여 해결하시오.

q2. Javascript - 앞서 작성한 코드에 debounce를 적용해 기능을 구현하시오.

q3. Javascript - 다음으로 IntersectionObserver를 활용해 기능을 구현하시오.

q4. React - 마지막으로, 리액트에서 IntersectionObserver를 활용해 기능을 구현하시오.

### 문제 풀이
### q1. 문제 상황에 대하여 Java Script로 동작을 구현시킬 수 있는 코드를 작성해보세요
#### A)

```js
// index.js

import renderList from "./listRenderer";
import "./style.css";

const app = document.querySelector("#app");
const fetchMoreTrigger = document.querySelector("#fetchMore");
let page = 0;

const fetchMore = async () => {
  const target = page ? fetchMoreTrigger : app;
  target.classList.add("loading");
  await renderList(page++);
  target.classList.remove("loading");
};
const onScroll = e => {
  const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
  if (scrollTop >= scrollHeight - clientHeight) {
    fetchMore();
  }
};

document.addEventListener("scroll", onScroll);
fetchMore();
```

### q2. 앞서 작성한 코드에 debounce를 적용해보자.
#### A)
```js
// index.js

import "./style.css";
import renderList from "./listRenderer";
import { debounce } from "./util";

// Write Javascript code!
const app = document.querySelector("#app");
const fetchMoreTrigger = document.querySelector("#fetchMore");
let page = 0;

const fetchMore = async () => {
  const target = page ? fetchMoreTrigger : app;
  target.classList.add("loading");
  await renderList(page++);
  target.classList.remove("loading");
};
const onScroll = e => {
  const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
  if (scrollTop >= scrollHeight - clientHeight) {
    fetchMore();
  }
};

document.addEventListener("scroll", debounce(onScroll, 300));
fetchMore();
```


```js
// util.js
const getRandomSeconds = () => (Math.round(Math.random() * 5) + 1) * 250;

export const randomTimer = (func, ...args) => resolve => {
  setTimeout(() => resolve(func(...args)), getRandomSeconds());
};

export const debounce = (func, delay) => {
  let timeoutId = null;
  // do something
  return (...arg) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(null, ...arg), delay);
  };
};

export const dummyFetcher = (method, args) =>
  new Promise(randomTimer(method, args));

** 참고사항 **
- throttle
- debounce

```

### q3. 이번에는 Intersection Observer를 활용해보자

#### A)

```js
// index.js

import "./style.css";
import renderList from "./listRenderer";

const app = document.querySelector("#app");
const fetchMoreTrigger = document.querySelector("#fetchMore");
let page = 0;

const fetchMore = async () => {
  const target = page ? fetchMoreTrigger : app;
  target.classList.add("loading");
  await renderList(page++);
  target.classList.remove("loading");
};

const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    // do something
  if (isIntersecting) fetchMore();
});
fetchMoreObserver.observe(fetchMoreTrigger);

fetchMore();

** 참고사항 **
- IntersectionObserver

```

### q4. React + Intersection Observer를 활용하여 구현해보세요.

#### A)

```js
import React, { useRef, useEffect } from "react";

const FetchMore = ({ loading, setPage }) => {
  const fetchMoreTrigger = useRef(null);
  const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
      // do something
    if (isIntersecting) setPage(prev => prev + 1);
  });

  useEffect(() => {
    fetchMoreObserver.observe(fetchMoreTrigger.current);
    return () => {
      fetchMoreObserver.unobserve(fetchMoreTrigger.current);
    };
  }, []);

  return (
    <div
      id="fetchMore"
      className={loading ? "loading" : ""}
      ref={fetchMoreTrigger}
    />
  );
};

export default FetchMore;

** 참고사항 **
- unobserve 
- removeEventListener 
- React에서는 useEffect 내에서 observe - unobserve / addEventListener - removeEvenntListener를 쌍으로 매칭
```

### 주요 학습 키워드
- 스크롤 동작 감지, 이벤트 리스너, scrollTop, mousewheel, IntersectionObserver, useEffect
