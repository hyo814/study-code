# 20 Case 튜플

```js
//app.ts
const address : [number, string, string] = [14023, '서울시', '송파구'];
let [zipcode, addresss1] = address;
zipcode = '12345';

type BookInfo = [string,string, number]

const BookData; BookInfo[] = [
  ['헨리 8세', '세익스피어',1884],
  ['헨리 8세', '세익스피어',1884],
];

BookData.push(['a','b',23]);

function getArrayOnez() : any[] {
  return [14023,'서울시','송파구'];
}

type Address = [number, string, string];

function getArrayTwo(): Address {
return [14023,'서울시','송파구']
}

let address2 = getArrayTwo()[2];

address2 =12;

```
