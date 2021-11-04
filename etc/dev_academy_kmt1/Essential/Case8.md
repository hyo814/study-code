# Case8 반복문
```js
//for 문, 반복에 대한 비교를 시도 하니까 막상 안할 수도 있음
const arr = ['a','b','c','d'];

for(let i=0; i<ar r.length; i++) {
 console.log(arr[i]);
}
```

```js
// while문 => like for 문, 반복에 대한 비교를 시도 하니까 막상 안할 수도 있음
let i = 0;
while(i<arr.length) {
 console.log(arr[i]);
 i++;
}
```

```js
//do while => 실행을 하고나서 분석하는 편, 최소 1번 실행
// 초기값을 세팅 해주세요.
i=0;
do {
 console.log(arr[i]);
 i++;
} while (i < arr.length)
```

```js
// for of 문이라고 합니다. => 배열의 순회에만 관심이 있을 때
for (const item of arr) {
 console.log(item);
}
```

```js
// for in :: 키의 값을 하나씩 꺼내 올때 사용 하는 편 1
for (const index in arr) {
 console.log(arr[index];
 }
```

```js
// for in :: 키의 값을 하나씩 꺼내 올때 사용 하는 편 2
for (const key in obj) {
 console.log(key)
}
```


