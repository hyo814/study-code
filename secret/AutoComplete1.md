## Case29 : Auto Complete 1

### 케이스 주제
- 검색어 자동완성 기능 만들기

(현업에서 서비스를 만들때 화장품을 검색하거나 영상을 검색할때 등에 사용할 검색 자동완성 기능을 요구하는 경우가 많이 있습니다. 사용자는 이 기능으로 내가 검색한 내용과 관련된 다른 검색어들을 알 수 있게 되어 사용자에게 정보 편의성이 주어지고 서비스 입장에서는 사용자로부터 더 많은 검색을 이끌어낼 수 있습니다.)


Q. 아래와 같은 스펙을 가진 검색 자동완성 기능을 만들어보세요.


### 기능 요구사항

1. 하나의 input tag를 만든다.
2. 이 input에 키보드 타이핑이 될때 현재 검색어 기준으로 관련 검색어 API를 호출한다.
- 이때 API 호출은 즉각 실행하길 바라는 경우
- 타이핑을 멈추고 0.5초 등의 시간이 지나고 요청하는 경우가 있다.
3. 검색어 API가 진행 중일때 input tag 우측에 loading 중임을 표시한다.
4. 검색어 API Response가 도착하면 그 내용을 input tag 아래에 리스트로 보여준다.


### 기능 작동 이미지
<a href='https://ifh.cc/v-DRgpQB' target='_blank'><img src='https://ifh.cc/g/DRgpQB.gif' border='0'></a>


### 문제
q1. Javascript
- 가장 마지막 타이핑이 일어나고 0.5초 뒤에 API Request를 실행하도록 하는 debounce logic을 작성하시오.

q2. RxJS를 이용해 스트림 구조로 동일한 기능을 작성하시오

### 주요 학습 키워드 
- fetch와 async, await를 이용한 API호출
- 지연시간을 적용하여 마지막 이벤트만 발생시키는 debounce를 이용해, 
  마지막으로 타이핑을 한 순간에 API를 호출 할 수 있는 기능 구현 
- slice, map 함수를 사용하여 특정조건에 맞는 검색어를 특정갯수만큼 노출 시키는 기능 구현 


### 문제 풀이
### 다르게 풀어보기 (해설 집 발췌)
### q1. Vanilla JavaScript

#### A)
```js
// solution/2.others_1/1. Vanilla JavaScript/src/app.js
const API_URL = "https://api.thecatapi.com/v1/breeds/search";
/**
 * `debounce` 함수에 의해 생성된 함수는 반복적으로 호출되더라도 마지막 `debounceTime` 이후에 1회만 실행됩니다.
 * @param {*} targetFunction 
 * @param {*} debounceTime 
 */
const debounce = (targetFunction, debounceTime = 500) => {
    let timeoutId = null;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        /**
         * setTimeout 함수에 인자값으로 콜백 함수, 시간, 콜백 함수의 인자값을 전달할 수 있습니다.
         * @see https://developer.mozilla.org/ko/docs/Web/API/WindowTimers/setTimeout
         */
        timeoutId = setTimeout(targetFunction, debounceTime, ...args);
    }
};

const LOADING_EVENT_NAME = "loading";
const searchInputEl = document.querySelector(".SearchInput");
const loadingIndicatorEl = document.querySelector(".LoadingIndicator");
const textListEl = document.querySelector(".TextList");
const infoParagraphEl = document.querySelector(".InfoParagraph");

searchInputEl.addEventListener("keyup", debounce(async (event) => {
    /**
     * `currntTarget`, `target` 차이를 알아두시면 좋습니다.
     * [>] `currentTarget`은 이벤트가 바인딩된 객체를 가르키고, `target`은 이벤트버블링 발생시 이벤트가 발생한 객체를 가르킵니다.
     * [>] `currentTarget`은 이벤트가 발생하는 순간에만 사용이 가능하며, `debounce`와 같은 비동기 처리함수에서는 `null` 값이 할당됩니다.
     * @see https://developer.mozilla.org/ko/docs/Web/API/Event/target
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
     * @see https://javascript.info/bubbling-and-capturing
     */
    const { value: query } = event.target;
    /**
     * API 요청을 위해 Fetch API 를 사용합니다.
     * @see https://developer.mozilla.org/ko/docs/Web/API/Fetch_API
     */
    const url = API_URL + `?q=` + query;
    try {
        /**
         * 로딩 인디케이터 보임
         */
        loadingIndicatorEl.style.visibility = 'visible';
        const response = await fetch(url);
        const data = await response.json();

        const isEmptyResponseData = data.length === 0;
        /**
         * 검색결과 없는 경우
         */
        infoParagraphEl.textContent = isEmptyResponseData ? '검색 결과가 없습니다.' : '';
        /**
         * 검색결과 있는 경우 목록 엘리먼트 노출
         */
        textListEl.style.visibility = isEmptyResponseData ? 'hidden' : 'visible';
        /**
         * 데이터를 HTML 문자열로 변환
         */
        const itemsHtml = data.map(({ name }) => `<li>${name}</li>`).join('');
        /**
         * 데이터 목록을 화면에 랜더링
         */
        textListEl.innerHTML = itemsHtml;
        /**
         * 로딩 인디케이터 감춤
         */
        loadingIndicatorEl.style.visibility = 'hidden';
    } catch (e) {
        infoParagraphEl.textContent = '처리중 에러가 발생하였습니다!';
    }
}, 500));
```

##### 해설
- `debounce`, `throttle` 라이브러리 구현 내용과 동작을 알아두시면 좋습니다.
  - `debounce`, `throttle`은 반복적으로 발생하는 이벤트등과 같은 처리를 할때 유용하게 사용할 수 있습니다, 위의 문제에서는 서버에 과도한 요청이 발생하지 않게 하기 위해 `debounce`를 적용하였습니다.
- `currntTarget`, `target` 차이를 알아두시면 좋습니다.
  - `currentTarget`은 이벤트가 바인딩된 객체를 가르키고, `target`은 이벤트버블링 발생시 이벤트가 발생한 객체를 가르킵니다.
  - `currentTarget`은 이벤트가 발생하는 순간에만 사용이 가능하며, `debounce`와 같은 비동기 처리함수에서는 `null` 값이 할당됩니다.

##### 참고자료
- https://developer.mozilla.org/ko/docs/Web/API/Event/target
- https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
- https://javascript.info/bubbling-and-capturing
- https://developer.mozilla.org/ko/docs/Web/API/Fetch_API



### q2. RxJS

#### A)
```js
// solution/2.others_1/1. Vanilla JavaScript/src/app.js
...

const API_URL = "https://api.thecatapi.com/v1/breeds/search";
const searchInputEl = document.querySelector(".SearchInput");
const loadingIndicatorEl = document.querySelector(".LoadingIndicator");
const textListEl = document.querySelector(".TextList");
const infoParagraphEl = document.querySelector(".InfoParagraph");

const inputStream = fromEvent(searchInputEl, "input").pipe(
  /**
   * 전달되는 객체의 속성 추출
   * `map((event) => { event.target.value })` 코드를 대체
   */
  pluck('target', 'value'),
  /**
   * 중복되는 데이터를 제거
   */
  distinctUntilChanged(),
  /**
   * 단어가 입력된 경우에만 처리
   */
  filter((value) => value),
  tap(() => {
    /**
     * 로딩 인디케이터 보임
     */
    loadingIndicatorEl.style.visibility = 'visible';
  }),
  /**
   * 마지막 키보드 입력 발생후 500ms 대기
   */
  debounceTime(500),
  switchMap(
    /**
     * 기존 스트림을 `ajaxGetJSON` 스트림으로 변경
     */
    (query) => ajaxGetJSON(`${API_URL}?q=${query}`).pipe(
      catchError((e) => {
        infoParagraphEl.textContent = '처리중 에러가 발생하였습니다!';
        return of(e);
      }),
    )),
  tap(() => {
    /**
     * 로딩 인디케이터 감춤
     */
    loadingIndicatorEl.style.visibility = 'hidden';
  }),
  filter((value) => {
    /**
    * 에러 객체가 전달된 경우 더이상 전달하지 않음
    */
    return !(value instanceof Error);
  }),
  tap((dataItems) => {
    const isEmptyResponseData = dataItems.length === 0;
    /**
     * 검색결과 없는 경우
     */
    infoParagraphEl.textContent = isEmptyResponseData ? '검색 결과가 없습니다.' : '';
    /**
     * 검색결과 있는 경우 목록 엘리먼트 노출
     */
    textListEl.style.visibility = isEmptyResponseData ? 'hidden' : 'visible';
  })
);

inputStream.subscribe({
  next: (dataItems) => {
    /**
    * 데이터를 HTML 문자열로 변환
    */
    const itemsHtml = dataItems.map(({ name }) => `<li>${name}</li>`).join('');
    /**
     * 데이터 목록을 화면에 랜더링
     */
    textListEl.innerHTML = itemsHtml;
  },
  /**
   * 스트림 에러가 발생한 경우 스트림이 닫힘
   */
  error: (e) => alert(`예상하지 못한 에러 발생! ${e.message}`)
});
```

### 해설
- 문제 1의 원리와 동일하게 `debounce` 기능을 활용하여 과도하게 발생하는 서버 요청을 줄였습니다.
- 문제 2 코드는 RxJS를 이용하여 작성된 코드입니다.
  - RxJS(Reactive Extensions For JavaScript)는 기존 코드와 달리 이벤트나 데이터 스트림을 처리하는 방식으로 프로그래밍 합니다.
  - RxJS에서 제공하는 `Operators`들의 기능을 잘 알고 활용하면 좋을것 같습니다.

### 참고자료
- https://www.learnrxjs.io/learn-rxjs/operators
