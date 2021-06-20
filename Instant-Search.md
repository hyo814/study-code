## Case13 : Instant Search


### 케이스 주제

Q. 검색어를 입력하는 동시에 엔터키, 검색 버튼 누를 필요 없이 결과값을 즉시 반영할 수 있는 순간 검색 기능을 구현하십시오.


### 기능 요구사항

1. 키보드 이벤트를 지연시간(debounce 기능)을 통해 request 횟수를 줄입니다.
2. 디자인 템플릿을 변경할 수 있도록 템플릿을 분리합니다.


### 문제
- q1. configuration을 참고하여 input element를 생성하시오. (기능과 디자인을 분리하기 위한 방법, src->question->instant-search->index.js)
`./src/question/instant-search/index.js`
#### A)
```js
/*
* title: instant search display method
* input: display 되는 element, configuration placeholder, css 정보
* output: text input element
* description: 최초 생성할 때 input element를 생성합니다. 템플릿을 관리합니다.
*/
initialize(selector, configuration) {
    const textinput = document.createElement('input');
    textinput.setAttribute('type', 'text');
    textinput.setAttribute('placeholder', configuration.placeholder ?? 'Please enter');
    textinput.classList.add(configuration.css);
    selector.appendChild(textinput);
    // 생성된 input element를 리턴을 실행합니다.
    return textinput;
}
```
가.<a href="https://www.codingfactory.net/10419">setAttribute()</a> 란 선택한 요소의 속성 값을 정한다고 합니다.
문법으로는 element.setAttribute( 'attributename', 'attributevalue' )가 됩니다.
예를 들어 document.getElementById( 'abc' ).setAttribute( 'title', 'This is title' )
id 값이 abc인 요소의 title 속성을 This is title로 정합니다. 만약 이미 속성값이 존재한다면 그 값을 지우고 새 값을 적용합니다.
- (기타)
1. <a href="https://www.codingfactory.net/10419#google_vignette">removeAttribute()</a>
2. <a href="https://www.codingfactory.net/10419">setAttribute</a>

- q2. debounce 기능을 구현하시오. (src->question->instant-search->util->index.js)
`./src/question/instant-search/util/index.js`
#### A)
```js
/*
* title: debounceTime 함수
* input: callback 실행될 함수, delayTime 지연시간
* output: setTimeout이 적용된 함수
* description: 해당 함수의 커플링과 독립성을 위해 delayTime 의 디폴트 값을 500ms로 함.
*/
export const debounce = (callback, delayTime = 500) => {
    let timeout = null;
    return (...args) => {
        // 실행되지 않은 settimeout은 clear
        if (timeout) clearTimeout(timeout);

        // settimeout clear를 위해 저장.
        timeout = setTimeout(() => {
            // 지정된 함수 실행
            callback(...args);
            // 함수 실행 후 settimeout clear
            clearTimeout(timeout);
        }, delayTime);
    }
}
```

- q3. debounce 기능을 통해 가져온 데이터를 외부로 전달합니다. (src->question->instant-search->index.js)
`./src/question/instant-search/index.js`
```js
/*
* title: event binding method
* description: 모든 이벤트를 처리합니다.
*/
eventBinding() {
    // debounce uitl case
    const dispatchEvent = debounce((targetText) => {
        // 입력된 단어를 callback 함수를 통해 전달.
        this.callback(targetText);
    }, this.delayTime);

    this.textinputElement.addEventListener('keyup', (event) => {
        dispatchEvent(event.target.value);
    });

    // rxjs debounceTime operator case
    // fromEvent 는 지정된 이벤트 대상에서 오는 특정 유형의 이벤트를 내보내는 Observable 만들어 반환합니다.
    // pipe라는 함수를 통해 이벤트 흐름을 만들 수 있는데, 여기에 debounceTime operator를 넣습니다.
    const eventSource = fromEvent(this.textinputElement, 'keyup')
        .pipe(
            debounceTime(this.delayTime)
        );

    // 이벤트 소스에서 구독을 하게되면 이벤트가 발생할 때 마다 값을 전달 받게 됩니다.
    this.subscription = eventSource.subscribe((event) => {
        dispatchEvent(event.target.value);
    })
}
```

- q4. Promise를 사용하여 검색 키워드에 맞는 데이터를 가져와 리스트를 출력하시오. (src->question->instant-search->mock->word->index.js / src->index.js)
`./src/question/instant-search/mock/word/index.js`
`./src/index.js`
```js
const getData = (targetWord = '') => {
    // q4. Promise를 사용하여 검색 키워드에 맞는 데이터를 가져와 리스트를 출력하시오
    retrieveWordList(targetWord)
       .then((result) => {
           displayWordList(document.querySelector('#wordlist'), result);
       });
}
```

### 주요 학습 키워드
- 지연시간을 적용하여 마지막 이벤트만 발생시키는 기능 (debounce) 
- request api를 대신하기 위한 Promise 활용 (test를 위한 mock data 활용)
- 디자인 부분과 기능을 분리하기 위한 방법

### 기타
http://reactivex.io/documentation/ko/subject.html
https://rxjs-dev.firebaseapp.com/api/operators/debounceTime
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes

