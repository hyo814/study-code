## Case29 : Auto Complete 1

### 케이스 주제
- 검색어 자동완성 기능 만들기

(현업에서 서비스를 만들때 화장품을 검색하거나 영상을 검색할때 등에 사용할 검색 자동완성 기능을 요구하는 경우가 많이 있습니다. 사용자는 이 기능으로 내가 검색한 내용과 관련된 다른 검색어들을 알 수 있게 되어 사용자에게 정보 편의성이 주어지고 서비스 입장에서는 사용자로부터 더 많은 검색을 이끌어낼 수 있습니다.)


Q. 아래와 같은 스펙을 가진 검색 자동완성 기능을 만들어봅시다.


### 기능 요구사항

1. 하나의 input tag를 만든다.
2. 이 input에 키보드 타이핑이 될때 현재 검색어 기준으로 관련 검색어 API를 호출합니다.
3. 상황마다 다르지만 보통 두가지 케이스가 있습니다.
- 이때 API 호출은 즉각 실행하길 바라는 경우
- 타이핑을 멈추고 0.5초 등의 시간이 지나고 요청하는 경우가 있습니다.
4. 검색어 API가 진행 중일때 input tag 우측에 loading 중임을 표시합니다.
5. 검색어 API Response가 도착하면 그 내용을 input tag 아래에 리스트로 보여줍니다.


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
### q1. Vanilla JavaScript

#### A)
```js
const debounce = (targetFunction, debounceTime = 500) => {
    let timerId = null;

    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            targetFunction(...args);
        }, debounceTime);
    };
};
```

```js
$searchInput.addEventListener(
    "keyup",
    debounce(async (event) => {
        const query = event.target.value;

        if (!query) {
            return;
        }

        document.dispatchEvent(
            new CustomEvent(LOADING_EVENT_NAME, {
                detail: {
                    isLoading: true
                }
            })
        );
        // 고양이 검색 API를 검색어 API로 간주합니다
        const response = await fetch(`${API_URL}?q=${query}`);
        const cats = await response.json();
        document.dispatchEvent(
            new CustomEvent(LOADING_EVENT_NAME, {
                detail: {
                    isLoading: false
                }
            })
        );

        if (!cats.length) {
            $textList.innerHTML = "";
            $textList.style.visibility = "hidden";
            $infoParagraph.innerHTML = "해당하는 검색어가 없습니다..!";
            return;
        }

        $textList.innerHTML = cats
            .slice(0, 5)
            .map((cat) => `<li>${cat.name}</li>`)
            .join("");
        $textList.style.visibility = "visible";
        $infoParagraph.innerHTML = "";
    })
);

document.addEventListener(LOADING_EVENT_NAME, ({
    detail: {
        isLoading
    }
}) => {
    $loadingIndicator.style.visibility = isLoading ? "visible" : "hidden";
});
```

##### 해설

1. 검색어 API가 따로 없기 때문에 The Cat API를 검색어 API로 가정합니다.

2. 기본적으로 input tag에 이벤트리스너를 등록해서(keypress, keyup 같은 이벤트를 수신) 해결합니다.

3. 이때 사용자가 검색어를 입력하다가 전부 지우는 경우 즉, 이벤트리스너에 전달되는 값이 비어있는 경우가 생깁니다. 이럴땐 API 요청을 하는 것이 네트워크 자원 낭비이므로 이 경우를 제외합니다.

4. 로딩 인디케이터를 만드는 것은 다양한 방법이 있습니다.
- 코드에 되어있는 것처럼 Pub-Sub 구조를 활용해 로딩 중임을 알리는 이벤트를 활용하는 방법
- 단순하게, 로딩 인디케이터는 초기에 보이지 않다가 API 요청 이전에 스타일을 이용해 보여주고, API 요청 이후에(Promise, async await) 스타일을 이용해 숨기는 방법

5. API Request는 브라우저에서 API Request를 위해 기본적으로 제공하는 fetch 함수를 사용하는 방법이 있고 axios 같은 third party를 사용할 수 있습니다.
- 이때 fetch, axios, superagent 등의 함수는 Promise 기반으로 동작합니다.
- 따라서 then, catch, finally 함수를 체이닝해서 구현하는 방법과
- 이 API 요청 함수를 감싸는 함수를 async 함수로 만드는 방법이 있고 현재 코드는 이 방법으로 작성 돼있습니다.

6. 이때 사용자가 타이핑을 한 문자씩 할때마다 우리가 등록한 이벤트 핸들러가 실행됩니다. 즉, 현재 상태에서는 사용자의 타이핑 숫자만큼 API Request가 실행됩니다. 우리가 검색 자동완성에서 기대하는 것은 사용자가 유의미한 글자를 모두 입력한 뒤에 API Request를 실행하는 것입니다. 따라서 이벤트 핸들러에 debounce를 걸어서 가장 마지막 타이핑이 일어나고 n초 뒤(코드에서는 0.5초)에 API Request를 실행해서 네트워크 자원을 아끼고 지나치게 자주 로딩 인디케이터와 검색어 목록이 깜빡거리는 점을 차단합니다.

7. API Response를 받아서 검색어 결과를 목록을 표현하는 ul tag에 렌더링 합니다.
- 응답 결과가 있으면 그대로 렌더링하고
- 응답 결과가 null 이거나 빈 배열인 경우처럼 비어있으면 해당하는 검색어가 없다는 UI를 만들어 사용자에게 친절하게 알려줍니다.

8. 이때 API가 네트워크, 서버, 인증 등의 이유로 에러를 낼 수 있습니다.
- API 처리를 Promise 기반으로 했다면 catch, finally 함수를 체이닝해서 에러가 생겼을때 사용자에게 알립니다.
- async await를 사용했다면 API 요청 관련 코드를 try catch로 감싼 뒤 catch에서 동일한 작업을 수행합니다.




### q2. RxJS

#### A)
```js
const inputStream = fromEvent($searchInput, "input").pipe(
  map((event) => event.target.value),
  debounceTime(500),
  distinctUntilChanged(),
  tap(() => ($loadingIndicator.style.visibility = "visible")),
  switchMap((query) =>
    ajax(`${API_URL}?q=${query}`, { method: "GET" }).pipe(
      map(({ response }) => response)
    )
  ),
  tap(() => ($loadingIndicator.style.visibility = "hidden"))
);
```

```js
inputStream.subscribe({
  next: (cats) => {
    if (!cats.length) {
      $textList.innerHTML = "";
      $textList.style.visibility = "hidden";
      $infoParagraph.innerHTML = "해당하는 검색어가 없습니다..!";
      return;
    }

    $textList.innerHTML = cats
      .slice(0, 5)
      .map((cat) => `<li>${cat.name}</li>`)
      .join("");
    $textList.style.visibility = "visible";
    $infoParagraph.innerHTML = "";
  },
  error: () => {
    $infoParagraph.innerHTML =
      "An error has occurred when fetching search queries.";
  }
});
```

##### 해설
1. Reactive 패러다임은 크게 4가지 개념을 이해하면 됩니다.
- Observable : 우리가 애플리케이션을 만들때 데이터는 API에서도 오고, 여러 DOM tag에 달린 이벤트 리스너에서도 옵니다. Observable은 이런 모든 종류의 데이터의 흐름을 나타냅니다.
- Operator : 이렇게 시간순으로 연속적으로 들어오는 데이터를 우리는 그대로 사용하기도 하지만 계산을 하거나 log를 남기기도 합니다. 이렇게 데이터의 흐름 사이 사이에 어떤 특정한 작업을 해야하는데, 이 작업을 해줄 수 있게 해주는 것이 바로 Operator 입니다. 
- Observer : 이렇게 Observable과 Operator로 데이터가 어떻게 흘러서 어떻게 변하는지를 표현했으니, 이 데이터를 결국엔 어딘가에서 꺼내서 활용을 해야합니다. 그 활용을 하는 주체가 바로 Observer 입니다. 그래서 관찰자 입니다. 더 정확히는,  Observer는 next, error, complete 함수를 프로퍼티로 갖는 객체를 의미합니다. 이 객체를 observableInstance.subscribe(객체) 와 같이 subscribe 함수 안에 넣어주면 데이터를 꺼내오기 시작합니다.
- Subscription : 위에서 subscribe 함수를 실행하면 데이터를 꺼내오기 시작하고 이 함수는 Subscription 객체를 반환합니다. 데이터를 꺼내온다는 것은 RxJS가 Browser 어딘가에 이벤트 핸들러를 달아놨다는 것을 의미하는데, 더 이상 데이터를 활용하지 않아야 하는 순간이 오면 사용한 메모리 자원을 다시 반환해야 합니다. 이때 이 Subscription 객체를 이용해 subscriptionInstance.unsubscribe() 와 같이 자원을 반환합니다.

2. input tag의 input 행위(keypress, keyup 등의 이벤트)를 fromEvent 함수를 이용해 Observable로 만듭니다.

3. 그 다음 Vanilla 버전에서 이벤트 핸들러가 수행했던 행위들(빈 문자 건너뛰기, debounce, 로딩 인디케이터 스타일 바꿔주기, API 요청)을 Operator를 이용해 수행합니다.
- map, debounceTime, tap, ajax 등의 Operator가 이 작업들에 사용됩니다.

4. 이렇게 만들어진 Observable instance를 구독하기 시작합니다. 그럼 Observer에 검색어 목록 데이터가 전달됩니다. 이 값을 이용해 검색어 목록이 없는 경우와 있는 경우를 각각 구분해서 Vanilla 버전에서와 똑같이 렌더링 합니다.

5. 에러 처리에 대해서는, RxJS는 Observer 객체에 error 핸들러를 제공합니다. Observable에서 에러가 나면 error 핸들러가 수행됩니다. 따라서 에러가 생겼을때 이 핸들러에 필요한 작업(사용자에게 에러가 났다고 알려주기)을 수행합니다.


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
