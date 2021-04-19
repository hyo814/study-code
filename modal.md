## Case 15 : Modal Window

### 케이스 주제
Q. 모달 팝업 구현


### 기능 요구사항
1. 팝업을 엽니다를 누르면 팝업이 뜬다.
2. x 버튼을 누르면 팝업이 닫힘
3. 팝업 이외 부분을 누르면 닫힘
4. 팝업 안을 눌렀을 떄 닫히면 안됨


### 기능 작동 이미지
![modal](https://user-images.githubusercontent.com/12206933/105272499-d1757280-5bdc-11eb-99e8-ee43b83bc038.gif)


### 문제
q1. JavaScript - 주어진 템플릿(`q_index.html`)의 요소에 페이지에 맞는 요소를 표현하는 문제
q2. jQuery
1. JavaScript로 구현한 기능을 동일하게 jQuery로도 구현해보는 문제
2. https://jquerymodal.com/ 문서를 참조해서
3. 자바스크립트 소스 없이 완성하세요

q3. React - 주어진 코드를 이해하고, 상태를 조작하는 훅을 이용해서 완성

####  A)  중점포인트
- 모달이 떳을 때, 모달안을 클릭해도 안닫힌다.
- 모달 바탕을 클릭 했을 때, 모달도 닫혀야 된다.

#### q1
1.CSS의 z-index를 사용하여 팝업 / 배경 순서 위치 지정하기  
2.CSS의 pointer-events를 사용하여 popup이 없을 때, 이벤트가 발생하지 않도록 설정하기  
3.classList를 사용하여 버튼에 click event 발생 시, 팝업 보여주고 닫아주기  

자세히  
1 css 를 참고하세요.  
2 열기를 클릭했을 때 모달을 띄우도록 구현하세요.  
3 버튼을 눌렀을 때 작동하도록 구현하세요.  
4 모달 바탕을 클릭 했을 때 작동하도록 구현하세요.  

*주요 문법 사항
1. <a href='https://developer.mozilla.org/ko/docs/Web/API/Element/classList'>classlist</a>
2. <a href='https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener'>addEventListener</a>

#### q2
1. cdn 파일을 사용하세요
2. <a href="https://cdnjs.com/libraries/jquery-modal">1번</a>
3. <a href="https://jquerymodal.com/">2번</a>
