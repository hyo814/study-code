## Case10 : Chips UI


### 케이스 주제
Q. 임의 문자열을 추가 삭제할 수 있는 (SNS 태그 입력) 컴포넌트를 구현하십시오.


### 기능 요구사항
1. 텍스트 입력 후 엔터를 치면 리스트의 맨 앞에 추가가 된다.
2. 리스트 중에 아이템을 삭제 할 수 있다.

### 문제
- q1. 데이터에 따른 문자열 리스트와 입력 폼을 함께 출력하시오.

- q2. 입력된 문자열은 키보드 이벤트 엔터를 통해 리스트의 앞단에 추가 하시오.

- q3. 입력된 문자열을 삭제할 수 있도록 하시오.

- q4. 입력된 문자열에 대한 데이터를 가져올 수 있도록 하시오.

### 문제 풀이
(webpack은 생략)
1. javascript
```javascript
/*
* title: Chips class
* description: chips ui component
* configuration:
    selector: component를 display할 영역,
    data: component으로 표현할 리스트
*/ 
export class Chips {
    constructor(configuration) {
        // 설정정보
        this.data = configuration.data;
        // list가 출력되는 container element
        this.container = document.querySelector(configuration.selector);

        // 초기 템플릿 display
        this.chipElements = this.initialize(this.container, configuration.data);
        this.inputElement = this.initializeInput(this.container);
        // event listen
        this.eventBinding();
    }

    /*
    * title: 최초 data 기준으로 chip item을 display
    * input: display 되는 element
    * output: chip element list
    * description: 최초 생성할 때 item list를 출력한다.
    */
    initialize(selector, data) {
        for (let i = 0; i < data.length; i++) {
            selector.appendChild(this.chipTemplete(data[i]));
        }

        // 생성된 chip element를 리턴해준다.
        return selector.querySelectorAll('.chips-item');
    }

    /*
    * title: 최초 input element를 생성함.
    * input: display 되는 element
    * output: input element
    * description: 최초 한번 input element를 생성한다.
    */
    initializeInput(selector) {
        const inputElement = document.createElement('input');
        inputElement.classList.add('chips-input');
        inputElement.placeholder = 'enter text...';
        selector.appendChild(inputElement);
        return inputElement;
    }

    /*
    * title: chip item templete
    * input: chip label
    * output: chip element
    * description: chip item의 템플릿을 관리한다.
    */
    chipTemplete(data) {
        const newItem = document.createElement('div');
        newItem.classList.add('chips-item');
        newItem.innerHTML = `
            <span class="chips-label">${data}</span>
            <img class="chips-close" 
                src="./src/solution/presenter/chips/assets/close.svg">
        `;
        return newItem;
    }

    /*
    * title: event binding method
    * description: 모든 이벤트를 처리한다.
    */
    eventBinding() {
        // 삭제 이벤트.
        this.chipElements.forEach((element, index) => {
            element.querySelector('.chips-close').addEventListener('click', () => {
                const label = element.querySelector('.chips-label').innerHTML;
                this.removeData(label);
                element.remove();
            });
        });

        // input enter 이벤트 시 chip item 추가
        this.inputElement.addEventListener('keyup', (event) => {
            if (event.keyCode === 13) {
                // 새로운 아이템 생성
                const newItem = this.chipTemplete(event.target.value);
                // 삭제 이벤트 바인딩
                newItem.querySelector('.chips-close').addEventListener('click', () => {
                    const label = newItem.querySelector('.chips-label').innerHTML;
                    this.removeData(label);
                    newItem.remove();
                });
                // 컨테이너에 추가
                /*
                'beforebegin': targetElement그 자체 전에 .
                'afterbegin': targetElement첫 번째 자식 앞에.
                'beforeend': 막내 targetElement, 마지막 자식 뒤.
                'afterend': targetElement자체 후 .

                <!-- beforebegin -->
                <p>
                    <!-- afterbegin -->
                    foo
                    <!-- beforeend -->
                </p>
                <!-- afterend -->
                */
                this.container.insertAdjacentElement('afterbegin', newItem);
                // 데이터의 앞단에 새로운 텍스트 추가
                this.data.unshift(event.target.value);
                // input value 초기화.
                event.target.value = '';
            }
        });
    }

    removeData(label) {
        const targetIndex = this.data.findIndex((item) => item === label);
        this.data.splice(targetIndex, 1);
    }

    getChips() {
        return this.data;
    }
}

```
### 주요 학습 키워드
- 동적으로 추가되는 element 
- templete 분리
- element.insertAdjacentElement 함수 활용
