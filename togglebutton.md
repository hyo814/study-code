## Case9 : Toggle button
토글 버튼이란?  
토글이란 하나의 설정 값으로부터 다른 값으로 전환하는 것입니다.   
토글이라는 용어는 오직 두 가지 상태밖에는 없는 상황에서, 스위치를 한번 누르면 한 값이 되고, 다시 한번 누르면 다른 값으로 변하는 것을 의미한다고 합니다.

### 케이스 주제
Q. on, off 기능 (toggle 기능)을 가지는 버튼 리스트 컴포넌트를 구현하십시오.

### 기능 요구사항 && 기능 작동 이미지
1. 각 버튼이 선택이 되었는지 안되었는지를 확인할 수 있다.
2. 여러개의 버튼 중 하나의 버튼만 toggle 할 수 있다.
<a href='https://ifh.cc/v-BAR62p' target='_blank'><img src='https://ifh.cc/g/BAR62p.png' border='0'></a>

### 문제
- q1. 데이터에 따른 버튼리스트를 가로로 출력하시오.
- q2. 한개의 버튼만이 on이 될 수 있도록 하시오.
- q3. 선택된 버튼의 index를 application으로 전달 하시오.

### 주요 학습 키워드
- 버튼 스타일 적용
- 컴포넌트와 어플리케이션과의 통신

### 문제 풀이

### 기타 : 함수형 컴포넌트로 토글 버튼을 구현 해보자

### material-ui 혹은 bootstrap을 통해서 토글을 구현 해보자
- 가.material-ui  
<a href="https://material-ui.com/components/toggle-button/">material-ui의 토글 버튼</a>  
<a href='https://ifh.cc/v-fIzpyD' target='_blank'><img src='https://ifh.cc/g/fIzpyD.png' border='0'></a>  

- 나.껐다가 켰다하면서 이동하는 장면이 토글이랑 비슷하다고 생각이 되어서 고른 list   
<a href="https://material-ui.com/components/tabs/">메뉴바의 tab 활용</a>    
탭은 관련된 컨텐츠를 기반으로 그룹간의 탐색을 위치 이동 합니다.  
<a href='https://ifh.cc/v-zhtMIo' target='_blank'><img src='https://ifh.cc/g/zhtMIo.png' border='0'></a> 

- 다.<a href="https://react-bootstrap.netlify.app/components/buttons/#toggle-button-props">reactbootstrap</a>  
