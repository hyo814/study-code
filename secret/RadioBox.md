## Case26 : Radio Box


### 케이스 주제
라디오 박스는 여러 값들이 주어지고 그 중에서 단 하나를 선택할 수 있는 UI 입니다. 

기본적으로 type이 radio인 input tag를 사용해 만들며, 브라우저가 type이 radio인 input들 중 name 속성이 같은 것들은 하나만 선택되도록 강제하고 그에 따라 렌더링 합니다. 

이 라디오 박스는 이렇게 input tag를 사용해도 되지만 다른 tag를 사용해 커스텀하게 작성할 수도 있습니다. 다만 이 경우엔 하나만 선택되고 그에 따라 렌더링이 될 수 있도록 추가적인 작업을 JavaScript로 해주어야 합니다.

- Q. 아래와 같은 스펙을 가진 라디오 박스를 만들어보세요.


### 기능 요구사항
- 하나의 form tag를 만든다.
- 이 form tag 안에 연락 수단과 배송 수단을 선택할 수 있는 라디오 박스 UI를 최소 두개를 만든다.
- form을 제출하면(type이 submit인 버튼을 누르면) 모든 수단이 선택되었는지 검사한다.
- 항목 하나라도 선택하지 않았으면 모든 항목에 대한 선택을 해야한다는 정보성 vUI를 만들어 보여준다.
- 검사를 무사히 통과했으면 현재 form이 최종적으로 어떤 데이터를 보내려는지 form UI 하단에 보여준다.

### 문제
q1. Javascript로 위 기능을 구현하시오.

### 문제 풀이
### Javascript - 각각의 이벤트 리스트에 코드를 작성하여 위 기능이 동작되는 콤보 박스를 완성하시오.

#### A)
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

##### 해설
1. form tag를 활용해 라디오 박스를 만든다고 가정합니다.

2. form과 form이 다루는 데이터를 표현해줄 dom을 html 상에 만들어야 합니다.

3. form이 전체적으로 어떤 데이터를 다루는지(갯수, 종류 등) 알아야 검사 코드를 만들 수 있습니다.
- 이를 위해 이 정보를 나타내는 객체나 배열을 활용할 수 있습니다. 예제 코드에선 formMap 이라는 객체를 만듭니다.

4. 확인 버튼이 클릭되면 서버로 데이터를 보내기 전에 데이터의 유효성 검사를 해야합니다.
- 이를 위해 form tag에 submit 이벤트를 수신하는 event handler를 등록해야 합니다.
- 이 핸들러 안에서 검사를 진행합니다.
  * 이 검사를 할때 위에서 만든 formMap 이라는 객체를 활용합니다.
  * 현업에서 검사 코드에는 모든 항목에 대한 입력이나 선택을 했는지, 입력 값의 타입이 정확한지, 입력 값이 요구사항의 조건을 만족하는지 등이 포함될 수 있습니다.
- 검사를 통과하지 못했다면 사용자가 모든 항목에 대해서 입력 및 선택을 할 수 있도록 안내하는 UI를 만들어 보여줍니다.
- 검사를 통과했다면 작성 완료된 form 데이터를 보여줍니다(현업에선 API call을 합니다).

5. 이때 form tag는 type이 submit인 버튼이 클릭되면 기본적으로 페이지 새로고침을 하는데, 이 동작이 서비스에서 불필요한 경우엔 이 동작을 하지 않을 필요가 있습니다. 이를 위해 핸들러에서 넘어온 event 객체의 preventDefault 함수를 실행해서 기본 동작을 멈춥니다.

6. 핸들러 내부에서 form이 가진 데이터를 확인하기 위해서 FormData 클래스를 활용합니다. 이때 이 클래스로 만든 인스턴스는 타입이 FormData 입니다. iterator protocol이 FormData 내부에 정의되어 있기 때문에 for of loop 이용해 데이터 항목들을 순회할 수 있습니다. for loop를 사용하는 것이 꺼려진다면 Array의 from 함수를 이용해 배열로 만들어 쉽게 순회할 수도 있습니다.

### 주요 학습 키워드
- submit event가 발생하면 formData를 이용해 value를 가져오고 배열로 만들어주기
- Object.key를 사용하여 폼을 모두 작성했는지 체크하기
- 입력한 정보를 innerHTML을 사용하여 DOM에 동적으로 추가하기
