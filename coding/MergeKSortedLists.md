<a href="https://leetcode.com/tag/linked-list/">전체 링크드 리스트 문제 </a>  
<a href="https://leetcode.com/problems/merge-k-sorted-lists/description/">참고해야할 사이트</a>    
## (영어)


## (해석)

## (풀이) 주석(ㅇ)

             
```    


## (풀이) 주석(x )
```js
let calPoints = function(ops) {
    const points = [];
    ops.forEach((op) => {
        switch (op) {
            case '+':
                points.push(points[points.length - 1] + points[points.length - 2]);
                break;
            case 'D':
                points.push(points[points.length - 1] * 2);
                break;
            case 'C':
                points.pop();
                break;
            default:
                points.push(parseInt(op));
                break;
        }
    });
    
    return points.reduce((success, point) => success + point);
};
```
## 기타
### 계산기 만들기
- <a href="https://blog.naver.com/ggamjige8888/221749074687">1</a>
- <a href="https://blog.naver.com/ggamjige8888/221749068131">2</a>
