<a href="https://leetcode.com/tag/sorting/">스택 전체</a>  
<a href="https://leetcode.com/problems/car-pooling/description/">참고해야할 사이트</a>   

## (영어)
There is a car with capacity empty seats. The vehicle only drives east (i.e., it cannot turn around and drive west).

You are given the integer capacity and an array trips where trip[i] = [numPassengersi, fromi, toi] indicates that the ith trip has numPassengersi passengers and the locations to pick them up and drop them off are fromi and toi respectively. The locations are given as the number of kilometers due east from the car's initial location.

Return true if it is possible to pick up and drop off all passengers for all the given trips, or false otherwise.

Constraints:
1 <= trips.length <= 1000
trips[i].length == 3
1 <= numPassengersi <= 100
0 <= fromi < toi <= 1000
1 <= capacity <= 105


## (해석)  
<a href='https://ifh.cc/v-asswCH' target='_blank'><img src='https://ifh.cc/g/asswCH.png' border='0'></a>  


번역:  
capacity빈 좌석 이 있는 차가 있습니다 . 차량은 동쪽으로만 주행합니다(즉, 방향을 돌려 서쪽으로 주행할 수 없음).

당신은 정수를 부여 capacity하고 배열 을 나타냅니다 여행이 승객과 위치가 그들을 데리러 그들을 내려 있습니다을 하고 각각. 위치는 자동차의 초기 위치에서 정동쪽으로 킬로미터 수로 지정됩니다.tripstrip[i] = [numPassengersi, fromi, toi]ithnumPassengersifromitoi

true주어진 모든 여행에 대해 모든 승객을 태우고 내릴 수 있는 경우 돌아 오거나 false그렇지 않은 경우 .
 
 
풀이:  예제만 봤을때는 이렇습니다.

예제 1  
2,1,5 = 2명의 사람이 1에서 5까지  
3,3,7 = 3명의  사람이 3에서 7까지  
가용 좌석은 4자리  
=> 위치 3 에서 사람 수가 2명 + 3명 으로 인하여 가용 좌석이 5자리가  되어야 함(거짓)  

예제 2    
2,1,5 = 2명의 사람이 1에서 5까지  
3,3,7 = 3명의  사람이 3에서 7까지  
가용 좌석은 5자리  
=> 위치 3 에서 사람 수가 2명 + 3명으로 인하여 가용 좌석이 5가 되어야 함( 참)  

예제 3  
2,1,5 = 2명의 사람이 1에서 5까지  
3,5,7 = 3명의 사람이 5에서 7까지  
가용 좌석은 3자리  
=> 위치 5에서 이전의 2명의 사람은 이미 내리고 새로운 3명의 사람은 5에서부터 타기 때문에 참 값  

예제 4  
3,2,7 = 3명의 사람이 2에서 7까지  
3,7,9 = 3명의  사람이 7에서 9까지  
8,3,9 = 8명의  사람이 3에서 9까지  
가용 좌석은 11 자리  
=> 위치 3에서 그 전에 타던 3명의 사람과 새로 탄 8명의 사람이 만나서 11명으로 다니고 있다가 위치 7에서 3명의 사람이 내리고 새로운 3명의 사람이 타기 때문에 11개의 좌석이 바로 가용 좌석으로써  참 값  


## (풀이) 주석(ㅇ)
```js
/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
function carPooling(trips, capacity) {
    // 캘린더 역할을 할 배열을 만들고, 저장합니다.
    // 일정에 대한 시간차를 통해 확인 할 수 있습니다.
    // Uint16Array형식화 된 배열은 플랫폼 바이트 순서로 부호없는 16 비트 정수 배열을 나타냅니다.
    // 바이트 순서에 대한 제어가 필요한 경우 DataView대신 사용하십시오. 
    // 내용은 로 초기화됩니다 0. 
    // 일단 설정되면 개체의 메서드를 사용하거나 표준 배열 인덱스 구문(즉, 대괄호 표기법 사용)을 사용     하여 배열의 요소를 참조할 수 있습니다.
    
    let schedule = new Uint16Array(1000).fill(0)
    
    // for 문 - 일정 관리
    for (const trip of trips) {
        
        const people = trip[0]  // 카풀에 동참할 사람 수
        const start = trip[1]   // 시작
        const end = trip[2]     // 종료
        
        // 시간 간격에 따라 증가하여 인원 수 추가
        // 일정 관리에 지정된 각각의 시간에 대해
        for (let i = start; i < end; i++) {
            
            // 사용자 수 추가
            schedule[i] += people
            
            // 사용자 수 추가가 안 될 때
            if (schedule[i] > capacity) {
                return false
            }
        }
    }
    
    // 해결 되면 참으로 처리
    return true
}
```    
