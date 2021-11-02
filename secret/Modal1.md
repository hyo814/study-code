## Case15 : Modal window


### 케이스 주제
Q. 모달 팝업 구현


### 기능 요구사항
 1. 팝업을 엽니다를 누르면 팝업이 뜬다.
 2. x 버튼을 누르면 팝업이 닫힘
 3. 팝업 이외 부분을 누르면 닫힘
 4. 팝업 안을 눌렀을 떄 닫히면 안됨

### 문제
q1. JavaScript - 주어진 템플릿(`q_index.html`)의 요소에 페이지에 맞는 요소를 표현하는 문제
q3. React - 주어진 코드를 이해하고, 상태를 조작하는 훅을 이용해서 완성


### 문제풀이
q1. JavaScript - 주어진 템플릿(`q_index.html`)의 요소에 페이지에 맞는 요소를 표현하는 문제
```javascript

document.addEventListener("DOMContentLoaded", () => {
  
  const bodyBlackout = document.querySelector('.body-blackout')
  const popupModal = document.querySelector('.popup-modal')

  document.querySelector('.popup-trigger').addEventListener('click' , function(){
  
    popupModal.classList.add('is--visible')
    bodyBlackout.classList.add('is-blacked-out')

  });

  popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
 })

  bodyBlackout.addEventListener('click', () => {
    
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
  })

});

```

q3. React - 주어진 코드를 이해하고, 상태를 조작하는 훅을 이용해서 완성
-가. 블랙 아웃
```javascript
import styled from "styled-components";

const BodyBlackoutStyle = styled.div`
  position: absolute;
  z-index: 1010;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .65);
  display: ${props => props.isVisible ? "block" : "none" };
`;

export default function BodyBlackout({ isVisible , onSetIsVisible  }){
  return <BodyBlackoutStyle 
    isVisible={isVisible} 
    onClick={ ()=>{ onSetIsVisible(false) } }
  />
}
```

-나. 모달 조성
```javascript
import styled from "styled-components";

const ModalStyle = styled.div`
  height: 365px;
  width: 650px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 45px;
  display:block;
  z-index: 1011;
  display: ${props => props.isVisible ? "block" : "none" };
  pointer-events: ${props => props.isVisible ? "auto" : "none" };

  .popup-modal__close {
    position: absolute;
    font-size: 5rem;
    right: -10px;
    top: -10px;
    cursor: pointer;
  }
  
`;

export default function Modal({ isVisible , onSetIsVisible }){

  return <ModalStyle isVisible={isVisible}>
    <i 
      className="fa fa-window-close popup-modal__close"
      onClick={() => onSetIsVisible(false) }
    >  
    </i>
    <h1>
      팝업 제목
    </h1>
    <div>
      팝업 내용 123 <br />
      팝업 내용 123 <br />
      팝업 내용 123 <br />
      팝업 내용 123 <br />
      팝업 내용 123
    </div>
  </ModalStyle>
}
```

### 주요 학습 키워드
- CSS의 z-index를 사용하여 팝업 / 배경 순서 위치 지정하기
- CSS의 pointer-events를 사용하여 popup이 없을 때, 이벤트가 발생하지 않도록 설정하기
- classList를 사용하여 버튼에 click event 발생 시, 팝업 보여주고 닫아주기
