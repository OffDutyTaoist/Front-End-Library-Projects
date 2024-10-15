const { createStore } = window.Redux;
const { Provider, useDispatch, useSelector } = window.ReactRedux;
const React = window.React;
const ReactDOM = window.ReactDOM;

// Initial State
const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timerLabel: 'Session',
  timeLeft: 1500, // 25 minutes in seconds
  running: false,
  onBreak: false
};

// Actions
const INCREMENT_BREAK = 'INCREMENT_BREAK';
const DECREMENT_BREAK = 'DECREMENT_BREAK';
const INCREMENT_SESSION = 'INCREMENT_SESSION';
const DECREMENT_SESSION = 'DECREMENT_SESSION';
const RESET = 'RESET';
const TOGGLE_TIMER = 'TOGGLE_TIMER';
const TICK = 'TICK';
const SWITCH_MODE = 'SWITCH_MODE';

// Reducer
function timerReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_BREAK:
      return state.breakLength < 60
        ? { ...state, breakLength: state.breakLength + 1 }
        : state;
    case DECREMENT_BREAK:
      return state.breakLength > 1
        ? { ...state, breakLength: state.breakLength - 1 }
        : state;
    case INCREMENT_SESSION:
      return state.sessionLength < 60
        ? { ...state, sessionLength: state.sessionLength + 1, timeLeft: (state.sessionLength + 1) * 60 }
        : state;
    case DECREMENT_SESSION:
      return state.sessionLength > 1
        ? { ...state, sessionLength: state.sessionLength - 1, timeLeft: (state.sessionLength - 1) * 60 }
        : state;
    case RESET:
      return initialState;
    case TOGGLE_TIMER:
      return { ...state, running: !state.running };
    case TICK:
      return { ...state, timeLeft: state.timeLeft - 1 };
    case SWITCH_MODE:
      return state.onBreak
        ? { ...state, onBreak: false, timerLabel: 'Session', timeLeft: state.sessionLength * 60 }
        : { ...state, onBreak: true, timerLabel: 'Break', timeLeft: state.breakLength * 60 };
    default:
      return state;
  }
}

// Store
const store = createStore(timerReducer);

// Timer Component
const Timer = () => {
  const dispatch = useDispatch();
  const { breakLength, sessionLength, timerLabel, timeLeft, running } = useSelector((state) => state);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleStartStop = () => {
    if (!running) {
      dispatch({ type: TOGGLE_TIMER });
      const intervalId = setInterval(() => {
        if (store.getState().timeLeft === 0) {
          document.getElementById('beep').play();
          dispatch({ type: SWITCH_MODE });
        } else if (store.getState().running) {
          dispatch({ type: TICK });
        }
      }, 1000);
      store.subscribe(() => {
        if (!store.getState().running) clearInterval(intervalId);
      });
    } else {
      dispatch({ type: TOGGLE_TIMER });
    }
  };

  const handleReset = () => {
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    dispatch({ type: RESET });
  };

  return (
    <div className="timer-container">
      <h1>25 + 5 Clock</h1>
      <div className="length-control">
        <div id="break-label">
          <p>Break Length</p>
          <button id="break-decrement" onClick={() => dispatch({ type: DECREMENT_BREAK })}>-</button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={() => dispatch({ type: INCREMENT_BREAK })}>+</button>
        </div>
        <div id="session-label">
          <p>Session Length</p>
          <button id="session-decrement" onClick={() => dispatch({ type: DECREMENT_SESSION })}>-</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={() => dispatch({ type: INCREMENT_SESSION })}>+</button>
        </div>
      </div>
      <div id="timer-label">{timerLabel}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <button id="start_stop" onClick={handleStartStop}>
        Start/Stop
      </button>
      <button id="reset" onClick={handleReset}>Reset</button>
    </div>
  );
};

// Render the App
ReactDOM.render(
  <Provider store={store}>
    <Timer />
  </Provider>,
  document.getElementById('root')
);
