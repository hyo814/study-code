# 문법 - 함수

```js
function myFn (x) {
  return x + 100
}

// 함수는 식과 문에 대해 구분이 가능해야함
function sum(...args) {
  let s =0;
  
  for(let i=0; i< args.length; i++) {
    s= s+ args[i];
  }
  
  return s;
  
  // 함수가 꼭 알고 있는 형태가 아니라 call과 apply로 할 수 있음
  // 공통점 - context 객체
  // 차이점 - 
  const result = myFn(10);
  const abcSum = sum(10,20,30,40);
  
  const myFnV2 = fuction () {
  return 100;
  };
  
  myFnV2();
  myFnV2.call(null,);
  myFnV2.apply(null,);
  
  // 즉시 실행 함수
  (function() {
    console.log('즉시 실행 함수 실행!');
  }) ();
  
```
