## Case1 : Context Menu


### 케이스 주제
Q. 버튼을 클릭하면 컨텍스트 메뉴가 나타나고, 메뉴를 선택하거나 그 외의 부분을 클릭하면 사라지는 팝오버 컴포넌트를 구현하세요


### 기능 요구사항
1. 임의의 메뉴 목록에 대하여 각 메뉴를 클릭하면 해당 메뉴에 관련된 문구가 떠있는 형태(팝오버)로 나타난다.
2. 팝오버 상태에서 해당 문구를 클릭하면 해당 메뉴가 사라진다.
3. 팝오버 상태에서 다른 메뉴를 클릭하면 해당 메뉴의 팝오버가 나타난다. 이 때 기존의 팝오버는 사라진다.


### 기능 작동 이미지
순서 :
최초상태 => 메뉴 하나에 마우스 오버 => 메뉴 클릭시 => 다른 메뉴에 마우스 오버 => 다른 메뉴 클릭시


### 문제
q1. 문제 상황에 대하여 Java Script로 동작을 구현시킬 수 있는 코드를 작성해보세요

q2. 문제 상황에 대하여 jquery로 동작을 구현시킬 수 있는 코드를 작성해보세요

q3. 문제 상황에 대하여 HTML(detail 태그)로 동작을 구현시킬 수 있는 코드를 작성해보세요

q4. 문제 상황에 대하여 React로 동작을 구현시킬 수 있는 코드를 작성해보세요

q5. 문제 상황에 대하여 React-CreatePortal 기능으로 동작을 구현시킬 수 있는 코드를 작성해보세요


### 주요 학습 키워드
- 이벤트 리스너, 이벤트 위임 구현 원리, detail 태그, React-Create Portal 등

### 문제풀이  
q1. 문제 상황에 대하여 Java Script로 동작을 구현시킬 수 있는 코드를 작성해보세요
```javascript
// 1. 초보자의 접근법
const items = document.querySelectorAll('.item');
items.forEach(function(item) {
  item.addEventListener('click', function(e) {
    item.classList.toggle('open');
    items.forEach(function(elem) {
      if (elem !== item) elem.classList.remove('open');
    });
  });
});



// 2. 더 나은 방법 (1)
const wrapper = document.querySelector('.wrapper');
const items = document.querySelectorAll('.item');
wrapper.addEventListener('click', function(e) {
  const targetElem = e.target;
  e.stopPropagation();
  if (!targetElem.classList.contains('item')) return;
  targetElem.classList.toggle('open');
  items.forEach(function(elem) {
    if (elem !== targetElem) elem.classList.remove('open');
  });
});
document.body.addEventListener('click', function(e) {
  if (e.target.classList.contains('context')) return;
  items.forEach(function(elem) {
    elem.classList.remove('open');
  });
});



// 3. 더 나은 방법 (2)
const wrapper = document.querySelector('.wrapper');
const items = document.querySelectorAll('.item');

document.body.addEventListener('click', function(e) {
  const targetClassList = e.target.classList;
  if (targetClassList.contains('context')) return;
  if (targetClassList.contains('item')) {
    targetClassList.toggle('open');
    items.forEach(function(elem) {
      if (elem !== e.target) elem.classList.remove('open');
    });
    return;
  }
  items.forEach(function(elem) {
    elem.classList.remove('open');
  });
});


/**
 * <해설>

- 초보자들은 DOM 제어와 관련하여 이벤트 리스너를 잔뜩 작성하곤 한다. 목록의 각 아이템 하나하나마다 등록하는 식이다. 본 문제의 경우를 예로 들면 다음과 같이 

items.forEach(function(item) {
  item.addEventListener(‘click’, …)
}

이렇게 작성하면 크게 두가지 문제가 있다. 

(1) 이벤트 감시대상이 많은 만큼 메모리에 부담이 된다. 
(2) 어떤 변경에 의해 목록에 아이템이 추가될 경우 해당 아이템은 감시대상에 속하지 않아 팝오버 동작이 이뤄지지 않는다. 따라서 새로운 아이템이 추가될 때마다 그에 대한 리스너를 등록해주어야 한다.

반면 리스너를 상위 노드에 등록하면 위 두가지 문제가 모두 해결된다. 따라서 리스너 등록은 최소화하는 것이 바람직하다. 

이벤트 핸들러를 최소화하기 위해서는 캡쳐링/버블링을 이해하는 것이 필요하다. 나아가 리스너 함수의 첫번째 인자인 event 객체의 내부에 어떤 정보가 들어있는지를 알 필요가 있다.

- stopPropagation과 preventDefault를 구분하여 사용할 수 있는지도 중요한 요소


- (추가로 생각해볼 문제) click 이벤트의 감시 대상을 더욱 줄일 수는 없을까? 그럴 경우의 장단점은?

장점: 리스너가 줄어듦.
단점: 1) 함수 내부에 등장할수밖에 없는 조건문에 대한 최적화 필요.
      2) 개별 등록/해제 가능한 리스너에 비해 관리가 어려움

* 
 */
 ```

q2. 문제 상황에 대하여 jquery로 동작을 구현시킬 수 있는 코드를 작성해보세요
```javascript
const $wrapper = $('.wrapper');
const $items = $wrapper.find('.item');
$wrapper.on('click', '.item', function(e) {
  e.stopPropagation();
  $(this).toggleClass('open').siblings().removeClass('open');
});
$('body').on('click', function(e) {
  $items.removeClass('open');
});


// 2. 리스너를 더 줄인 버전
const $items = $('.wrapper .item');
$('body').on('click', function(e) {
  const item = $(e.target);
  if (item.is('.item')) {
    item.toggleClass('open').siblings().removeClass('open');
  } else {
    $items.removeClass('open');
  }
});
```  

q3. 문제 상황에 대하여 HTML(detail 태그)로 동작을 구현시킬 수 있는 코드를 작성해보세요
``` javascript
const items = document.querySelectorAll('details');
document.body.addEventListener('click', function(e) {
  if (e.target.nodeName !== 'P' && e.target.nodeName !== 'SUMMARY') {
    items.forEach(function(item) {
      item.removeAttribute('open');
    });
    return;
  }
  items.forEach(function(item) {
    if (item !== e.target.parentElement) {
      item.removeAttribute('open');
    }
  });
});
```

q4. 문제 상황에 대하여 React로 동작을 구현시킬 수 있는 코드를 작성해보세요
```javascript
import React, { useState, useEffect } from "react";
import "./style.css";
import Detail from "./Detail";
import dummyData from "./dummyData";

export default function App() {
  const [openedIndex, setOpen] = useState(null);

  const togglePopover = index => e => {
    e.preventDefault();
    e.stopPropagation();
    // do something here.
    setOpen(openedIndex === index ? null : index);
  };

  const closeAll = (e) => {
    // do something here.
    if (e.target.nodeName !== 'P') setOpen(null);
  };

  useEffect(() => {
    document.body.addEventListener("click", closeAll);
    return () => {
      document.body.removeEventListener("click", closeAll);
    };
  });

  return (
    <div className="wrapper">
      {dummyData.map(({ text, context }, i) => (
        <Detail
          key={`detail${i}`}
          text={text}
          context={context}
          open={openedIndex === i}
          onToggle={togglePopover(i)}
        />
      ))}
    </div>
  );
}
```

q5. 문제 상황에 대하여 React-CreatePortal 기능으로 동작을 구현시킬 수 있는 코드를 작성해보세요
```javascript
import React, { useRef, useState, useEffect } from "react";
import "./style.css";
import Detail from "./Detail";
import dummyData from "./dummyData";
import ContextPortal from "./ContextPortal";

export default function App() {
  const [openedIndex, setOpen] = useState(null);
  const detailRefs = useRef([]);

  const togglePopover = index => e => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(e.target.parentElement.open ? null : index);
  };

  const closeAll = () => {
    setOpen(null);
  };

  useEffect(() => {
    document.body.addEventListener("click", closeAll);
    return () => {
      document.body.removeEventListener("click", closeAll);
    };
  }, []);

  return (
    <>
      <div className="wrapper">
        {dummyData.map(({ text, context }, i) => (
          <Detail
            key={`detail${i}`}
            ref={r => (detailRefs.current[i] = r)}
            text={text}
            context={context}
            open={openedIndex === i}
            onToggle={togglePopover(i)}
          />
        ))}
      </div>

      <ContextPortal /* 채워 넣으세요. */
        target={detailRefs.current[openedIndex]}
        children={<p>{dummyData[openedIndex]?.context}</p>}
      />

    </>
  );
}
```
