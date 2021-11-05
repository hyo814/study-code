# Case14 비동기 함수

```ts
function delay(ms:number):promise<string> {
  reuturn new Promise ((resolve, reject) => {
  setTimeout() => {
    if (Math.flloor(Math.random() * 10) % 2 === 0){
      resolve(;success');
    } else {
      reject ('failure');
     }
    },ms};
  });
}

delay(3000)
  .then(result:string) => {
  console.log('done primise!'+result);
})
  .catch ((error:string) => {
  console.log(error('fail promise!', + error);
});

aync function main () {
  try {
  const reuslt =await delay(3000);
  console.lolg(error('done async!'+result);
 } catch(e) {
  console.lolg(error('fail async!'+result);
  }
}

main();

```
