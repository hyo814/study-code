# Case 16 데이터로서의 객체
```ts
// 변경이 쉬운 구조
function makeBox (
width:number;
height:number;
borderRadius:number,
backgrooundColor:string
): Box {
  return {
  width,
  height,
  borderRadius,
  backgorundColor
  }
  
  makeMox(100,100,0,'blue')
  
```


```ts
// 변경이 어려운 구조
type Box = {
width:number;
height:number;
borderRadius:number;
backgroundColor:string;
borderWidth?:number;
color?:string
['className']?:string;
}

let box:Box = {
width:200,
hieght:200,
borderRadus;5,
backgroundColor:'red'
};
``` 


```ts
// 클래스 구조
class Shapeimplements Box {
  width:number;
  height:number;
  borderRadius:number;
  backgroundColor:string;

constructor(
  width:number,
  height:number,
  borderRadious:number,
  backgorundColor:string
) {
  this.width = width;
  this.hieght=height;
  this.borderRadius=borderRadius;
  this.backgroundColor =backgroundColor;
  }
}

const boxShape = new Shape(10.10.0.'blue')

```
