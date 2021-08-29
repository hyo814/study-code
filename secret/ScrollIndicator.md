## Case 22 : Scroll Indicator

### 케이스 주제
Q. 요구사항 : 스크롤 시 현재 남의 컨텐츠의 분량을 화면에 표기해 주세요.


### 기능 요구사항
- 스크롤을 내리면 상단에 현재 스크롤이 어느 정도 내려갔는지를 나타내는 상태 표시바를 만드시오.
- 스크롤이 끝까지 내려가면 Indicator도 끝까지 이동하고, 스크롤을 다시 상단으로 올리면 Indicator도 다시 뒤로 돌아가게 만드시오.

### 기능 작동 이미지
<a href='https://ifh.cc/v-LQM3Xo' target='_blank'><img src='https://ifh.cc/g/LQM3Xo.gif' border='0'></a>


### 문제
- JavaScript로 해당 기능을 구현하시오.
1. scrollBar의 width값을 변경하는 방식으로 indicator를 적용하시오.
2. 스크롤 시 translateX를 사용하여 scrollBar 위치를 변경하시오.


### 주요 학습 키워드
q1. 크로스 브라우징을 고려하여 현재 문서의 높이를 가져오기
q2. width 또는 translateX를 사용하여 남은 컨텐츠를 표기하는 방법 학습하기

### 기타( 검색 할 수 있는 목록들)
1. infinity scroll
2. scrollTop
3. pagination
