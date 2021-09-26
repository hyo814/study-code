## Case25 : Combo Box


### 케이스 주제
드롭다운 리스트는 단순히 클릭하면 리스트가 나오는 형태뿐 아니라, input 태그로 값을 입력하고 input 우측의 버튼을 눌러 값 목록을 드롭다운 리스트로 볼 수 있는 형태로도 만들 수 있습니다. 이를 콤보 박스라고 합니다.
Q. 아래와 같은 스펙을 가진 콤보 박스를 만들어봅니다.


### 기능 요구사항
- 하나의 input tag를 만듭니다.
- 이 input에 타이핑을 해서 값을 입력할 수 있습니다.
- 타이핑을 할때 엔터키를 치면 입력한 값을 드롭다운 리스트에 추가합니다.
- 드롭다운 리스트는 안보이다가 input tag 우측의 버튼을 누르면 나옵니다.
- (옵션) 엔터키를 쳐서 값을 드롭다운 리스트에 추가할때 입력이 되었다는 표시를 하는 notification을 만듭니다.
- 드롭다운 리스트의 가로 크기는 input + button의 가로이고 세로 크기는 임의의 숫자로 고정합니다.
- 이때 드롭다운 리스트에 height 크기를 넘어갈 정도로 값이 차면 스크롤을 할 수 있도록 합니다.


### 기능 작동 이미지
![example](https://user-images.githubusercontent.com/59094619/134638576-3cec6005-b905-49c7-b880-618bd29e70e5.gif)


### 문제
q1. Javascript - 각각의 이벤트 리스트에 코드를 작성하여 위 기능이 동작되는 콤보 박스를 완성합니다.


### 주요 학습 키워드
- CSS animation을 사용하여 항목이 추가 되었을 때, classList를 add하여 알림메세지 보여주기(CustomEvent 사용)
- keyup 이벤트를 사용하여 입력한 항목을 배열에 추가 후, innerHTML을 사용하여 DOM에 동적으로 추가하기
- setTimeout을 사용하여 일정시간 후 알림메세지를 자동으로 사라지게 하여 UX개선

### 코드와 문제 풀이
```js
const toggleItemList = () => {
  const isVisible = $itemList.style.visibility === "visible";
  $itemList.style.visibility = isVisible ? "hidden" : "visible";
};

$inputTag.addEventListener("keyup", (event) => {
  const { value } = event.target;
  if (!value) {
    return;
  }

  if (event.key === "Enter") {
    items.push(value);
    document.dispatchEvent(new CustomEvent(ITEM_ADDED_EVENTNAME));
    $itemList.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
  }
});

$arrowDown.addEventListener("click", () => {
  toggleItemList();
});

$itemList.addEventListener("click", (event) => {
  if (event.target.nodeName !== "LI") {
    return;
  }

  $inputTag.value = event.target.innerText;
  // 실무에선 변수로 활용
  $currentItem.textContent = `현재 아이템: ${event.target.innerText}`;
  toggleItemList();
});

document.addEventListener(ITEM_ADDED_EVENTNAME, () => {
  $notification.classList.add("Notification--show");
  $notification.classList.remove("Notification--hide");

  window.setTimeout(() => {
    $notification.classList.add("Notification--hide");
    $notification.classList.remove("Notification--show");
  }, 3000);
});
```


#### 정리된 해설
1. 콤보 박스 만들기라는 요구 사항을 더 작은 단위로 분해하면 값을 입력하고 드롭다운 리스트에 추가할 수 있는 input tag를 만드는 것과 그렇게 만들어진 값들을 보여줄 수 있는 드롭다운 리스트를 만드는 것으로 나눌 수 있습니다.

2. input tag에 값을 입력하고 엔터키를 쳐서 드롭다운 리스트에 값을 추가해야 하므로 기본적으로 input tag에 event listener를 활용해야 합니다.
- 이때 값이 없는 경우를 처리해야 하고
- 엔터키가 눌렸을때 드롭다운 리스트에 추가할 수 있도록 값의 배열에 값을 추가 합니다.
- (option) 추가로, 값이 추가되었을때 추가되었음을 알릴 수 있는 notification도 함께 있으면 UX에 도움이 됩니다.
- 추가된 값을 드롭다운 리스트에 보여주어야 하는데 여기엔 몇가지 방법이 있습니다.
  * 값을 추가했을때 곧바로 드롭다운 리스트 dom에 렌더링을 해두고 input tag 우측의 화살표 버튼이 눌렸을때 CSS를 이용해 보여주는 방법
  * 값을 배열로 받아두었다가 화살표 버튼이 클릭되었을때 dom에 렌더링 하는 방법

3. 그 다음 화살표 버튼이 눌렸을때 드롭다운 리스트를 보여주어야 합니다.
- 이때도 클릭을 감지해서 보여줘야 하기 때문에 화살표 버튼에 event listener를 활용해야 합니다.
- 드롭다운 리스트의 화면 표시 여부를 변수로 처리해도 되고
- 이렇게 상태를 관리하지 않고 단순히 CSS class를 toggle 하는 방법으로 처리해도 됩니다.

4. 값들이 몇개 추가되어 드롭다운 리스트를 열었을때, 항목 하나하나를 클릭할 수 있어야 하고 클릭하면 현재 선택된 값으로 input tag가 채워져야 합니다.
- 이때 event listener는 모든 li tag에 각각 다는 것은 자원 낭비이므로 ul tag 하나에 붙여서 event delegation을 활용하는 것이 좋습니다.
- 클릭 이벤트로 li tag의 text 값을 받았으면 드롭다운 리스트를 다시 toggle 해주고 현재 선택된 값을 input tag에 표시해줍니다.
  * 실무에선 이 콤보 박스를 활용할때 선택된 값을 상태관리 대상으로 삼아서 다른 로직에 활용합니다.


##### 기타(관련된 링크들)
- https://mui.com/components/autocomplete/
- https://react-bootstrap.github.io/components/dropdowns/
- https://codepen.io/naradesign/pen/WNpwdXw?editors=1100
- https://codepen.io/naradesign/pen/ZEeWyZO
