<a href="https://leetcode.com/tag/stack/">스택 전체</a>  
<a href="https://leetcode.com/problems/baseball-game/description/">참고해야할 사이트</a>    
## (영어)
You are keeping score for a baseball game with strange rules. The game consists of several rounds, where the scores of past rounds may affect future rounds' scores.

At the beginning of the game, you start with an empty record. You are given a list of strings ops, where ops[i] is the ith operation you must apply to the record and is one of the following:

1.An integer x - Record a new score of x.  
2."+" - Record a new score that is the sum of the previous two scores. It is guaranteed there will always be two previous scores.  
3."D" - Record a new score that is double the previous score. It is guaranteed there will always be a previous score.  
4."C" - Invalidate the previous score, removing it from the record. It is guaranteed there will always be a previous score.  

Return the sum of all the scores on the record.

Constraints:  
1.1 <= ops.length <= 1000  
2.ops[i] is "C", "D", "+", or a string representing an integer in the range [-3 * 104, 3 * 104].  
3.For operation "+", there will always be at least two previous scores on the record.  
4.For operations "C" and "D", there will always be at least one previous score on the record.  


## (해석)
이상한 규칙으로 야구 경기의 점수를 기록하고 있습니다. 게임은 여러 라운드로 구성되어 있으며 과거 라운드의 점수가 향후 라운드의 점수에 영향을 줄 수 있습니다.

게임을 시작할 때 빈 레코드로 시작합니다. 문자열 목록이 제공됩니다 ops. 여기서 ops[i]는 레코드에 적용해야 하는 작업이고 는 다음 중 하나입니다.ith

1.정수 x- 의 새 점수를 기록합니다 x.  
2."+"- 이전 두 점수의 합으로 새로운 점수를 기록합니다. 항상 두 개의 이전 점수가 있을 것임을 보장합니다.  
3."D"- 이전 점수의 두 배인 새 점수를 기록합니다. 항상 이전 점수가 있을 것임을 보장합니다.  
4."C"- 기록에서 제거하여 이전 점수를 무효화합니다. 항상 이전 점수가 있을 것임을 보장합니다.  

레코드에 있는 모든 점수의 합계를 반환 합니다 .

제약:  
1.1 <= ops.length <= 1000  
2.ops[i]는 "C", "D", "+"또는 범위의 정수를 나타내는 문자열 입니다.[-3 * 104, 3 * 104]  
3.작업의 "+"경우 기록에는 항상 최소 두 개의 이전 점수가 있습니다.  
4.작업 "C"및 의 "D"경우 레코드에 항상 이전 점수가 하나 이상 있습니다.  

## (예시)
<a href='https://ifh.cc/v-MC1syS' target='_blank'><img src='https://ifh.cc/g/MC1syS.png' border='0'></a>  
<a href='https://ifh.cc/v-Flsg7G' target='_blank'><img src='https://ifh.cc/g/Flsg7G.png' border='0'></a>

## (풀이) 주석(ㅇ)
```js```  
## (풀이) 주석(x )
```js```
