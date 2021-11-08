# Case 24 컨텍스트

```ts
const person = {
    name: 'Hyo Jin Lim',
    age: 28,
    getAge() {
        return this.age;
    }
};

person.age;
person.getAge();

const age = person.getAge;

class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getAge() {
        return this.age;
    }
}

const p1 = new Person("HELLO", 30)
P1.getAge();

const myAge = p1.getAge;

myAge(); // p1 고정
```
