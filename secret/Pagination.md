## Case18 : Pagination

### 케이스 주제
Q. 페이지네이션 구현

### 기능 요구사항
1. 주어진 댓글 데이터 22개에 대해 페이지를 나눠 댓글 요소를 뷰에 표현한다.
2. 페이지 당 표현할 수 있는 댓글 요소 수를 설정할 수 있다.
3. 현재 페이지를 알 수 있고, 다음 페이지로 넘어갈 수 있는 뷰에 기능을 구현한다.


### 기능 작동 이미지
<a href='https://ifh.cc/v-b86L5h' target='_blank'><img src='https://ifh.cc/g/b86L5h.gif' border='0'></a>


### 실행 방법 / 풀이 방법 안내
> 문제 풀기 방식 :
>
> 1. 레포지토리를 clone
> 2. question 디렉토리에 `package.json`이 없는 경우, `index.html`을 열거나, live-server extension으로 열기. 이외 경우 아래 안내 참고.
> 3. 터미널에서 각 문제 폴더 디렉토리로 이동하여 `npm install`로 의존성을 설치
> 4. `package.json`을 참고하여, 명시된 scripts 명령어로 개발서버 실행.
> 5. 코드 수정하면서 문제 해결하세요

기본 번들러로 `parcel`을 사용했습니다. - `react` 문제의 경우, `react-scripts` 사용. 문제 디렉토리에서 `npm start` 또는 `npx parcel index.html watch`로 개발서버를 실행하세요.


### 문제
q1. JavaScript로 해당 기능을 구현하세요. (* index.js 파일 확인)
- 페이지 번호를 동적으로 생성했을 때, 이벤트를 할당하기
- 페이지네이션 페이지번호를 주었을 때, 나오는 게시물수 컨트롤하기
- 활성화 된 버튼 처리하기


```js
function  Pagination(){
​
// 초기값 셋팅
this.current_page = 1;
this.limit = 5;
this.total_page = Math.ceil( comments.length / this.limit );
}
```
총 페이지 수는 commets 배열의 길이를 한페이지에 보여질 게시물수로 나눈다.
ex) 한페이지에 5개씩 보이고 총 게시물 수가 23 개라면
23/5 를 올림 계산해서 5페이지가 나온다.
올림을 하는 이유는 마지막 페이지에 게시물 수가 3개라도 1페이지로 치기 때문이다.
​
```js
Pagination.prototype.getComments = function(page){
​
var  start = ( page - 1 ) * this.limit;
this.current_page = page;
var  limit = start + this.limit;
return  comments.filter( function( _ , index ){
    if(index >= start && index < limit ) return  true;
    else  return  false;
​
});
​
}
​
```
Parameter 각 페이지를 인자로 주었을때
Return 해당하는 게시물 수
​
시작지점부터 한페이지에 보여질 게시물 수를 보여준다
- 1 page ) 0번부터 5(한페지에 보여줄숫자)까지의 게시물을 보여주면된다. start : 23*(1페이지-1) * limit
- 2 page ) (2-1) * 5
- 3 page ) (3-1) * 5
각 시작지점은 위와 같고 5개의 게시물씩 보여주면 된다.
​
> 아래와 같이 처리 하는 것은 배열의 인덱스가 시작지점부터 한페이지에 보여질 게시물 수의 인덱스로 처리하기 위함이다.

```js
return  comments.filter( function( _ , index ){
​   if(index >= start && index < limit ) return  true;
​   else  return  false;
});
```
> 게시물 배열을 넘겼을 때 html 태그에 맞춰서 출력해주는 함수를 구현한다.
​
```js
Pagination.prototype.getCommentFormat = function (comments) {
  return comments.reduce(function (acc, comment) {
    return (
      acc +
      `<div class="commentWrap">
            <img src="` +
      comment.profile_url +
      `" alt="" />
            ` +
      comment.author +
      `
            <div class="createdAt">
                ` +
      comment.createdAt +
      `
            </div>
            <div class="content">
                ` +
      comment.content +
      `
            </div>
            <hr />
        </div>`
    );
  }, "");
};
```

아래와 같이 처리 하는것은 html 양식에 맞춰 순회하면서 acc 에 누적해서 리턴해주기 위함이다.
```js
return  comments.reduce( function(acc, comment ){
```
​
> 총 페이지의 숫자를 입력시 페이지를 화면에 뿌려주는 함수를 구현한다.
​
```js
Pagination.prototype.getPageListFormat = function () {
  var result = "";

  for (var num = 1; num <= this.total_page; num++) {
    var className = num == this.current_page ? "active" : "";
    result += '<button class="' + className + '">' + num + "</button>";
  }

  return result;
};
```
​
​
```js
document.addEventListener("DOMContentLoaded", function () {
  var pagination = new Pagination();

  var commentContainer = document.querySelector("#commentContainer");
  var pageContainer = document.querySelector("#pageContainer");

  commentContainer.innerHTML = pagination.getCommentFormat(
    pagination.getComments(1)
  );
  pageContainer.innerHTML = pagination.getPageListFormat();

```
1. 문서가 로드 된 뒤 1페이지에 해당하는 게시물을 보여준다
2. 페이지 리스트들을 보여주고, 1페이지를 활성화한다.
​
​
```js
  document.addEventListener(
    "click",
    function (event) {
      // If the clicked element doesn't have the right selector, bail
      if (event.target.matches("#pageContainer button")) {
        var page = event.target.innerHTML;
        commentContainer.innerHTML = pagination.getCommentFormat(
          pagination.getComments(page)
        );
        pageContainer.innerHTML = pagination.getPageListFormat();
        return;
      }
    },
    false
  );
});
​
```
1. 각 페이지 버튼을 클릭했을 때, 페이지에 해당하는 게시물을 뿌려주고
2. 하단 페이지리스트를 뿌려준다.
3. event.target.matches 로 처리한것은 각 클릭시 하단도 새로 리프레시 되므로 문서가 로드하고나서 이벤트를 할당하지 않고 클릭하고나서 해당 셀렉터 인지 확인한 후에 작동하게 한다.
​
##### 생각해볼 점
pagination 객체로 생성했는데,
html 안에 데이터를 넣어주는 부분도
pagination 함수안에 넣어줄지 말지 어느부분이 설계상 더 좋을지 고민해보기
​
> 아래부분
```js
pagination.getCommentFormat(pagination.getComments(1));
```
​

q2. jQuery 해당 기능을 구현하세요. (* index.js 파일 확인)
- jQuery 문서로드 처리하기
- jQuery로 동적으로 엘리멘트 생성시, 이벤트를 할당하는 방법

```js

  $(document).on("click", "#pageContainer button", function () {
    var page = $(this).html();
    commentContainer.html(
      pagination.getCommentFormat(pagination.getComments(page))
    );
    pageContainer.html(pagination.getPageListFormat());
  });

```

q3. React로 해당 기능을 구현하세요. (* comment.js 파일 확인)
- 각 클릭 시 react로 상태를 어떻게 처리하는지
- redux toolkit을 사용

```js
export  const { getComments } = slice.actions;
export  const  commentsReducer = slice.reducer;
```
​
```js
getComments( state, action ) {
​
const  start = ( action.payload.page - 1 ) * state.limit;
const  limit = start + state.limit;
​
state.data = state.comments.filter(
​
( _ , index ) => {
  if(index >= start && index < limit ) return  true;
​  else  return  false;
}
);
​
state.current_page = action.payload.page;
}

```
- 위에 vanila.js 와 같이 페이지 네이션을 처리한다.
- getComments 라는 액션을 생성한다.
- initialState 에 data 라는 변수를 생성한 이유는 comments 임시 데이터는 유지하고 보여질 부분만 그때그때 data 변수를 생성한다.
​- 게시물을 보여주는 부분은 data를 참조해서 본다.
​

### 주요 학습 키워드
- 페이지 설정에 따른 댓글 데이터 가공 표현


#### 기타 - 부록들 전체
## Case18 : Pagination - 대기업 S사 프론트엔드 개발자님의 답안

### q1. 문제 상황에 대하여 Java Script로 동작을 구현시킬 수 있는 코드를 작성해보세요

#### A)

```js
/**
 * 페이징 객체
 * @param {*} commentContainerEl 
 * @param {*} paginationContainerEl 
 * @param {*} initialItems 
 */
const Pagination = function (
    commentContainerEl,
    paginationContainerEl,
    initialItems = []
) {
    if (this.constructor !== Pagination) {
        throw Error('객체를 생성후 사용해 주세요!');
    }
    /**
    * 현재 페이지 인덱스(0부터 시작)
    */
    this.currentPageIndex = 0;
    /**
    * 페이지당 최대 노출 목록 갯수
    */
    this.maxPageItemCount = 5;
    /**
     * 초기 데이터 세팅
     */
    this.commentItems = initialItems;
    /**
     * Comment 컨테이너
     */
    this.commentContainerEl = commentContainerEl;
    /**
     * Pagination 컨테이너
     */
    this.paginationContainerEl = paginationContainerEl;

    /**
     * 최초 화면을 랜더링
     */
    this.render();

    const onClickButtons = (event) => {
        /**
         *  버튼 컨테이너에서 이벤트를 위임받아 처리
         */
        const { target } = event
        if (target.tagName === 'BUTTON') {
            const index = Number(target.dataset.index);
            this.setCurrentPageIndex(index);
        }
    };

    this.paginationContainerEl
        .addEventListener('click', onClickButtons);

    /**
     * 랜더링된 페이지를 지우고 할당된 데이터를 모두 해제
     */
    this.destroy = () => {
        this.currentPageIndex = 0;
        this.commentItems = null;

        this.commentContainerEl.innerHTML = '';
        this.paginationContainerEl.innerHTML = '';

        paginationContainerEl.removeEventListener('click', onClickButtons);

        this.commentContainerEl = undefined;
        this.paginationContainerEl = undefined;
    }
};

/**
 * 데이터 변경
 * @param {*} commentItems 
 */
Pagination.prototype.setPageItems = function (commentItems) {
    if (this.constructor !== Pagination) {
        throw Error('객체를 생성후 사용해 주세요!');
    }
    this.commentItems = commentItems;
    this.render();
};

/**
 * 컨테이너 엘리먼트를 변경
 * @param {*} commentContainerEl 
 */
Pagination.prototype.setCommentContainerEl = function (commentContainerEl) {
    this.commentContainerEl = commentContainerEl;
};

/**
 * 페이징 컨테이너 변경
 * @param {*} paginationContainerEl 
 */
Pagination.prototype.setPaginationContainerEl = function (paginationContainerEl) {
    this.paginationContainerEl = paginationContainerEl;
}

/**
 * 게시글 목록 생성
 */
Pagination.prototype.makeCommentsHtml = function () {
    if (this.constructor !== Pagination) {
        throw Error('객체를 생성후 사용해 주세요!');
    }
    const {
        commentItems,
        currentPageIndex,
        maxPageItemCount
    } = this;
    const startIndex = currentPageIndex * maxPageItemCount;
    return commentItems
        .slice(startIndex, startIndex + maxPageItemCount)
        .map((item) => {
            const {
                id,
                profile_url,
                author,
                content,
                createdAt
            } = item;
            return (
                `<div class="commentWrap" data-id="${id}">
                    <img src="${profile_url}" alt="" />
                    ${author}
                    <div class="createdAt">
                        ${createdAt}
                    </div>
                    <div class="content">
                        ${content}
                    </div>
                </div>
                <hr />
                `
            );
        })
        .join('');
};

/**
 * 페이지 버튼 생성
 */
Pagination.prototype.makePaginationHtml = function () {
    if (this.constructor !== Pagination) {
        throw Error('객체를 생성후 사용해 주세요!');
    }
    const {
        commentItems,
        currentPageIndex,
        maxPageItemCount,
    } = this;
    const count = Math.ceil(commentItems.length / maxPageItemCount);
    const buttons = [];
    for (let i = 0; i < count; i++) {
        buttons.push(
            i === currentPageIndex
                ? `<button class="active" data-index=${i}>${(i + 1)}</button>`
                : `<button data-index=${i}>${(i + 1)}</button>`
        )
    }
    return buttons.join('');
};

/**
 * 템플릿 랜더링
 */
Pagination.prototype.render = function () {
    if (this.constructor !== Pagination) {
        throw Error('객체를 생성후 사용해 주세요!');
    }
    const {
        commentContainerEl,
        paginationContainerEl
    } = this;
    if (commentContainerEl && paginationContainerEl) {
        commentContainerEl.innerHTML = this.makeCommentsHtml();
        paginationContainerEl.innerHTML = this.makePaginationHtml();
        return true;
    }
    return false;
};

Pagination.prototype.setCurrentPageIndex = function (pageIndex) {
    if (this.constructor !== Pagination) {
        throw Error('객체를 생성후 사용해 주세요!');
    }
    this.currentPageIndex = pageIndex;
    this.render();
}

document.addEventListener('DOMContentLoaded', () => {
    const commentContainerEl = document.querySelector('#commentContainer');
    const paginationContainerEl = document.querySelector('#pageContainer');
    /**
     * 페이지네이션 객체 인스턴스 생성
     */
    const pagination = new Pagination(
        commentContainerEl, paginationContainerEl, comments);
})


```

##### 해설
> [!] 제공된 Question 템플릿과 다른 방법으로 문제를 풀이하였습니다. 참고 부탁드립니다.
- Pagination 객체를 만들고, 모든 인스턴스에서 공용으로 사용되는 메서드는 `prototype` 속성을 이용하여 할당하였습니다.
  - `prototype`을 이용한 속성은 해당 객체에서 생성되는 모든 인스턴스에서 참조하여 사용되기 때문에 인스턴스가 생성될때 마다 다시 생성되지 않고 모두 공유됩니다.
  - `prototype` 내부에서 `this` 객체를 참조하기 위해서 모두 `function` 표현식을 사용하였고 인스턴스를 통한 접근이 아닌, 직접 `prototype`을 접근하는 경우 에러를 발생하도록 만들어 두었습니다(Pagination으로 생성된 객체를 `bind`할 경우 직접 접근도 가능합니다.)

- Pagination 객체는 다음과 같은 구성입니다.
  - setPageItems: 페이지 데이터를 변경
  - setCommentContainerEl: 코멘트 컨테이너 객체 엘리먼트 변경
  - setPaginationContainerEl: 페이지네이션 컨테이너 엘리먼트 변경
  - makeCommentsHtml: 코멘트 마크업 생성
  - makePaginationHtml: 페이지네이션 마크업 생성
  - render: 페이지 랜더링
  - setCurrentPageIndex: 현재 페이지 인덱스 변경

- Pagination 객체를 이용하여 인스턴스를 생성하면 자동으로 지정된 엘리먼트 영역에 랜더링이 됩니다.
- `DOMContentLoaded` 이벤트를 이용하여 HTML이 파싱되는 즉시 화면을 그리도록 구현하였습니다(참고자료에 있는 `load` 이벤트와 차이점을 비교해 보세요!).

##### 참고자료
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/function
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype
- https://developer.mozilla.org/ko/docs/Web/Events/DOMContentLoaded
- https://developer.mozilla.org/ko/docs/Web/Events/load


###  q2.  jQuery 로 코드를 작성해보세요.
#### A)

```js
/**
 * 페이징 객체
 * @param {*} $commentContainerEl 
 * @param {*} $paginationContainerEl 
 * @param {*} initialItems 
 */
const Pagination = function (
    $commentContainerEl,
    $paginationContainerEl,
    initialItems = []
) {
    if (this.constructor !== Pagination) {
        throw Error('객체를 생성후 사용해 주세요!');
    }
    
    ...

    const onClickButtons = (event) => {
        const { target } = event
        /**
         * @see https://api.jquery.com/data/
         */
        const index = $(target).data('index');
        this.setCurrentPageIndex(index);
    };

    this.$paginationContainerEl
        .on('click', onClickButtons);

    /**
     * 랜더링된 페이지를 지우고 할당된 데이터를 모두 해제
     */
    this.destroy = () => {
        this.currentPageIndex = 0;
        this.commentItems = null;

        this.$commentContainerEl.html('');
        this.$paginationContainerEl.html('');

        /**
         * Jquery Event Delegation 기능을 활용
         * @see https://api.jquery.com/on/
         */
        $paginationContainerEl.off('click', 'button', onClickButtons);

        this.$commentContainerEl = undefined;
        this.$paginationContainerEl = undefined;
    }
};

...

$(() => {
    /**
     * DOMContentLoaded 동일한 시점에 호출
     * @see https://api.jquery.com/ready/
     */
    const $commentContainerEl = $('#commentContainer');
    const $paginationContainerEl = $('#pageContainer');
    /**
     * 페이지네이션 객체 인스턴스 생성
     */
    const pagination = new Pagination(
        $commentContainerEl, $paginationContainerEl, comments);
})


```
#### 해설
- 1번 문제와 내용은 거의 동일하지만 이벤트 바인딩, DOM을 제어하기 위해 Jquery 라이브러리를 사용하였습니다.

#### 참고자료
- https://api.jquery.com/ready/
- https://api.jquery.com/on/
- https://api.jquery.com/data/


###  q3.  React 로 코드를 작성해보세요.
#### A)

```js
// solution/2.others_1/q3_react_redux/src/store/modules/comments.js
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  commentItems: [...],
  currentPageIndex: 0,
  maxPageItemCount: 5,
};

const name = 'comments';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setCurrentPageIndex(state, action) {
      state.currentPageIndex = action.payload;
    }
  }
});

export const { getComments, setCurrentPageIndex } = slice.actions;
export const commentsReducer = slice.reducer;
```

```js
// solution/2.others_1/q3_react_redux/src/containers/CommentListContainer.js
...

function CommentListContainer() {
  /**
   * [!] 불필요한 상태값을 모두 불러들이는 경우 상태값 변화에 따라 불필요하게 컴포넌트 랜더링 로직이 실행될 수 있습니다.
   * 필요한 속성만 `useSelector`를 이용하여 불러 사용하는 습관을 만들면 좋습니다.
   */
  const { commentItems, currentPageIndex, maxPageItemCount } = useSelector(({ comments }) => {
    const { commentItems, currentPageIndex, maxPageItemCount } = comments;
    return {
      commentItems, currentPageIndex, maxPageItemCount
    };
  });

  const data = useMemo(() => {
    const startIndex = currentPageIndex * maxPageItemCount;
    return commentItems.slice(startIndex, startIndex + maxPageItemCount);
  }, [commentItems, currentPageIndex, maxPageItemCount]);

  return <CommentList data={data} />;
}

export default CommentListContainer;

// solution/2.others_1/q3_react_redux/src/containers/PageListContainer.js
...
function PaginationContainer() {

  const {
    commentItems,
    maxPageItemCount,
    currentPageIndex } = useSelector(
      (state) => state.comments
    );
  const dispatch = useDispatch();
  const boundActionCreators = bindActionCreators({ setCurrentPageIndex }, dispatch);

  /**
   * 페이지 갯수
   */
  const buttonCount = useMemo(() => {
    return Math.ceil(commentItems.length / maxPageItemCount);
  }, [maxPageItemCount, commentItems]);

  /**
   * 현재 활성된 페이지
   */
  const activeIndex = useMemo(() => currentPageIndex, [currentPageIndex]);

  const handleClickPaginationButton = (_, index) => {
    boundActionCreators.setCurrentPageIndex(index);
  }

  return (
    <PaginationButtons
      buttonCount={buttonCount}
      activeIndex={activeIndex}
      onClick={handleClickPaginationButton}
    />
  );
}

export default PaginationContainer;
```

```js
// solution/2.others_1/q3_react_redux/src/components/CommentList.js
...
function CommentList({ data }) {
  return data.map((comment, index) => {
    /**
     * [!] React Component에서 `key` 값은 `index`로 바로 적용하지 않고, 유니크한 값으로 지정하는게 좋습니다.
     * 컴포넌트가 랜더링될때 같은 레벨의 형제(siblings) 컴포넌트와 중복된 `key` 값을 갖게되면 불필요한 랜더링이 발생할 수 있습니다.
     */
    const key = `comment_` + index;
    const {
      author,
      profile_url,
      createdAt,
      content
    } = comment;
    return (
      <Comment key={key}>
        <img src={profile_url} alt="" />
        {author}
        <CreatedAt>{createdAt}</CreatedAt>
        <Content>{content}</Content>
        <hr />
      </Comment>
    )
  });
}

export default CommentList;

// solution/2.others_1/q3_react_redux/src/components/PageList.js
...
/**
 * 버튼 컴포넌트를 재사용 가능할 수 있도록  입력되는 데이터 값의 연산을 제거하여 결합도, 복잡도를 낮춤
 */
function PaginationButtons({ buttonCount = 0, onClick, activeIndex = 0 }) {
  if (buttonCount === 0) {
    /**
     * 버튼이 존재하지 않는 경우
     */
    return null;
  }
  const $buttons = Array(buttonCount).fill().map((_, index) => {
    const key = `button_${index}`;
    return (
      <PageButton
        active={index === activeIndex}
        onClick={(e) => onClick(e, index)} key={key}>
        {index + 1}
      </PageButton>
    );
  })

  return <PageListStyle>{$buttons}</PageListStyle>;
}

export default PaginationButtons;
```

##### 해설
> [!] 제공된 Question 템플릿과 다른 방법으로 문제를 풀이하였습니다. 참고 부탁드립니다.
- 상태값 및 일부 컴포넌트 네이밍 변경하였습니다.
- 기존 제공된 컨테이너와 Redux를 최대한 활용하였고 컴포넌트와 데이터 결합도를 최대한 낮췄습니다.
- Redux 액션 형식은 FSA(Flux Standard Action)를 사용하였습니다.
- 

##### 참고자료
- https://github.com/redux-utilities/flux-standard-action
- https://redux-toolkit.js.org/api/createSlice
- https://ko.reactjs.org/docs/hooks-reference.html#usememo
- https://ko.reactjs.org/docs/hooks-reference.html#usecallback
- https://ko.reactjs.org/docs/lists-and-keys.html#keys-must-only-be-unique-among-siblings
