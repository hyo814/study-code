## Case9 : Toggle button


### 케이스 주제
Q. on, off 기능 (toggle 기능)을 가지는 버튼 리스트 컴포넌트를 구현하십시오.


### 기능 요구사항
1. 각 버튼이 선택이 되었는지 안되었는지를 확인할 수 있다.
2. 여러개의 버튼 중 하나의 버튼만 toggle 할 수 있다.

### 문제
- q1. 데이터에 따른 버튼리스트를 가로로 출력하시오.

- q2. 한개의 버튼만이 on이 될 수 있도록 하시오.

- q3. 선택된 버튼의 index를 application으로 전달 하시오.


### 주요 학습 키워드
- 버튼 스타일 적용
- 컴포넌트와 어플리케이션과의 통신

### 문제 풀이
(webpack은 생략...)
```javascript
/*
* title: Toggle button class
* description: toggle button ui component
* configuration:
    selector: toggle button을 display할 영역,
    data: button으로 표현할 리스트,
    changeEvent: 버튼 클릭 시 이벤트
*/ 
export class ToggleButton {
    constructor(configuration) {
        // 내부 변수
        // toggle 된 버튼을 알기 위한 현재 선택된 button index
        this.selectedIndex = -1;

        // 설정정보
        // callback setup
        this.callback = configuration.changeEvent;

        // 초기 템플릿 display
        this.buttonElements = this.initialize(
            document.querySelector(configuration.selector), 
            configuration.data
        );

        // event listen
        this.eventBinding();
    }

    /*
    * title: toggle button display method
    * input: display 되는 element
    * output: button element list
    * description: 최초 생성할 때 button list를 출력한다. 템플릿을 관리한다.
    */
    initialize(selector, data) {
        let renderStr = '';
        for (let i = 0; i < data.length; i++) {
            renderStr += `
            <button class="toggle-button">
                <span class="${i > 0 ? 'border': ''}">${data[i]}</span>
            </button>
            `
        }

        selector.innerHTML = renderStr;
        // 생성된 button element를 리턴해준다.
        return document.querySelectorAll('.toggle-button');
    }

    /*
    * title: event binding method
    * description: 모든 이벤트를 처리한다.
    */
    eventBinding() {
        this.buttonElements.forEach((element, index) => {
            element.addEventListener('click', () => {
                if (this.selectedIndex === index) {
                    return;
                }

                if (this.selectedIndex > -1) {
                    this.buttonElements[this.selectedIndex].classList.remove('select');
                }

                this.selectedIndex = index;

                this.buttonElements[index].classList.add('select');

                this.callback(this.selectedIndex);
            })
        })

        
    }
}

```
