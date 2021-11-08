# Case 23 프로토 타입

```js

const c1 = {
    name: 'C1',
    color: 'red',
};

const c2 = {
    name: 'C2',
    width: 300,
};

const c3 = {
    name: 'C3',
    height: 100,
}

c1.__proto__ = c3;
c3.__photo__ = c2;

function Foo(name) {
    this.name;
}

Foo.prototype;

const f = new Foo('Hyo Jin Lim');

```
