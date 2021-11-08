# Case 22 인스턴스
```ts

function CartV1 (){
  this.cart =[];  
  this.currentId = 0;
}

CartV1.propertype.getNewId = function() {
  this. currentID++;
  return this.currendtId;
};

CartV1.createItem = function (name, price) {
  return {
  name, price
  };
 };
 
 CartV1.propertype,addItem = function(item) {
 this.cart.push({
 ...item,
 id:this.getNewId(),
 
```
