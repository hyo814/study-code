## Case 21 : Modal Window 2


### 케이스 주제
Q. 이미지를 클릭하면 그 이미지 정보를 담고 있는 모달창이 등장하고, 레이어를 클릭하면 모달창이 사라지는 기능을 만드세요.


### 기능 요구사항
- Unsplash의 List photo API를 사용해서 이미지 정보를 리스트로 화면에 띄우고,
- 특정 이미지를 클릭했을 때, 그 이미지에 대한 설명이 기재된 모달창을 띄우세요.
- 이미지에 대한 설명은 해당 이미지의 데이터 속성 값으로 리스트 안에 미리 넣어두는 형태로 처리하시오.
- 모달창을 제외한 외부 여백 공간 클릭 시 모달창이 사라지도록 하세요.

### 주요 학습 키워드
- 객체 형태로 데이터 속성값이 정보를 저장하여 이를 가져오는 방법을 학습합니다.
- 레이어 팝업을 처리하는 방법을 익히게 됩니다.

#### A)
- Unspalsh API : https://unsplash.com/documentation#list-photos


- JSON.stringify() : 자바스크립트 값을 JSON 객체를 String 객체로 변환
- JSON.parse() : String 객체를 JSON 객체로 변환

1. API 통신
2. 콜백 함수
3. 이미지 템플릿 및 클릭 이벤트 추가
4. 이미지 표기 및 modal 이벤트 추가