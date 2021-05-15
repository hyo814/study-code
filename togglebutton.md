## Case9 : Toggle button
토글 버튼이란?  
토글이란 하나의 설정 값으로부터 다른 값으로 전환하는 것입니다.   
토글이라는 용어는 오직 두 가지 상태밖에는 없는 상황에서, 스위치를 한번 누르면 한 값이 되고, 다시 한번 누르면 다른 값으로 변하는 것을 의미한다고 합니다.

### 케이스 주제
Q. on, off 기능 (toggle 기능)을 가지는 버튼 리스트 컴포넌트를 구현하십시오.

### 기능 요구사항 && 기능 작동 이미지
1. 각 버튼이 선택이 되었는지 안되었는지를 확인할 수 있습니다.
2. 여러개의 버튼 중 하나의 버튼만 toggle 할 수 있습니다.
<a href='https://ifh.cc/v-BAR62p' target='_blank'><img src='https://ifh.cc/g/BAR62p.png' border='0'></a>

### 문제
- q1. 데이터에 따른 버튼리스트를 가로로 출력하시오.
- q2. 한개의 버튼만이 on이 될 수 있도록 하시오.
- q3. 선택된 버튼의 index를 application으로 전달 하시오.

### 주요 학습 키워드
- 버튼 스타일 적용
- 컴포넌트와 어플리케이션과의 통신

### 문제 풀이(해야함)

### 기타 : 함수형 컴포넌트로 토글 버튼을 구현 해보자 (javascript /css 참조)
1.장점: css를 기반으로 class가 on 일때 토글 버튼이 구현 될 수 있습니다.  
2.단점: 버튼 갯수가 많아지면 그만큼의 함수가 길어져서 map이나 혹은 다른 방법의 구현을 찾아야 할 수도 있습니다.  
3.알아야하는 내용
- useState : Hook을 호출해 함수 컴포넌트(function component) 안에 state를 추가합니다.  
  이 state는 컴포넌트가 다시 렌더링 되어도 그대로 유지될 것입니다.   
  useState는 현재의 state 값과 이 값을 업데이트하는 함수를 쌍으로 제공합니다.   
  우리는 이 함수를 이벤트 핸들러나 다른 곳에서 호출할 수 있습니다. 
  그러한 점이 class의 this.setState와 거의 유사하지만, 이전 state와 새로운 state를 합치지 않는다는 차이점이 있습니다.
  만약 class로 구현을 하게 된다면 constructor 안에서 this.state를 설정함으로써 값을 초기화했을 것 입니다.
  ```javascript
  class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  ```
  ```javascript
  import React, { useState } from 'react';

  function Example() {
  // 새로운 state 변수를 선언하고, 이것을 count라고 합시다.
  const [count, setCount] = useState(0);
  ```
  
- 삼향연산자 :

4. 참고할 자료들  
<a href="https://react.vlpt.us/basic/07-useState.html">1번</a>  
<a href="https://ko.reactjs.org/docs/hooks-state.html">2번</a>  
<a href="https://ko.reactjs.org/docs/hooks-state.html">3번</a>  
<a href="https://velog.io/@sdc337dc/0.%ED%81%B4%EB%9E%98%EC%8A%A4%ED%98%95-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8">차이점</a>  
- 위 링크들을 통해서 참고를 하게 된다면 함수형 컴포넌트 일수록 최신 형태의 기술일 확률이 높습니다.   
  하지만 클래스에 비해 자료가 많지 않다는 점도 고려하면서 개발을 해야합니다.  
  물론 유지 보수를 위한 클래스도 알아야합니다.
  
5. 해당 코드
```javascript
import React, {useState} from "react";

export default function Toggle() {
    // 각 버튼 toggle 기능 className "on" : " "
    const [state, setState] = useState(false);
    const [state1, setState1] = useState(false);
    const [state2, setState2] = useState(false);

    const toggle = () => {
        setState(!state);
    }
    const toggle1 = () => {
        setState1(!state1);
    }
    const toggle2 = () => {
        setState2(!state2);
    }

    return (
            <div className="popup">
                <div className="p_con">
                <table>
                 <tbody>
                    <tr>
                        <th className="settingButton" scope="row">
                            <button type="button" className={state ? "on" : ""} onClick={toggle}>Bold</button>
                        </th>
                        <th className="settingButton" scope="row">
                            <button type="button" className={state1 ? "on" : " "} onClick={toggle1}>ltalic</button>
                        </th>
                        <th className="settingButton" scope="row">
                            <button type="button" className={state2 ? "on" : " "} onClick={toggle2}>Underline</button>
                        </th>
                    </tr>
                 </tbody>
                </table>
                </div>
            </div>
    );
}
```

```css
/* popup - 디자이너의 css , 참고만 할것 */
.popup { 
         background-color:#323a46; 
         box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2); 
         position:relative; 
         align-self:center; 
         margin:0 auto;  
         min-height:140px; 
         border-radius: 5px; 
         padding: 0 20px; 
         box-sizing: border-box; 
        }
         
.popup::before { 
                content:""; 
                 display: inline-block; 
                 width: 100%; 
                 height: 4px; 
                 background-color: #71b6f9; 
                 position: absolute; 
                 top: 0; 
                 left: 0;
                }

.popup .p_con table { 
                      width: 100%; 
                     }
                     
.popup .p_con table th { 
                         width: 100px; 
                         height: 50px;  
                         border: 1px solid #282e38;  
                        }
                        
.popup .p_con table th button { 
                                width: 100%; 
                                height: 100%; 
                                background-color: #404853; 
                                color: #999; 
                                font-size: 15px; 
                                font-weight: bold; 
                               }
                               
.popup .p_con table th button[class="on"] { background-color: #519ee8; color: #fff; text-decoration: underline; }

.popup .p_con table td { 
                        width: 200px; 
                        background-color: #3b4452; 
                        border: 1px solid #282e38; 
                        line-height: 50px; 
                        font-size: 11px;   
                        }
                        
.popup .p_con table td .color { 
                                float: left; 
                                width: 40px; 
                                height: 26px; 
                                background-color: #000; 
                                margin: 10px; 
                                position: relative; 
                                top: 2px; 
                               }
                               
.popup .p_con table td button { 
                                background-color: #2b364a; 
                                width: 26px; 
                                height: 26px; 
                                border-radius: 13px; 
                                font-size: 11px;  
                                position: relative; 
                                top: -3px;
                                margin-left: 10px; 
                               }

```

<a href='https://ifh.cc/v-UuRyqc' target='_blank'><img src='https://ifh.cc/g/UuRyqc.gif' border='0'></a>

### material-ui 혹은 bootstrap을 통해서 토글을 구현 해보자
- 가.material-ui  
<a href="https://material-ui.com/components/toggle-button/">material-ui의 토글 버튼</a>  
<a href='https://ifh.cc/v-fIzpyD' target='_blank'><img src='https://ifh.cc/g/fIzpyD.png' border='0'></a>  

- 나.껐다가 켰다하면서 이동하는 장면이 토글이랑 비슷하다고 생각이 되어서 고른 list   
<a href="https://material-ui.com/components/tabs/">메뉴바의 tab 활용</a>    
탭은 관련된 컨텐츠를 기반으로 그룹간의 탐색을 위치 이동 합니다.  
<a href='https://ifh.cc/v-zhtMIo' target='_blank'><img src='https://ifh.cc/g/zhtMIo.png' border='0'></a> 

- 다.<a href="https://react-bootstrap.netlify.app/components/buttons/#toggle-button-props">reactbootstrap</a>  
