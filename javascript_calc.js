const { createStore } = window.Redux;
const { Provider, useDispatch, useSelector } = window.ReactRedux;
const ReactDOM = window.ReactDOM;
const React = window.React;

// Redux reducer function
const initialState = {
  currentValue: '0',
  previousValue: null,
  operator: null,
  isResultDisplayed: false,
};

function calculatorReducer(state = initialState, action) {
  switch (action.type) {
    case 'INPUT_NUMBER':
      if (state.isResultDisplayed) {
        return {
          ...state,
          currentValue: action.payload,
          isResultDisplayed: false,
        };
      }
      return {
        ...state,
        currentValue:
          state.currentValue === '0' ? action.payload : state.currentValue + action.payload,
      };

    case 'INPUT_OPERATOR':
      return {
        ...state,
        previousValue: state.currentValue,
        operator: action.payload,
        currentValue: '0',
      };

    case 'INPUT_DECIMAL':
      if (!state.currentValue.includes('.')) {
        return {
          ...state,
          currentValue: state.currentValue + '.',
        };
      }
      return state;

    case 'CLEAR':
      return initialState;

    case 'CALCULATE':
      const { previousValue, currentValue, operator } = state;
      if (!operator || !previousValue) return state;

      let result;
      switch (operator) {
        case '+':
          result = parseFloat(previousValue) + parseFloat(currentValue);
          break;
        case '-':
          result = parseFloat(previousValue) - parseFloat(currentValue);
          break;
        case '*':
          result = parseFloat(previousValue) * parseFloat(currentValue);
          break;
        case '/':
          result = parseFloat(previousValue) / parseFloat(currentValue);
          break;
        default:
          return state;
      }

      return {
        ...state,
        currentValue: result.toString(),
        previousValue: null,
        operator: null,
        isResultDisplayed: true,
      };

    default:
      return state;
  }
}

// Create Redux store
const store = createStore(calculatorReducer);

// Button Component
const Button = ({ id, value, onClick }) => {
  return (
    <button id={id} className="btn btn-primary" onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

// Main App Component
const App = () => {
  const dispatch = useDispatch();
  const currentValue = useSelector((state) => state.currentValue);

  const handleClick = (value) => {
    if (!isNaN(value)) {
      dispatch({ type: 'INPUT_NUMBER', payload: value });
    } else if (value === '.') {
      dispatch({ type: 'INPUT_DECIMAL' });
    } else if (value === '=') {
      dispatch({ type: 'CALCULATE' });
    } else if (value === 'C') {
      dispatch({ type: 'CLEAR' });
    } else {
      dispatch({ type: 'INPUT_OPERATOR', payload: value });
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <div id="display" className="display">
          {currentValue}
        </div>
        <div className="buttons">
          <Button id="clear" value="C" onClick={handleClick} />
          <Button id="divide" value="/" onClick={handleClick} />
          <Button id="multiply" value="*" onClick={handleClick} />
          <Button id="subtract" value="-" onClick={handleClick} />
          <Button id="add" value="+" onClick={handleClick} />
          <Button id="equals" value="=" onClick={handleClick} />
          {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'].map((num) => (
            <Button id={`num-${num}`} value={num} onClick={handleClick} key={num} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Render the App
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
