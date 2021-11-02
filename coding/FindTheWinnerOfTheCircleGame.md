<a href="https://leetcode.com/tag/recursion/"> 재귀 </a>    
<a href="https://leetcode.com/problems/find-the-winner-of-the-circular-game"/>참고해야할 사이트</a>      


## (영어)
There are n friends that are playing a game. The friends are sitting in a circle and are numbered from 1 to n in clockwise order. More formally, moving clockwise from the ith friend brings you to the (i+1)th friend for 1 <= i < n, and moving clockwise from the nth friend brings you to the 1st friend.

The rules of the game are as follows:

Start at the 1st friend.
Count the next k friends in the clockwise direction including the friend you started at. The counting wraps around the circle and may count some friends more than once.
The last friend you counted leaves the circle and loses the game.
If there is still more than one friend in the circle, go back to step 2 starting from the friend immediately clockwise of the friend who just lost and repeat.
Else, the last friend in the circle wins the game.
Given the number of friends, n, and an integer k, return the winner of the game.

Input: n = 5, k = 2
Output: 3
Explanation: Here are the steps of the game:
1) Start at friend 1.
2) Count 2 friends clockwise, which are friends 1 and 2.
3) Friend 2 leaves the circle. Next start is friend 3.
4) Count 2 friends clockwise, which are friends 3 and 4.
5) Friend 4 leaves the circle. Next start is friend 5.
6) Count 2 friends clockwise, which are friends 5 and 1.
7) Friend 1 leaves the circle. Next start is friend 3.
8) Count 2 friends clockwise, which are friends 3 and 5.
9) Friend 5 leaves the circle. Only friend 3 is left, so they are the winner.

Input: n = 6, k = 5
Output: 1
Explanation: The friends leave in this order: 5, 4, 6, 2, 3. The winner is friend 1.

1 <= k <= n <= 500

## (해석)
있습니다 n게임을하는 친구. 친구들은 원을 그리며 앉아 있고 시계 방향으로 에서 1까지 번호가 매겨져 있습니다 . 더 공식적으로 친구 에서 시계 방향으로 이동 하면 의 친구로 이동하고 친구 에서 시계 방향으로 이동하면 친구로 이동 합니다 .nith(i+1)th1 <= i < nnth1st

게임의 규칙은 다음과 같습니다.

시작 상기 친구.1st
시작한 친구를 포함 하여 k시계 방향으로 다음 친구를 세십시오 . 계산은 원을 둘러싸고 일부 친구를 두 번 이상 계산할 수 있습니다.
마지막으로 세었던 친구가 서클을 떠나 게임에서 집니다.
서클에 여전히 친구가 한 명 이상 있으면 방금 잃어버린 친구의 시계 방향으로 친구 2 부터 시작 하여 단계로 돌아가 반복합니다.
그렇지 않으면 서클의 마지막 친구가 게임에서 승리합니다.
친구 수 n및 정수가 주어지면 게임의 승자를k 반환 합니다 .

 

예 1:


입력: n = 5, k = 2
 출력: 3
 설명: 게임 단계는 다음과 같습니다.
1) 친구 1부터 시작합니다.
2) 친구 1과 2인 2명의 친구를 시계 방향으로 센다.
3) 친구 2가 서클을 떠납니다. 다음 시작은 친구 3입니다.
4) 친구 3과 4인 2명의 친구를 시계 방향으로 센다.
5) 친구 4가 서클을 떠납니다. 다음 시작은 친구 5입니다.
6) 친구 5와 1인 2명의 친구를 시계 방향으로 센다.
7) 친구 1이 서클을 떠납니다. 다음 시작은 친구 3입니다.
8) 친구 3과 5인 2명의 친구를 시계 방향으로 센다.
9) 친구 5가 서클을 떠납니다. 친구 3만 남았으므로 그들이 승자입니다.
예 2:

입력: n = 6, k = 5
 출력: 1
 설명: 친구는 5, 4, 6, 2, 3의 순서로 출발합니다. 승자는 친구 1입니다.

### 문제 풀이


### (풀이) 주석

