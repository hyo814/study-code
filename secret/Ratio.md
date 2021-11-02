## Case30 : Rating UI


### 케이스 주제
별점을 평가할 수 있는 Rating UI를 구현하세요.

Q. 아래와 같은 스펙을 가진 Rating UI를 구현하세요.


### 기능 요구사항
1. 0 ~ N 개의 별을 표시합니다. (0.5점 단위)
2. 각 별은 비어있거나(Empty), 반만 차있거나(Half), 꽉 차있을 수 있습니다(Full). (3가지 각 이미지 파일은 assets 폴더 안에 있습니다.)
3. 별 위로 마우스오버하면 왼쪽부터 마우스 위치까지의 채워진 별로 표시합니다.
4. 클릭시 점수 상태를 업데이트합니다.
5. X 버튼을 클릭하면 별점을 0점으로 초기화합니다.

- 별의 갯수가 N값만 조정하면 쉽게 변경되도록 작성해보세요.

### 문제
q1. N점 만점의 Rating UI를 JavaScript(ES6+)로 구현해보세요.

q2. N점 만점의 Rating UI를 React Component로 구현해보세요.

### 문제 풀이
### q1. N점 만점의 Rating UI를 JavaScript(ES6+)로 구현해보세요.

#### A)
```js
// Score를 받아 별의 점수 표시를 바꿔주는 함수
const setDisplayScore = (score) => {
  const starList = [...$stars.children]
  starList.forEach((star, i) => {
    if (score > i) {
      if (score - i === 0.5) {
        star.className = 'star half'
      } else {
        star.className = 'star full'
      }
    } else {
      star.className = 'star empty'
    }
  })
}

// Score를 받아 점수 상태를 업데이트해주는 함수
const setScore = (score) => {
  setDisplayScore(score)
  $score.textContent = score
  state.score = score
}

// MouseEvent를 받아 Score를 0~N까지 0.5 scale 로 점수를 계산해주는 함수
const calculateScore = (e) => {
  const { width, left } = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - left
  const scale = width / MAX_SCORE / 2
  return (Math.floor(x / scale) + 1) / 2
}

// 마우스를 움직일때마다 마우스 위치에 해당하는 점수를 계산하여 별표시를 업데이트해주는 이벤트리스너
$stars.addEventListener('mousemove', (e) => {
  const score = calculateScore(e)
  setDisplayScore(score)
})

// 마우스가 별영역을 빠져나가면 기존 점수로 별점수 표시를 업데이트해주는 이벤트 리스너
$stars.addEventListener('mouseleave', () => {
  setDisplayScore(state.score)
})

// 마우스로 별 영역을 클릭하면 마우스 위치에 해당하는 점수를 상태로 업데이트해주는 이벤트 리스너
$stars.addEventListener('click', (e) => {
  const score = calculateScore(e)
  setScore(score)
})

// Reset 버튼을 누르면 점수 상태를 0점으로 초기화해주는 이벤트 리스너
$reset.addEventListener('click', () => {
  setScore(0)
})
```


### q2. N점 만점의 Rating UI를 React Component로 구현해보세요.

#### A)
```jsx
import React, { useState } from 'react'
import './StarRate.scss'
import EmptyStar from '../../assets/star-empty.svg'
import HalfStar from '../../assets/star-half.svg'
import FullStar from '../../assets/star-full.svg'
import Reset from '../../assets/reset.svg'

// 별의 갯수 = Score
const MAX_SCORE = 5

export const StarRate = ({ onChange, score }) => {
  // 표시되는 별의 상태
  const [displayScore, setDisplayScore] = useState(score)

  const handleMove = (e) => {
    const { width, left } = e.currentTarget.getBoundingClientRect()
    let x
    if ('offsetX' in e.nativeEvent) {
      x = e.nativeEvent.offsetX
    } else {
      x = e.nativeEvent.targetTouches[0].clientX - left
    }
    Array(MAX_SCORE * 2)
      .fill(0)
      .find(
        (_, i) =>
          x <= (width / (MAX_SCORE * 2)) * i + 1 || setDisplayScore((i + 1) / 2)
      )
  }

  return (
    <section>
      <div
        className="stars"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onTouchEnd={() => onChange(displayScore)}
        onMouseEnter={() => setDisplayScore(score)}
        onMouseLeave={() => setDisplayScore(score)}
        onClick={() => onChange(displayScore)}
      >
        {[...Array(MAX_SCORE)].map((_, i) => (
          <Star score={displayScore} idx={i} key={i} />
        ))}
      </div>
      <Reset
        className="reset"
        onClick={() => {
          onChange(0)
          setDisplayScore(0)
        }}
      />
    </section>
  )
}

const Star = ({ score, idx }) =>
  score > idx ? (
    score - idx === 0.5 ? (
      <HalfStar />
    ) : (
      <FullStar />
    )
  ) : (
    <EmptyStar />
  )
```

```scss
html,
body,
#app {
}
#app {
  display: grid;
  margin: 0;
  height: 100%;
  span {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 100px;
    font-size: 2rem;
  }
  section {
    justify-self: center;
    align-self: center;
    display: inline-flex;
    position: relative;
    height: 35px;
    .stars {
      height: 52px;
      cursor: pointer;
      svg {
        width: 48px;
        height: 48px;
        padding: 2px;
        position: relative;
        pointer-events: none;
      }
    }
    .reset {
      margin-left: 8px;
      width: 24px;
      height: 24px;
      padding: 14px;
      cursor: pointer;
    }
  }
}
```

### 주요 학습 키워드
- DOM Access, DOM Events(mousemove, mouseleave, click, etc.), MouseEvent, Mouse Position Calculation, useState, State Management
