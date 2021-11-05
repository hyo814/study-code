#Case12 - 속성과 메소드

```ts
const obj = {
name:'HYO JIN',
age: 28,
getFamilyName: function() {
  return 'kim';
},
getLastName: () =>'Kim,
getBloodTyle() {
  return 'B'; 
  }
};

obj.name;
obj.age;
obj.getFamilyName();
obj.getFamilyName();

class Person {
  bloodType: string;

constructor (bloodType:string) {
  this. bloodType = bloodType;
}

set bloodType(byte:string) {
  if(btype==='A'|| btype==='B'||btype==='O'|| btype==='AB'} {
    this._bloodType = btype;
    }
  }
}

get bloodType () {
    return this._bloodType;
  }
}

const pl = new Person('B');

```
