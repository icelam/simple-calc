const simpleCalculator = () => {
  /* Constants */
  const resultAreaEl = document.querySelector('.js-calculator-result');

  const symbolAdd = '+';
  const symbolSubtract = '-';
  const symbolMultiply = '*';
  const symbolDivide = '/';
  const symbolDot = '.';

  /* Variables */
  let equationFinish = true;
  let allowNextZero = false;

  /* Functions */
  const _displayResult = (val) => {
    resultAreaEl.value = val;
    equationFinish = true;
  };

  const _clearResult = () => {
    _displayResult('0');
  };

  const _buttonClick = (val) => {
    //check if 0 is allowed
    if(val == symbolAdd || val == symbolSubtract || val == symbolMultiply || val == symbolDivide) {
      allowNextZero = false;
    } else {
      allowNextZero = true;
    }

    // New calculation
    if (equationFinish) {
      if (val != symbolAdd && val != symbolSubtract && val != symbolMultiply && val != symbolDivide && val != symbolDot) {
        resultAreaEl.value = val;
      } else {
        resultAreaEl.value += val;
      }
    } else {
      resultAreaEl.value += val;
    }

    equationFinish = false;
  };

  const _checkDot = () => {
    if (document.querySelector('.js-calculator-result').value.indexOf(symbolDot) == -1)
      _buttonClick(symbolDot);
  };

  const _checkZero = () => {
    if (allowNextZero)
      _buttonClick('0');
  };

  const _calculateResult = () => {
    try {
      /****** To-fix: https://stackoverflow.com/questions/588004/is-floating-point-math-broken ******/
      const calculationResult = eval(document.querySelector('.js-calculator-result').value);
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
  };

  /* Event Listeners */
  const _init = () => {
    document.querySelector('.js-button-0').addEventListener('click', _checkZero);
    document.querySelector('.js-button-1').addEventListener('click', () => _buttonClick('1'));
    document.querySelector('.js-button-2').addEventListener('click', () => _buttonClick('2'));
    document.querySelector('.js-button-3').addEventListener('click', () => _buttonClick('3'));
    document.querySelector('.js-button-4').addEventListener('click', () => _buttonClick('4'));
    document.querySelector('.js-button-5').addEventListener('click', () => _buttonClick('5'));
    document.querySelector('.js-button-6').addEventListener('click', () => _buttonClick('6'));
    document.querySelector('.js-button-7').addEventListener('click', () => _buttonClick('7'));
    document.querySelector('.js-button-8').addEventListener('click', () => _buttonClick('8'));
    document.querySelector('.js-button-9').addEventListener('click', () => _buttonClick('9'));

    document.querySelector('.js-button-add').addEventListener('click', () => _buttonClick(symbolAdd));
    document.querySelector('.js-button-subtract').addEventListener('click', () => _buttonClick(symbolSubtract));
    document.querySelector('.js-button-multiply').addEventListener('click', () => _buttonClick(symbolMultiply));
    document.querySelector('.js-button-divide').addEventListener('click', () => _buttonClick(symbolDivide));

    document.querySelector('.js-button-dot').addEventListener('click', _checkDot);
    document.querySelector('.js-button-clear').addEventListener('click', _clearResult);
    document.querySelector('.js-button-equal').addEventListener('click', _calculateResult);

    document.onkeyup = (e) => {
      switch(e.which) {
        // 0
        case 48:
          _checkZero();
          break;

        // 1 - 7, 9
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
      }
    };
  };

  return {
    init: _init
  };
};

export default simpleCalculator;
