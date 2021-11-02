## Case27 : Check box


### 케이스 주제
Q. 아래와 같이 작동하는 체크 박스를 구현하시오.
> 체크 박스는 여러 값들이 주어지고 그 중에서 여러 값을 선택할 수 있는 UI 입니다. 
> 기본적으로 type이 checkbox인 input tag를 사용해 만들며 이 체크 박스는 이렇게 input tag를 사용해도 되지만 
> 다른 tag를 사용해 커스텀하게 작성할 수도 있습니다. 
> 여러개를 선택할 수 있고 그에 따라 여러 체크 박스들이 제대로 렌더링이 될 수 있도록 추가적인 작업을 JavaScript로 해주어야 합니다.

### 기능 요구사항
요구 사항은 아래와 같다.
1. 하나의 form tag를 만든다.
2. 이 form tag 안에 좋아하는 음식과 관심사를 여러개 선택할 수 있는 체크 박스 UI를 최소 두개를 만든다.
3. form을 제출하면(type이 submit인 버튼을 누르면) 좋아하는 음식과 관심사가 각각 최소 하나씩 선택되었는지 검사한다.
   최소 하나씩 선택하지 않았으면 선택을 해야한다는 정보성 UI를 만들어 보여준다.
4. 검사를 무사히 통과했으면 현재 form이 최종적으로 어떤 데이터를 보내려는지 form UI 하단에 보여준다.

### 주요 학습 키워드
- submit event가 발생하면 formData를 이용해 value를 가져오고 배열로 만들어주기
- filter 함수를 사용하여 length 체크하기
- 입력한 정보를 innerHTML을 사용하여 DOM에 동적으로 추가하기

### 문제 풀이
## 해설
1. form tag를 활용해 라디오 박스를 만든다고 가정합니다.
2. form과 form이 다루는 데이터를 표현해줄 dom을 html 상에 만들어야 합니다.
3. form이 전체적으로 어떤 데이터를 다루는지(갯수, 종류 등) 알아야 검사 코드를 만들 수 있습니다.
4. 확인 버튼이 클릭되면 서버로 데이터를 보내기 전에 데이터의 유효성 검사를 해야합니다.
- 이를 위해 form tag에 submit 이벤트를 수신하는 event handler를 등록해야 합니다.
- 이 핸들러 안에서 검사를 진행합니다.
  - 현업에서 검사 코드에는 모든 항목에 대한 입력이나 선택을 했는지, 입력 값의 타입이 정확한지, 입력 값이 요구사항의 조건을 만족하는지 등이 포함될 수 있습니다.
- 검사를 통과하지 못했다면 사용자가 모든 항목에 대해서 입력 및 선택을 할 수 있도록 안내하는 UI를 만들어 보여줍니다.
- 검사를 통과했다면 작성 완료된 form 데이터를 보여줍니다(현업에선 API call을 합니다).
5. 이때 form tag는 type이 submit인 버튼이 클릭되면 기본적으로 페이지 새로고침을 하는데, 이 동작이 서비스에서 불필요한 경우엔 이 동작을 하지 않을 필요가 있습니다. 이를 위해 핸들러에서 넘어온 event 객체의 preventDefault 함수를 실행해서 기본 동작을 멈춥니다.
6. 핸들러 내부에서 form이 가진 데이터를 확인하기 위해서 FormData 클래스를 활용합니다. 이때 이 클래스로 만든 인스턴스는 타입이 FormData 입니다. iterator protocol이 FormData 내부에 정의되어 있기 때문에 for of loop 이용해 데이터 항목들을 순회할 수 있습니다. for loop를 사용하는 것이 꺼려진다면 Array의 from 함수를 이용해 배열로 만들어 쉽게 순회할 수도 있습니다.


```javascript
const $currentItem = document.querySelector('.CurrentItem');
const $formTag = document.querySelector('form');

$formTag.addEventListener('submit', (event) => {
  event.preventDefault();
  const formRecords = Array.from(new FormData($formTag));
  const foodRecords = formRecords.filter((record) => record[0] === 'food');
  const interestRecords = formRecords.filter((record) => record[0] === 'interest');

  if (foodRecords.length === 0 || interestRecords.length === 0) {
    $currentItem.innerHTML = '폼을 모두 작성해주세요.';
    return;
  }

  $currentItem.innerHTML = `
      좋아하는 음식 : ${foodRecords.map((record) => record[1]).join(', ')}
      관심사      : ${interestRecords.map((record) => record[1]).join(', ')} 
    `;
});

```
