## Case28 : Instant search
### 케이스 주제

Q. 아래와 같이 작동하는 즉시 검색 기능을 구현하시오.

### 기능 요구사항

요구 사항은 아래와 같다.

1. 하나의 input tag를 만든다.
2. 이 input에 키보드 타이핑이 될때 현재 검색어 기준으로 필요한 API를 호출한다.
   이때 API 호출은 즉각 실행해서 결과를 보여준다.
3. 검색어 API가 진행 중일때 input tag 우측에 loading 중임을 표시한다.
4. 검색어 API Response가 도착하면 그 내용을 input tag 아래에 리스트로 보여준다.

### 주요 학습 키워드
- fetch와 async, await를 이용한 API호출
- slice, map 함수를 사용하여 특정조건에 맞는 검색어를 특정갯수만큼 노출 시키는 기능 구현
- Element 속성 innerHTML, style을 사용하여 DOM에 보여주기 

#### 문제 풀이
## 설명
1. The Cat API를 사용합니다.
2. 기본적으로 input tag에 이벤트리스너를 등록해서(keypress, keyup 같은 이벤트를 수신) 해결합니다.
3. 이때 사용자가 검색어를 입력하다가 전부 지우는 경우 즉, 이벤트리스너에 전달되는 값이 비어있는 경우가 생깁니다. 이럴땐 API 요청을 하는 것이 네트워크 자원 낭비이므로 이 경우를 제외합니다.
4. 로딩 인디케이터를 만드는 것은 다양한 방법이 있습니다.
  - 코드에 되어있는 것처럼 Pub-Sub 구조를 활용해 로딩 중임을 알리는 이벤트를 활용하는 방법
  - 단순하게, 로딩 인디케이터는 초기에 보이지 않다가 API 요청 이전에 스타일을 이용해 보여주고, API 요청 이후에(Promise, async await) 스타일을 이용해 숨기는 방법
5. API Request는 브라우저에서 API Request를 위해 기본적으로 제공하는 fetch 함수를 사용하는 방법이 있고 axios 같은 third party를 사용할 수 있습니다.
  - 이때 fetch, axios, superagent 등의 함수는 Promise 기반으로 동작합니다.
  - 따라서 then, catch, finally 함수를 체이닝해서 구현하는 방법과
    이 API 요청 함수를 감싸는 함수를 async 함수로 만드는 방법이 있고 현재 코드는 이 방법으로 작성 돼있습니다.
6. 이때 사용자가 타이핑을 한 문자씩 하면 즉각 API를 호출합니다.
7. API Response를 받아서 검색어 결과를 목록을 표현하는 ul tag에 렌더링 합니다.
  - 응답 결과가 있으면 그대로 렌더링하고
  - 응답 결과가 null 이거나 빈 배열인 경우처럼 비어있으면 해당하는 검색어가 없다는 UI를 만들어 사용자에게 친절하게 알려줍니다.
8. 이때 API가 네트워크, 서버, 인증 등의 이유로 에러를 낼 수 있습니다.
  - API 처리를 Promise 기반으로 했다면 catch, finally 함수를 체이닝해서 에러가 생겼을때 사용자에게 알립니다.
  - async await를 사용했다면 API 요청 관련 코드를 try catch로 감싼 뒤 catch에서 동일한 작업을 수행합니다.


```javascript
const API_URL = 'https://api.thecatapi.com/v1/breeds/search';

const $searchInput = document.querySelector('.SearchInput');
const $loadingIndicator = document.querySelector('.LoadingIndicator');
const $textList = document.querySelector('.TextList');
const $infoParagraph = document.querySelector('.InfoParagraph');

$searchInput.addEventListener('keyup', async (event) => {
  const query = event.target.value;

  if (!query) {
    return;
  }

  $loadingIndicator.style.visibility = 'visible';
  const response = await fetch(`${API_URL}?q=${query}`);
  const cats = await response.json();
  $loadingIndicator.style.visibility = 'hidden';

  if (!cats.length) {
    $textList.innerHTML = '';
    $textList.style.visibility = 'hidden';
    $infoParagraph.innerHTML = '해당하는 검색어가 없습니다..!';
    return;
  }

  $textList.innerHTML = cats
    .slice(0, 5)
    .map((cat) => `<li>${cat.name}</li>`)
    .join('');
  $textList.style.visibility = 'visible';
  $infoParagraph.innerHTML = '';
});

```
