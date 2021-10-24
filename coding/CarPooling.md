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
번역:  
capacity빈 좌석 이 있는 차가 있습니다 . 차량은 동쪽으로만 주행합니다(즉, 방향을 돌려 서쪽으로 주행할 수 없음).

당신은 정수를 부여 capacity하고 배열 을 나타냅니다 여행이 승객과 위치가 그들을 데리러 그들을 내려 있습니다을 하고 각각. 위치는 자동차의 초기 위치에서 정동쪽으로 킬로미터 수로 지정됩니다.tripstrip[i] = [numPassengersi, fromi, toi]ithnumPassengersifromitoi

true주어진 모든 여행에 대해 모든 승객을 태우고 내릴 수 있는 경우 돌아 오거나 false그렇지 않은 경우 .
 
 
풀이:  


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
