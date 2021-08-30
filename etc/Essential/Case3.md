case3


```js
function addAge(age) {
if (typeof age =='number') {
return age + 1;
} else {
throw 'ERROR!!!'
}
}       

let age = addAge(30);

console.log(age);

age = 10;
age = false;
age = {};
         
```   

```ts
function addAge (age:number):number {
return age + 1;
}

let age:number = addAge(30);

console.log(age);
               
```   
