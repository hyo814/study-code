<a href="https://leetcode.com/tag/array/">배열 전체</a>  
<a href="https://leetcode.com/problems/pascals-triangle/description/">참고해야할 사이트</a>    
## (영어)
Given an integer numRows, return the first numRows of Pascal's triangle.
In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

Example 1:
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
Example 2:
Input: numRows = 1
Output: [[1]]
 
Constraints: 1 <= numRows <= 30

## (한글)
정수 numRows가 주어지면 파스칼 삼각형의 첫 번째 numRows를 반환합니다.
파스칼의 삼각형에서 각 숫자는 다음과 같이 바로 위에있는 두 숫자의 합입니다.

예 1 :

입력 : numRows = 5
출력 : [[1], [1,1], [1,2,1], [1,3,3,1], [1,4,6,4,1]]
예 2 :

입력 : numRows = 1
출력 : [[1]]

제약 : 1 <= numRows <= 30

# 파스칼의 삼각형 공식
<a href='https://ifh.cc/v-SbTWf8' target='_blank'><img src='https://ifh.cc/g/SbTWf8.png' border='0'></a>
<a href='https://ifh.cc/v-0YPHnz' target='_blank'><img src='https://ifh.cc/g/0YPHnz.png' border='0'></a>
-<a href='https://ifh.cc/v-cm1PyD' target='_blank'><img src='https://ifh.cc/g/cm1PyD.png' border='0'></a>
삼각형을 그리는 규칙은 다음과 같습니다.
가.숫자가 들어갈 칸을 첫 번째 줄에는 1개, 두 번째 줄에는 2개, 세 번째 줄에는 3개 이런 식으로 한 줄씩 내려가면 한 칸씩 늘어나게 정삼각형 모양으로 만든다.
나.첫 번째 줄과 두 번째 줄의 3칸에는 1을 쓴다.
다.세 번째 줄부터는 줄의 양쪽 끝 칸에는 1을 쓰고 나머지 칸에는 바로 윗줄에 위치한 칸 중 해당 칸과 인접해 있는 두 칸의 숫자를 더해서 그 값을 쓴다.  
-(기타)  
<a href="https://namu.wiki/w/%ED%8C%8C%EC%8A%A4%EC%B9%BC%EC%9D%98%20%EC%82%BC%EA%B0%81%ED%98%95">기타</a>

## 문제 풀이
```js
var generate = function(numRows) {
    var triangle = [];

//사용자가 0개의 행을 요청하면 0개의 행을 얻게 됩니다.
    if(numRows == 0) { 
        return triangle
    }

    for (var i = 0; i < numRows; i++) {

        triangle[i] = [];
//다음으로는 for 문을 사용하여 numRows를 통해 삼각형을 만듭니다.
//삼각형의 첫번쨰 행을 추가하고 모든 행의 첫 번째 요소는 항상 1입니다.
        triangle[i][0] = 1;

        for (var j = 1; j < i; j++) {
            triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
        }
//행을 반복하는 동안 두번째 루프를 사용하여 각 행의 요소를 만듭니다.
//각 심각형 요소는 왼쪽 위와 오른쪽 위 및 오른쪽 위 요소의 합과 같습니다.
        triangle[i][i] = 1;
    }

    return triangle;
}
```

-(심화)  
  <a href="https://leetcode.com/problems/pascals-triangle-ii/">심화</a>
