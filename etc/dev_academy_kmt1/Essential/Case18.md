# Case18 배열

```js
// books에 넣기
const books = [];
books[0] = "헨리 6세 1부";
books[1] ="헨리 6세 2부";
books[2] ="헨리 6세 제 3부";

// 배열 - 새로운 데이터를 넣는다 제일 마지막에 
books.push("리처드 3세")
books.push("실수 연발")
books.push("말광량이 길들이기")


books.pop();
books.pop();

const oneBooks = books.slice(1,2);

const twoBooks = books.splice(1,2,'햄릿', '오셀로','리어왕');

twoBooks.unshift('한 여름 밤의 꿈');

const allBooks = books.join();

const nextBooks = oneBooks.concat(twoBooks);

const nextBookList = [...oneBooks,twoBooks];

```
