case 6
문법 - 참조와 복사

```js
let a = 10;
let b = a;

b = 20;
let o = {
isLoading:false,
};

function foo(o) {
o.isLoading = true;
}

foo(o);

console.log('done')

```

