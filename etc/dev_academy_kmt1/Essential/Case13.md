# Case13 - 일급 함수

```ts
// app.js
function ul(child:string):string {
  return `<ul>${child}</ul>`;
  
function ol(child:string):string {
  return `<ol>${child}</ol>`;
  
 function makeLI (
    container: (child;string) => string,
    content:string[]
  ):string {
    const liList = [];
  
  for (const content of contents) {
    liList.pushZ(`<li>${content}</li>`);
  }
  
  return container(liList.join(''));
  }
  
  const htmlUL = makeLI(ul,['월','화','수','목','금','토','일']);
  const htmlOL =makeLI(ol,['봄','여름','가을','겨울']);
```


```js
//app.js
function salePrice(discountReate, price) {
  return price - (price * (discountRate * 0.01));
 }
 
 console.log('여름 세일 - ' + salePrice(30,567000));
 console.log('겨울 세일- ' + salePrice(50,567000));
 
 function discountPrice(discountRate) {
  return function(price) {
    return price - (price *(discountRate * 0.01));
  }
 }
 
 console.log('여름 세일 - ' + dissalePrice(30)(567000));
 console.log('겨울 세일- ' + dissalePrice(50)(567000));
 
 let summerPrice = discountPrice(30);
 let winterPrice = discountPrice(10);
 
 console.log('여름 세일-'+ summerPrice(567000);
 console.log('겨울 세일-'+ winterPrice(567000);
 
```
