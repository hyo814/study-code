# Case10 인터페이스와 타입 별칭
## 차이점 : 구체적인 타입을 제시하는 타입 별칭만 가능하다는 점에서 데이터를 표현 할때는 타입 별칭을 하며 데이터를 포괄하는 객체일때는 인터페이스를 사용하도록 한다. ( 제안)

```ts
// app.ts 어떠한 방법으로 활용이 되고 있는지
import * as allTypes from './type';

const foo: allTypes.FooFunction = function(){
  return '아무 쓸모 없는 함수';
 };
 
 const iUser: allTypes.IUser = {
  id; 1,
  name: '빌게이츠',
  email:'bill@ms.com',
  receiveInfo:false,
  active:'Y'
 };
 
 const iUserProfile: allTypes.TUserProfile = {
  id: 1,
  name:'빌게이츠';
  email:'bill@ms.com',
  receiveInfo:false,
  active:'Y',
  profileImage:'http://...',
  github:'okay'
 };
 
 const IUserProfiles: allTypes.TUserProfile[] = [];
 
 const iStyle: allTypes.IOnlyNumberValueObject = {
  borderWidth : 5;
  width:300,
  height:100,
 };
 
 const tStyle:allTypes.TOnlyBooleanValueObject = {
  border:true,
  visible:false,
  display:true,
 };
 
 // 함수 정의 표현식
 const getApi: allTypes.IGetApi = (url,serarch = '') =>
  return new Promise(resolve => resolve('OK'));
 };
 
 getApi('/api/users')
  .then(data=>console.log(data));
 
class Rect Implements allTypes.IRect {
  id: number;
  x: number;
  y:number;
  width:number;
  height:number;
  
  constructor(x;number, y;number, width:number. height:number) {
    this.id = Math.random() * 10000;
    this.x = x;
    this.y = y;
    this.width= width;
    this.height= height;
    }
  }
  
  function createDefaulstRect (cstor:allTypes.IRect) {
    return new cstor(0,0,100,100);  
  }
  
  const rect1 = new Rect (0,0, 100,.20);
  const rect2 = createDefaulstRect(Rect); 
  
```

```ts
// type.ts 타입별 선언을 어떠한 방법으로 하고 있는지
export type YesOrNo = 'Y' |'N';
export type DayOfWweek = '월'|'화'|'수'|'목'|'금'|토'|'일';
export enum DayOfTheWeek = {'월',화',수',목',금','토','일'};

export type Name =string;
expport type Email = string;
export type FooFunction = () => string;

// 타입어스와 인터페이스는 혼합하여 사용 가능
export interface IUser { // 인터페이스는 중복을 한다고 해도 밑에 적는 것과 같은 원리를 내포 하고 있다. => 굳이 그러지마
  readonly id:number;
  readonly name: Name; // 혼용
  email:string;
  receiveInfo:boolean;
  active:YesOrNo;
}

export interface IUser {
 address?: string; // 물음표면 옵션이지만 반대로 라면 이건 필수라서 문제를 일으킬 예정
 
export type TUser = {
  readonly id:number;
  readonly name: Name; // 혼용
  email:string;
  receiveInfo:boolean;
  active:YesOrNo;
}

export type TUser = { // 타입 알리어스는 중복을 지원해 주지 않는다.
 address?: string;
 
// extension User , User를 그대로 사용하고 싶을 경우
export interface IUserProfile extends IUser {
  profileImage;string;
  github? : string;
  twitter: string;
}

// 사실상 동일 기능으로 보이지만 혼용해서 사용해도 되는 case!!
export type TUserProfile = IUser & {
  profileImage: stsring;
  github? : string;
  twitter: string;
}

// 합성 및 혼용의 케이스
export interface Color {
  fontColor: string;
  strokeColor:string;
  borderColor:string;
  backgroundColor:string;
}

export type Display {
  display:'none' | 'block';
  visiblity : boolean;
  opacity :number;
}

export type Geometry ={
  width: number;
  height:number;
  padding:number;
  margin:number;
}

export interface Istyle extends Color,Display, Geometry {
  tagName: string; // 인터페이스
}

export type TStyle = Color & Display & Geometry & {
  tagName :string; // 엘리어스
 }
 
 exprt interface IOnlyNumberValueObject {
  [key: string]:number;
 }
 
 export type TOnlyBooleanValueObject =  {
  [prop: string] :boolean;
 }
 
 // 함수를 표현할 때 예시
 export interface IGetApi {
 (url: string, search?: string): promise <string>;
 }
 
 export type TGetApi {
 (url;string, search?:string): Pormise<string>;
 }
 
 export interface IRect {
  id:number;
  x:number;
  y:number;
  width:number;
  height:number;
 }
 
// 생성자 호출
export interface IRectAConstructor {
  new (x:number, y:number, width:number , height:number): IRect;
}
```
