<a href="https://leetcode.com/tag/queue/">해당 주제</a>    
<a href="https://leetcode.com/problems/open-the-lock/">참고해야할 사이트</a>      

## (영어)
You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'. The wheels can rotate freely and wrap around: for example we can turn '9' to be '0', or '0' to be '9'. Each move consists of turning one wheel one slot.

The lock initially starts at '0000', a string representing the state of the 4 wheels.

You are given a list of deadends dead ends, meaning if the lock displays any of these codes, the wheels of the lock will stop turning and you will be unable to open it.

Given a target representing the value of the wheels that will unlock the lock, return the minimum total number of turns required to open the lock, or -1 if it is impossible.

 

Example 1:

Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
Output: 6
Explanation:
A sequence of valid moves would be "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202".
Note that a sequence like "0000" -> "0001" -> "0002" -> "0102" -> "0202" would be invalid,
because the wheels of the lock become stuck after the display becomes the dead end "0102".
Example 2:

Input: deadends = ["8888"], target = "0009"
Output: 1
Explanation:
We can turn the last wheel in reverse to move from "0000" -> "0009".
Example 3:

Input: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
Output: -1
Explanation:
We can't reach the target without getting stuck.
Example 4:

Input: deadends = ["0000"], target = "8888"
Output: -1
 

Constraints:

1 <= deadends.length <= 500
deadends[i].length == 4
target.length == 4
target will not be in the list deadends.
target and deadends[i] consist of digits only.

## (해석)
당신 앞에는 4개의 원형 바퀴가 달린 자물쇠가 있습니다. 각 휠에는 10개의 슬롯이 '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'있습니다. 바퀴는 자유롭게 회전하고 랩 어라운드 할 수 있습니다 우리가 설정할 수 있습니다 예를 들어 '9'수 '0', 또는 '0'수 '9'. 각 이동은 한 바퀴를 한 슬롯으로 돌리는 것으로 구성됩니다.

잠금은 처음에 에서 시작하며 '0000'4개의 바퀴 상태를 나타내는 문자열입니다.

deadends막다른 골목 목록이 제공 됩니다. 즉, 자물쇠에 이러한 코드가 표시되면 자물쇠의 바퀴가 회전을 멈추고 열 수 없게 됩니다.

target잠금을 해제할 바퀴의 값을 나타내는 것이 주어지면 잠금을 여는 데 필요한 최소 총 회전 수를 반환하거나 불가능한 경우 -1을 반환합니다.

 

예 1:

입력: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
 출력: 6
 설명:
유효한 이동 순서는 "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202"입니다.
"0000" -> "0001" -> "0002" -> "0102" -> "0202"와 같은 시퀀스는 유효하지 않습니다.
디스플레이가 막다른 골목 "0102"가 된 후 자물쇠의 바퀴가 끼이기 때문입니다.
예 2:

입력: deadends = ["8888"], target = "0009"
 출력: 1
 설명:
마지막 바퀴를 반대로 돌려 "0000" -> "0009"에서 이동할 수 있습니다.
예 3:

입력: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], 대상 = "8888"
 출력: -1
설명:
막히지 않고는 목표에 도달할 수 없습니다.
예 4:

입력: deadends = ["0000"], 대상 = "8888"
 출력: -1
 

제약:
1 <= deadends.length <= 500
deadends[i].length == 4
target.length == 4
대상 이 목록에 없습니다deadends .
target및 deadends[i]숫자로만 구성됩니다.

### 문제 풀이
```md
```


### (풀이)
```js
```
