#Case9 예외
##  예외적인 상황을 어떠한 방법으로 처리 할 것인가
### 반환 값을 내거나 불명확한 상황에 대해서 예외구문을 사용할 수 있도록 한다.


```js
// 예외를 바로 발생 시킬 수 있도록 하는 케이스
function doException(){
 throw new Error('와우! 오류야!');
 }
 
function main() {
 doException();
}

main();
```

```js
// try- catch 문을 사용시
function doException(){
  throw new Error('와우! 오류야!');
}
 
function main() {
 try{
   doException();
  } catch (e) {
   console.log(e);
  } finally {
   console.log('done');
  }
}

main();
```

```js
// no 예외처리
function doException(){
 throw new Error('와우! 오류야!');
}
 
 function noException(){
  return true;
 }
 
function main() {
 try{
   noException();
  } catch (e) {
   console.log(e);
  } finally {
   console.log('done');
  }
}

main();
```

```js
// 상황에 따른 콜백을 하고 싶다면
function doException(){
 throw new Error('와우! 오류야!');
}
 
 function noException(){
  return true;
 }
 
 fucntion callException(type) {
 if(type === 'do') {
   doException();
  } else {
   noException();
  }
 }
 
function main() {
 try{
   callException('do');
  } catch (e) {
   console.log(e);
  } finally {
   console.log('done');
  }
}

main();

```
