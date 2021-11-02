## Case5 : Stop watch

### 케이스 주제
Q. 아래와 같이 작동하는 스톱워치를 구현하시오.


### 기능 요구사항
1. 스톱워치의 시간은 mm:ss:ms 형식(예시 '01:59:89')으로 표시한다.

| 구분 | 의미  | 범위     | 비고
|:----|:-----|:-------|:--
| mm  | 분    | 0 ~    |
| ss  | 초    | 0 ~ 59 |
| ms  | 미리초 | 0 ~ 99 | 미리초는 100분의 1초를 나타내지만 10ms 단위로 표시한다.


2. 컨트롤 버튼

- 스톱워치는 2개의 컨트롤 버튼을 가진다.
- 왼쪽 버튼: 클릭할 때마다 Start/Stop으로 토글된다.
- 오른쪽 버튼: 오른쪽 버튼은 아래와 같이 왼쪽 버튼에 종속적이다. 왼쪽 버튼이 Start이면 오른쪽 버튼은 Reset이고 왼쪽 버튼이 Stop이면 오른쪽 버튼은 Lap이다.

| 왼쪽 버튼 | 오른쪽 버튼
|:--------|:------------
| Start   | Reset
| Stop    | Lap

- 각 버튼의 기능은 다음과 같다.

| 버튼   | 기능
|:------|:----------------------------
| Start | 스톱워치를 시작한다.
| Stop  | 스톱워치를 일시정지시킨다.
| Reset | 스톱워치와 랩 타임을 초기화한다. 스톱워치의 현재 시간이 '00:00:00'이면 disabled 상태이어야 한다.
| Lap   | 랩 타임을 기록한다.


### 문제
1. JS
- 스톱워치 경과 시간을 '00:00:00' 형식의 문자열로 변환
- 스톱워치 경과 시간을 렌더링
- 랩 타임 렌더링
- Start/Stop 버튼 클릭 이벤트 핸들러
- Reset/Lap 버튼 클릭 이벤트 핸들러

2. React
- 함수 컴포넌트와 훅을 사용해 구현한다.
- 스타일은 CSS, Sass, CSS Module, styled-components 중 어느 것을 사용해도 좋으나 가급적 styled-components 사용을 권장한다.\


### 문제 풀이
### q1. Javascript

#### A)

```js
document.querySelector('.stopwatch').onclick = (() => {
    let isRunning = false;
    let elapsedTime = { mm: 0, ss: 0, ms: 0 };
    let laps = [];

    const [$btnStartOrStop, $btnResetOrLap] = document.querySelectorAll('.stopwatch > .control');

    // 스톱워치의 경과 시간을 '00:00:00' 형식의 문자열로 변환한다.
    const formatElapsedTime = (() => {
      // 1 => '01', 10 => '10'
      const format = n => (n < 10 ? '0' + n : n + '');
      return ({ mm, ss, ms }) => `${format(mm)}:${format(ss)}:${format(ms)}`;
    })();

    // 스톱워치의 경과 시간을 렌더링한다.
    const renderElapsedTime = (() => {
      const $display = document.querySelector('.stopwatch > .display');
      return () => {
        $display.textContent = formatElapsedTime(elapsedTime);
      };
    })();
    // 랩 타임을 렌더링한다.
    const renderLaps = (() => {
      const $laps = document.querySelector('.stopwatch > .laps');

      // 랩 타임을 생성하고 DOM에 반영한다.
      const createLapElement = (newLap, index) => {
        const $fragment = document.createDocumentFragment();

        const $index = document.createElement('div');
        $index.textContent = index;
        $fragment.appendChild($index);

        const $newLab = document.createElement('div');
        $newLab.textContent = formatElapsedTime(newLap);
        $fragment.appendChild($newLab);

        $laps.appendChild($fragment);

        $laps.style.display = 'grid';
      };

      // 랩 타임을 초기화(DOM에서 모두 제거)한다.
      const removeAllLapElement = () => {
        document.querySelectorAll('.laps > div:not(.lap-title)').forEach($lap => $lap.remove());
        $laps.style.display = 'none';
      };

      return () => {
        const { length } = laps;

        if (length) {
          const newLap = laps[length - 1]; // 마지막 lap을 DOM에 append한다.
          createLapElement(newLap, length);
        } else {
          removeAllLapElement();
        }
      };
    })();

    // Start/Stop 버튼 클릭 이벤트 핸들러
    const handleBtnStartOrStop = (() => {
      let timerId = null;

      // Stop => Start
      const start = () => {
        let { mm, ss, ms } = elapsedTime;

        timerId = setInterval(() => {
          ms += 1;
          if (ms >= 100) {
            ss += 1;
            ms = 0;
          }
          if (ss >= 60) {
            mm += 1;
            ss = 0;
          }

          // $btnResetOrLap의 disabled 상태 변경
          $btnResetOrLap.disabled = !(mm + ss + ms);

          elapsedTime = { mm, ss, ms };
          renderElapsedTime();
        }, 10); // 10ms 단위로 증가
      };

      // Start => Stop
      const stop = () => clearInterval(timerId);

      return () => {
        isRunning ? stop() : start();
        isRunning = !isRunning;

        // isRunning이 변경되면 버튼 텍스트를 변경한다.
        $btnStartOrStop.textContent = isRunning ? 'Stop' : 'Start';
        $btnResetOrLap.textContent = isRunning ? 'Lap' : 'Reset';
      };
    })();

    // Reset/Lap 버튼 클릭 이벤트 핸들러
    const handleBtnResetOrLap = (() => {
      // elapsedTime과 laps를 초기화한다.
      const reset = () => {
        // $btnResetOrLap의 disabled 상태 변경
        $btnResetOrLap.disabled = true;

        elapsedTime = { mm: 0, ss: 0, ms: 0 };
        renderElapsedTime();

        laps = [];
        renderLaps();
      };

      // elapsedTime을 laps에 추가한다.
      const addLap = () => {
        laps = [...laps, elapsedTime];
        renderLaps();
      };

      return () => {
        isRunning ? addLap() : reset();
      };
    })();

    return ({ target }) => {
      if (!target.classList.contains('control')) return;
      target === $btnStartOrStop ? handleBtnStartOrStop() : handleBtnResetOrLap();
    };
  })();
```

### q2. React
#### 포인트 정리
```markup
  /*
  useEffect(effect: cleanup)
  - effect: 컴포넌트의 모든 렌더링이 완료된 후 매번 호출된다.
    (effect는 렌더링(페인팅까지)이 완료된 후 호출되므로 뷰가 렌더딩되는 것을 방해하지 않는다. 따라서 빠르게 렌더링된다.)
    effect는 함수 컴포넌트가 종료한 후에 호출되는 클로저로 렌더링 당시, 즉 함수 컴포넌트가 호출될 당시의 props와 state를 기억한다.
    (이는 함수 컴포넌트 내에서 정의한 이벤트 핸들러도 마찬가지다.)
  - cleanup: 컴포넌트가 리렌더링된 후 그리고 컴포넌트가 제거(unmount)되기 전 매번 호출된다.
  - [Rendering => effect()] => [Re-rendring => cleanup() => effect()] => ...=> [cleanup() => Unmount]

  useEffect(effect: cleanup, [])
  - effect: 컴포넌트의 첫 렌더링이 완료된 후 한번만 호출된다. 즉, 리렌더링 시에는 호출되지 않는다.
  - cleanup: 컴포넌트가 제거(unmount)되기 전 한번만 호출된다. 즉, 리렌더링 시에는 호출되지 않는다.
  - [Rendering => effect()] => [cleanup() => Unmount]

  예를 들어 다음 예제의 경우
  effect는 첫 렌더링이 완료된 후 한번만 호출된다. 이때 주의할 것은 setInterval의 콜백도 한번만 생성되는 클로저다.
  따라서 count는 언제나 0이므로 setCount(count + 1)이 1초마다 호출되도 count가 증가되지 않는다.
  cleanup은 컴포넌트가 제거(unmount)되기 전 한번만 호출된다. 따라서 count가 변경되어 리렌더링되어도 호출되지 않는다.
  function Count() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const id = setInterval(() => {
        setCount(count + 1);
      }, 1000);
      return () => clearInterval(id);
    }, []);

    return <h1>{count}</h1>;
  }

  useEffect(effect: cleanup, [deps])
  - effect: 컴포넌트의 첫 렌더링이 완료된 후 그리고 deps가 변경되어 컴포넌트가 리렌더링된 후 호출된다.
    deps 이외의 상태가 변경되어 컴포넌트가 리렌더링되어도 호출되지 않는다.
  - cleanup: deps가 변경되어 컴포넌트가 리렌더링된 후 그리고 컴포넌트가 제거(unmount)되기 전 호출된다.
    deps 이외의 상태가 변경되어 컴포넌트가 리렌더링되어도 호출되지 않는다.
  - [Rendering => effect()] => [dep 변경 => Re-rendring => cleanup() => effect()] => ...=> [cleanup() => Unmount]

  예를 들어 다음 예제의 경우
  effect는 첫 렌더링이 완료된 후 그리고 count가 변경되어 컴포넌트가 리렌더링된 후 호출되고
  cleanup은 count가 변경되어 컴포넌트가 리렌더링된 후 매번 호출된다.
  따라서 count 상태가 변경될 때마다 타이머가 해제되고 다시 설정되기를 반복한다.

  function Count() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const id = setInterval(() => {
        setCount(count + 1);
      }, 1000);
      return () => clearInterval(id);
    }, [count]);

    return <h1>{count}</h1>;
  }

  count 상태를 함수형 업데이트(functional update)로 변경하면 useEffect의 의존성으로 count를 설정하지 않아도 된다.
  이 경우 타이머는 첫 렌더링 후 한번 설정되고 언마운트되기 전 한번 해제된다.

  function Count() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const id = setInterval(() => {
        // functional update
        setCount(count => count + 1);
      }, 1000);
      return () => clearInterval(id);
    }, []);

    return <h1>{count}</h1>;
  }

  useEffect에 대한 자세한 내용은 다음을 참고하자.
  [번역]useEffect 완벽 가이드: https://rinae.dev/posts/a-complete-guide-to-useeffect-ko
  */

  /*
  useEffect의 effect 함수는 컴포넌트의 첫 렌더링이 완료된 후 그리고 isRunning 상태가 변경되어 컴포넌트의 리랜더링이 완료된 후 호출된다.
  useEffect의 cleanup 함수는 isRunning 상태가 변경되어 리랜더링된 후 호출된다.
  [Rendering => effect()] => [isRunning 변경 => Re-rendring => cleanup() => effect()] => ...=> [cleanup() => Unmount]
  */
```

### 주요 학습 키워드
- [CSS 그리드 레이아웃](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout)
- [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)
- [Document.createDocumentFragment](https://developer.mozilla.org/ko/docs/Web/API/Document/createDocumentFragment)
- [useState](https://ko.reactjs.org/docs/hooks-state.html)
- [useEffect](https://ko.reactjs.org/docs/hooks-reference.html#useeffect)
