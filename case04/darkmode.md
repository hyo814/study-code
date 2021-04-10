# 다크 모드 공부하기
1. 다크모드의 정의
- 소프트웨어에서 밝은 화면에 검은 글자 테마 대신에 어두운 화면에 흰 글자 테마를 지원하는 것. 
- 배경화면뿐만 아니라 유저 인터페이스 전반의 분위기를 의미.

1.1 타이머 함수와 예시
- setTimeout(함수, 시간) : 일정 시간 후 함수 실행(1000당 1초입니다.)
```javascript
const timer = setTimeout(() => {
  console.log('hello')
},3000)
}
```
- setInterval(함수, 시간) : 시간 간격마다 함수 실행
```javascript
const timer = setInterval(() => {
  console.log('hello')
},3000)
}
```
- clearTimeout() : 설정된 Timeout 함수를 종료
```javascript
const h1E1 = document.querySelector('h1')
h1El.addEventListener('click',()=>{
clearTimeout(timer)
})
```
- clearInterval() : 설정된 Interval 함수를 종료
```javascript
const h1E1 = document.querySelector('h1')
h1El.addEventListener('click',()=>{
clearInterval(timer)
})
```

1.2 localstorage

2. DarkMode의 Basic Code


3. DarkMode - window.matchMedia
- <a href="https://developer.mozilla.org/ko/docs/Web/API/Window"> window mdn </a>

4. DarkMode - react- styledComponent
- <a href="https://react-icons.github.io/react-icons/">react - icon</a>
- <a href="https://react-bootstrap.github.io/">react bootstrap</a>
- <a href=https://material-ui.com/>react material - ui</a>

5. DarkMode - react 기능 구현
