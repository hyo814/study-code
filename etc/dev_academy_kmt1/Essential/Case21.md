# Case21 클래스
```ts
  interface Container {
  tagName;string;
  className: string;
  children?: string[];
  getTagName: () => string;
  getClassName: () => string;
}

abstract class Shape {
public static MIN _BORDER_WIDTH = 0;
public static MAX_BORDER_WIDTH = 30;

public readonly name : string = 'Shape';
protected _borderWidth:number;
private action!: string;

constructor (borderWidth:number = 0) {
this._borderWidth = borderWidth;

abstract area: () => number;

set borderWidth(width:number) {
  if(width >= Shape.MIN_BORDER_WIDTH && width <=Shape.MAX_BORDER_WIDTH) {
    this._borderWidth = borderWidth;
  } else {
  thrpw new Error ('borderWidth 허용 범위를 벗어난 동작을 시도 했습니다.');
  }
}

get borderWidth() : number {
  return this._borderWidth;
}
}

class Circle extends Shape {
  private _radius:number;
  public name:string= 'Circle';
  
  constructor(radius :number) {
    super();
    this._raidus = radius;
  }
  
  get radius () {
    return this._radius;
  }
  
  area = () => this. _radius = this. _radius = Math.PI;
  }
  
  class Rect extends Shape {
   private _width:number;
   private_hieght:number;
  
  constructor (width:number, height:number) {
    super();
    
    this._width =width;
    this._height = height;
  }
  
  get width () {
    return this._width;
  }
  
  area = () => this._width = this._height;
 
 }
 
 const circle = new Circle(50);
 const rect = new Rect(150,200);
 
 try {
  rect.borderWidth = 10;
  } catch (e) {
  
  }
  
  class MyContainer implements Container {
  tagName :string;
  className : string;
  
  construct(tagName:string, className: string) {
    this.tagName = tagName ;
    this. className = className;
  }
  
  getTagName = () => this.tagName;
  getClassName = () => this.className;
  
  }
  
 // 이해 안가는 코드는 작성 안하였습니다.
```
