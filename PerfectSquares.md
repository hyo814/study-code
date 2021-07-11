<a href="https://leetcode.com/tag/queue/">큐 전체</a>  
<a href="https://leetcode.com/problems/perfect-squares/">참고해야할 사이트</a>    
## (영어)
Given an integer n, return the least number of perfect square numbers that sum to n.

A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

Constraints:
1 <= n <= 10^4


## (해석)
완벽한 사각형  
정수가 주어지면 합이 가 되는 완전제곱수의 최소 개수를n 반환 합니다 n .    
완벽한 사각형 정수의 제곱 인 정수이고; 다시 말해서, 그것은 자신과 어떤 정수의 곱입니다.
예를 들어, 1, 4, 9, 및 16는 완전제곱이고 3, 11는 그렇지 않습니다.  


## (예시)
<a href='https://ifh.cc/v-vSo6Z1' target='_blank'><img src='https://ifh.cc/g/vSo6Z1.png' border='0'></a>


## (풀이) - 주석 (ㅇ)
```js
/** * @param {number} n * @return {number} */
let numSquares = function(n) {
    let squart_root = 1;
    let dp = [];
    // for 문 동안에 1*1 =1 , 2*2 = 4 , 3*3 = 9 순으로 구분을 할 예정
    // 숫자로 예시를 하자면 1,4,9 와 같은 완전 수 일때는 갯수를 1개로 치지만
    // 만약, 1 일때 1 , 4 일때 1 , 9 일때 1
    // 그렇다면 2,3,5 와 같은 비 완전수 일때는 갯수를 1개가 아닌 최소한의 수로 나열 하여 구분
    // 2 일때 1+1 이므로 2, 3 일때 1+1+1 이므로 3, 5일 때 위에 4+ 1로 인하여 2로 확인
    // 예시안의 12의 경우 4가 3 확인
    //13의 경우 1+4+9 이므로 3 확인
    for(let i = 1;i<n+1;i++){
        if(i === squart_root*squart_root){
            dp[i] = 1;
            // 사각형이 그림화 된다면 더하기가 되고
            squart_root ++ ;
            // 만약 그렇지 않다면 최소한의 숫자에서의 덧셈을 추가할 것
        }else{
            let min = i;
            for(let j = squart_root-1;j>0;j--){
                min = Math.min(min,1+dp[i-j*j]);  
            }
            dp[i] = min;
        }
    }
    return dp[n];
};
```


## (풀이) - 주석 (x)
```js
let numSquares = function(n) {
    let squart_root = 1;
    let dp = [];
    for(let i = 1;i<n+1;i++){
        if(i === squart_root*squart_root){
            dp[i] = 1;
            squart_root ++ ;
        }else{
            let min = i;
            for(let j = squart_root-1;j>0;j--){
                min = Math.min(min,1+dp[i-j*j]);  
            }
            dp[i] = min;
        }
    }
    return dp[n];
};
```
