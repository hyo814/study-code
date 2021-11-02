## Case6 : Tabs


### 케이스 주제
Q. 아래와 같이 작동하는 탭 메뉴를 구현하시오.


### 기능 요구사항
요구 사항은 아래와 같다.

1. 비동기 함수인 fetchTabsData 함수를 사용해 탭 메뉴 정보를 담고 있는 배열을 전달받아 탭 메뉴를 생성한다.
2. fetchTabsData 함수는 프로미스를 반환하며 이 프로미스가 fulfilled 상태가 될 때까지는 1초 소요된다. 프로미스가 fulfilled 상태가 될 때까지 스피너(.spinner 요소)를 표시한다.
3. 탭 정보를 담고 있는 배열의 length는 가변적이다.

#### React
1. 함수 컴포넌트와 훅을 사용해 구현한다.
2. 스타일은 CSS, Sass, CSS Module, styled-components 중 어느 것을 사용해도 좋으나 가급적 styled-components 사용을 권장한다.

### 주요 학습 키워드
- [비동기 처리와 Promise](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Introducing)
- [React hook을 사용해 데이터 패칭하기](https://www.robinwieruch.de/react-hooks-fetch-data)
-  useEffect로 로딩창을 구현 할 수 있다.

### 문제 풀이
1. javascript
```javascript
// fetch fake data
const fetchTabsData = () => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            title: "HTML",
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`,
          },
          {
            title: "CSS",
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`,
          },
          {
            title: "JavaScript",
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`,
          },
        ]),
      1000
    );
  });
};

const createTabs = async () => {
  // 현재 활성화된 탭의 인덱스
  let currentTabIndex = 0;

  const $tabs = document.querySelector(".tabs");
  const $spinner = document.querySelector(".spinner");

  // fetch fake data
  try {
    const tabsData = await fetchTabsData();

    $spinner.style.display = "none";
    $tabs.style.setProperty("--tabs-length", tabsData.length);

    const nav = tabsData.map(
      ({ title }, i) => `
        ${i === 0 ? "<nav>" : ""}
        <div class="tab" data-index="${i}">${title}</div>
        ${i === tabsData.length - 1 ? '<span class="glider"></span></nav>' : ""}`
    );

    const contents = tabsData.map(
      ({ content }, i) => `<div class="tab-content ${i === currentTabIndex ? "active" : ""}">${content}</div>`
    );
    
    $tabs.innerHTML = [...nav, ...contents].join("");
  } catch (e) {
    console.error(e);
  }

  document.querySelector("nav").onclick = (() => {
    const $glider = document.querySelector(".glider");
    const $tabContents = document.querySelectorAll(".tab-content");

    return (e) => {
      currentTabIndex = +e.target.dataset.index;

      $glider.style.transform = `translate3D(${currentTabIndex * 100}%, 0, 0)`;

      $tabContents.forEach(($tabContent, i) => {
        $tabContent.classList.toggle("active", i === currentTabIndex);
      });
    };
  })();
};

document.addEventListener("DOMContentLoaded", createTabs);

```
2. react - hook
```javascript
import { useState, useEffect } from 'react';
// fetch fake data
const fetchTabsData = () => {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            title: 'HTML',
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`
          },
          {
            title: 'CSS',
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`
          },
          {
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`
          }
        ]),
      1000
    );
  });
};

const useFetchTabsData = () => {
  const [tabsData, setTabsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await fetchTabsData();
        setTabsData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { tabsData, isLoading };
};

export default useFetchTabsData;
```
