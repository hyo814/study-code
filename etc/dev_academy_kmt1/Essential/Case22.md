# Case 22 인스턴스

```js

function CartV1() {
    this.cart = [];
    this.currentId = 0;
}

CartV1.propertype.getNewId = function () {
    this.currentID++;
    return this.currendtId;
};

CartV1.createItem = function (name, price) {
    return {
        name, price
    };
};

CartV1.propertype, addItem = function (item) {
    this.cart.push({
        ...item,
        id: this.getNewId(),
    });
};

CartV1.propertype.clearCart = function(item) {
    this.cart = [];
    this.currentId = 0;
};

const shoppingCartV1 = new CartV1();

shoppingCartV1.addItem(CartV1.createItem('수박',8000))
shoppingCartV1.addItem(CartV1.createItem('사과',12000))
shoppingCartV1.addItem(CartV1.createItem('두부',2000))


```
