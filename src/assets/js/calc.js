const SimpleCalculator = () => {
  /* Constants */
  const resultAreaEl = document.querySelector('.js-calculator-result');

  const symbolAdd = '+';
  const symbolSubtract = '-';
  const symbolMultiply = '*';
  const symbolDivide = '/';
  const symbolDot = '.';

  /* Variables */
  let equationFinish = true;

  /* Functions */
  const _getLastInput = () => {
    const re = new RegExp(`[\\${symbolAdd}|\\${symbolSubtract}|\\${symbolMultiply}|\\${symbolDivide}]`);
    const inputNumbers = resultAreaEl.value.split(re);
    return inputNumbers[inputNumbers.length - 1];
  };

  const _lastIsNotSymbol = () => {
    const lastInput = _getLastInput();
    const re = new RegExp(`^[\\${symbolAdd}|\\${symbolSubtract}|\\${symbolMultiply}|\\${symbolDivide}]$`);

    return lastInput.length && !re.test(lastInput);
  };

  const _displayResult = (val) => {
    resultAreaEl.value = val;
    equationFinish = true;
  };

  const _clearResult = () => {
    _displayResult('0');
  };

  const _buttonClick = (val) => {
    const lastInput = _getLastInput();

    // New calculation
    if (equationFinish) {
      if (val !== symbolAdd && val !== symbolSubtract && val !== symbolMultiply && val !== symbolDivide && val !== symbolDot) {
        resultAreaEl.value = val;
      } else {
        resultAreaEl.value += val;
      }
    } else {
      // handling leading zeros
      if (lastInput === '0' && val !== symbolAdd && val !== symbolSubtract && val !== symbolMultiply && val !== symbolDivide && val !== symbolDot) {
        const displayEquation = resultAreaEl.value;
        resultAreaEl.value = displayEquation.substring(0, displayEquation.length - 1);
      }

      resultAreaEl.value += val;
    }

    equationFinish = false;
  };

  const _checkDot = () => {
    const lastInput = _getLastInput();

    if (lastInput.indexOf(symbolDot) === -1) {
      _buttonClick(symbolDot);
    }
  };

  const _checkSymbol = (val) => {
    if (!_lastIsNotSymbol()) {
      const displayEquation = resultAreaEl.value;
      resultAreaEl.value = displayEquation.substring(0, displayEquation.length - 1);
    }

    _buttonClick(val);
  };

  const _calculateResult = () => {
    if (_lastIsNotSymbol()) {
      try {
        /* To-fix: https://stackoverflow.com/questions/588004/is-floating-point-math-broken */
        const calculationResult = eval(resultAreaEl.value);

        // Do not round
        _displayResult(calculationResult);

        // Round Result to nearest 9 dp
        // const roundedResult = Math.round(calculationResult * 1000000000) / 1000000000
        // _displayResult(roundedResult);
      } catch (e) {
        _displayResult('Error');
        if (window.console) {
          console.log(e);
        }
      }

      equationFinish = true;
    }
  };

  /* Event Listeners */
  const _init = () => {
    document.querySelector('.js-button-0').addEventListener('click', () => _buttonClick('0'));
    document.querySelector('.js-button-1').addEventListener('click', () => _buttonClick('1'));
    document.querySelector('.js-button-2').addEventListener('click', () => _buttonClick('2'));
    document.querySelector('.js-button-3').addEventListener('click', () => _buttonClick('3'));
    document.querySelector('.js-button-4').addEventListener('click', () => _buttonClick('4'));
    document.querySelector('.js-button-5').addEventListener('click', () => _buttonClick('5'));
    document.querySelector('.js-button-6').addEventListener('click', () => _buttonClick('6'));
    document.querySelector('.js-button-7').addEventListener('click', () => _buttonClick('7'));
    document.querySelector('.js-button-8').addEventListener('click', () => _buttonClick('8'));
    document.querySelector('.js-button-9').addEventListener('click', () => _buttonClick('9'));

    document.querySelector('.js-button-add').addEventListener('click', () => _checkSymbol(symbolAdd));
    document.querySelector('.js-button-subtract').addEventListener('click', () => _checkSymbol(symbolSubtract));
    document.querySelector('.js-button-multiply').addEventListener('click', () => _checkSymbol(symbolMultiply));
    document.querySelector('.js-button-divide').addEventListener('click', () => _checkSymbol(symbolDivide));

    document.querySelector('.js-button-dot').addEventListener('click', _checkDot);
    document.querySelector('.js-button-clear').addEventListener('click', _clearResult);
    document.querySelector('.js-button-equal').addEventListener('click', _calculateResult);

    // Prevent Enter key pressing buttons
    document.onkeydown = (e) => {
      if (e.which === 13) {
        e.preventDefault();
      }
    };

    document.onkeyup = (e) => {
      switch (e.which) {
        // 0 - 7, 9
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 57:
          _buttonClick(e.which - 48);
          break;

        // 8 and Symbol '*'
        case 56:
          e.shiftKey ? _buttonClick(symbolMultiply) : _buttonClick(e.which - 48);
          break;

        // 'C' or 'Backspace'
        case 8:
        case 67:
          _clearResult();
          break;

        // Symbol '.'
        case 190:
          _checkDot();
          break;

        // 'Enter'
        case 13:
          _calculateResult();
          break;

        // Symbol '+' and Symbol '='
        case 187:
          e.shiftKey ? _buttonClick(symbolAdd) : _calculateResult();
          break;

        // Symbol '-'
        case 189:
          _buttonClick(symbolSubtract);
          break;

        // Symbol '/'
        case 191:
          _buttonClick(symbolDivide);
          break;

        default:
          break;
      }
    };
  };

  return {
    init: _init
  };
};

export default SimpleCalculator;
