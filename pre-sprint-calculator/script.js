const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.calculator__buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const firstOperend = document.querySelector('.calculator__operend--left'); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector('.calculator__operator'); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector('.calculator__operend--right'); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector('.calculator__result'); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.


function calculate(n1, operator, n2) {
  let result = 0;
  // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
  // 입력값은 문자열 타입
  // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.
  // +, -, *, /
  let num1 = Number(n1);
  let num2 = Number(n2);

  if (operator === '+') {
    result = num1 + num2;
  } else if (operator === '-') {
    result = num1 - num2;
  } else if (operator === '*') {
    result = num1 * num2;
  } else if (operator === '/') {
    result = num1 / num2;
  }
  
  return String(result);
}

// ! intermediate, advanced test를 위한 코드입니다. 도전하신다면 주석을 해제하세요.
const display = document.querySelector('.calculator__display--intermediate'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let firstNum, intermediateOperator, previousKey, previousNum, beforeResult;

// div 만들기
let newDiv = document.createElement('div');
// 만든 요소의 클래스를 'calculateProcess'로 설정
newDiv.className = 'calculateProcess';
newDiv.innerHTML = '0';
// display 뒤에 삽입해주기
display.after(newDiv);
// style 설정하기
newDiv.style.cssText = `font-size: 12px; font-weight: 400; padding: 0 16px 10px 15px; text-align: right; overflow: hidden; color: #808992;`;

// ! 키보드를 사용했을 때 작동하는 함수입니다.

// keyup 타입 이벤트가 발생했을 때 'isPressed~' 클래스를 지워주는 함수입니다.
window.addEventListener('keyup', function (event) {
  let keyContent = event.key; // 눌려진 키보드 버튼의 텍스트 정보를 가져옵니다.
  const buttonContainerArray = buttons.children; // calculator__keys 엘리먼트의 자식 엘리먼트의 정보를 모두 담고 있습니다. 아마도...?
  
  for (let i = 0; i < buttonContainerArray.length; i++) { 
    const childrenArray = buttonContainerArray[i].children;
    for (let j=0; j < childrenArray.length; j++) {
      if (childrenArray[j].textContent === 'AC' && keyContent === 'Escape') {
        childrenArray[j].classList.remove('isPressedClear');
      } 
      if (childrenArray[j].textContent === 'Enter' && keyContent === '=') {
        childrenArray[j].classList.remove('isPressedEnter');
      } else if (childrenArray[j].textContent === 'Enter' && keyContent === 'Enter') {
        childrenArray[j].classList.remove('isPressedEnter');
      }
      if (childrenArray[j].textContent === keyContent) {
        childrenArray[j].classList.remove('isPressed');
      } 
      console.log(childrenArray[j].className);
    }
  }
})

window.addEventListener('keydown', function (event) {

  // keyup 타입 이벤트가 발생했을 때 'isPressed~' 클래스를 지워주는 과정입니다.
  let keyContent = event.key; // 눌려진 키보드 버튼의 텍스트 정보를 가져옵니다.
  const buttonContainerArray = buttons.children; // calculator__keys 엘리먼트의 자식 엘리먼트의 정보를 모두 담고 있습니다.
  
  for (let i = 0; i < buttonContainerArray.length; i++) { 
    const childrenArray = buttonContainerArray[i].children;
    for (let j=0; j < childrenArray.length; j++) {
      if (childrenArray[j].textContent === keyContent) {
        childrenArray[j].classList.add('isPressed');
      }
      if (childrenArray[j].className === 'clear' && keyContent === 'Escape') {
        childrenArray[j].classList.add('isPressedClear');
      } 
      if (childrenArray[j].textContent === 'Enter' && keyContent === '=') {
        childrenArray[j].classList.add('isPressedEnter');
      } else if (childrenArray[j].textContent === 'Enter' && keyContent === 'Enter') {
        childrenArray[j].classList.add('isPressedEnter');
      }
    }
  }
  
  // keydown 타입 이벤트가 발생했을 때 화면의 숫자 또는 계산식을 바꾸어주는 과정입니다.
  if (!isNaN(keyContent)){ // 눌러진 키가 숫자이면
    
    if (newDiv.textContent === '0') { // newDiv의 텍스트가 0이면 입력값없음 상태로 인지
      newDiv.textContent = keyContent; // 지금 클릭한 엘리먼트의 텍스트로 교체
    } else { // 그 외의 경우에는
      newDiv.textContent = newDiv.textContent + keyContent; // 지금 클릭한 엘리먼트의 텍스트를 concat
    }

    if (previousKey === undefined || previousKey === 'operator' || display.textContent === '0') { 
      display.textContent = keyContent;
    } else if (previousKey === 'number' || previousKey === 'decimal') { // 그게 아니면 화면에 있는 숫자에 지금 누른 숫자를 concat하자
      display.textContent = display.textContent + keyContent;
    } else if (beforeResult !== undefined) {
      display.textContent = keyContent;
      newDiv.textContent = keyContent;

      firstNum = undefined;
      intermediateOperator = undefined;
      previousNum = undefined;
      beforeResult = undefined;
      previousKey = undefined; // 직전에 누른 키값을 undefined로 바꿔주자
    } else if (keyContent === '0' && display.textContent === '0.') { // 0,.,0을 차례로 누르면 0.0이 나오는 문제 해결
      display.textContent = '0';
    } 
    
    previousKey = 'number';

  } else if (keyContent === '.') { // 눌린 키가 .이면
    if (previousKey === 'calculate' || display.textContent === '0') {
      display.textContent = '0.';
      newDiv.textContent = '0.';
    } else if (previousKey === 'operator') {
      display.textContent = '0.';
      newDiv.textContent = newDiv.textContent + '0.';
    } else if (previousKey !== 'decimal'){
      display.textContent = display.textContent + '.';
    } else if (previousKey === 'calculate') {
      display.textContent = '0.';
    } else if (previousKey === 'number') {
      newDiv.textContent = newDiv.textContent + '.';
    }

    previousKey = 'decimal'; // 직전에 누른 키값을 연산자로 바꿔주자

  } else if (keyContent === '+' || keyContent === '-' || keyContent === '*' || keyContent === '/') {
    
    if (beforeResult && previousKey === 'operator') {
      display.textContent = beforeResult;
    } else if (previousKey === 'calculate') { // 엔터와 연산자를 연달아 클릭한 경우
      newDiv.textContent = `${beforeResult}${keyContent}`;
    } else if (firstNum && intermediateOperator && previousKey !== 'calculate' && previousKey !== 'operator') {
      display.textContent = calculate(firstNum, intermediateOperator, display.textContent);
    }
    
    firstNum = display.textContent; // 화면에 보이는 숫자를 문자열 상태 그대로 따로 저장
    intermediateOperator = keyContent; // 클릭한 연산자 정보를 저장

    if (previousKey === 'operator') { // 연산자를 연속해서 클릭한 경우라면 지금 누른 연산자로 바꿔치기 해야한다.
      newDiv.textContent = firstNum + intermediateOperator; // 저장해둔 정보를 가져와서 보여주자
    } else if (previousKey === 'calculate') { // 엔터와 연산자를 연달아 클릭한 경우
      newDiv.textContent = `${beforeResult}${keyContent}`;
    } else {
      newDiv.textContent = newDiv.textContent + keyContent; // 지금 클릭한 엘리먼트의 텍스트를 concat
    }

    previousKey = 'operator'; // 직전에 누른 키값을 연산자로 바꿔주자

  } else if (keyContent === '=' || keyContent === 'Enter') { // 엔터키나 =키로 연산이 가능하게 하자
    console.log(`firstNum: ${firstNum}, previousKey: ${previousKey}`);
    if (!previousKey) {
      display.textContent = '0';
      newDiv.textContent = '0';
    } else if (!firstNum && previousKey === 'calculate') {
      newDiv.textContent = '0';
    } else if (previousKey !== 'calculate') {
      previousNum = display.textContent;
      beforeResult = calculate(firstNum, intermediateOperator, display.textContent);
      display.textContent = beforeResult;
      newDiv.textContent = `${firstNum}${intermediateOperator}${previousNum}=${beforeResult}`;
    } else {
      let afterResult = calculate(display.textContent, intermediateOperator, previousNum);
      newDiv.textContent = `${display.textContent}${intermediateOperator}${previousNum}=${afterResult}`;
      display.textContent = afterResult;
      beforeResult = afterResult;
    }
    
    previousKey = 'calculate'; // 직전에 누른 키값을 'calculate'로 바꿔주자

  } else if (keyContent === 'Escape') { // Esc 키를 통해 클리어 기능이 가능하게 하자
    display.textContent = '0';
    newDiv.textContent = '0';
    firstNum = undefined;
    intermediateOperator = undefined;
    previousNum = undefined;
    previousKey = undefined; // 직전에 누른 키값을 undefined로 바꿔주자
  }

  // 숫자가 길어지면 크기 조정
  if (display.textContent.length < 12) {
    display.style.fontSize = '36px';
  } else if (display.textContent.length >= 12 && display.textContent.length < 14) {
    display.style.fontSize = '30px';
  } else if (display.textContent.length >= 14 && display.textContent.length < 16) {
    display.style.fontSize = '27px';
  } else if (display.textContent.length >= 16 && display.textContent.length < 18) {
    display.style.fontSize = '24px';
  } else if (display.textContent.length >= 18 && display.textContent.length < 20) {
    display.style.fontSize = '21px';
  } else if (display.textContent.length >= 20 && display.textContent.length < 23) {
    display.style.fontSize = '18px';
  } else if (display.textContent.length >= 23 && display.textContent.length < 28) {
    display.style.fontSize = '15px';
  } else if (display.textContent.length >= 28 && display.textContent.length < 36) {
    display.style.fontSize = '12px';
  } else if (display.textContent.length >= 36 && display.textContent.length < 44) {
    display.style.fontSize = '9px';
  } else {
    display.style.fontSize = '6px';
  }
})

// ! 버튼을 클릭했을 때 작동하는 함수입니다.
buttons.addEventListener('click', function (event) {
  
  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드는 수정하지 마세요.
  

  // ! 버튼이 클릭되면 HTML에서 'isPressed' 클래스를 모두 찾아내 지워줍니다.
  const buttonContainerArray = buttons.children; // calculator__keys 엘리먼트의 자식 엘리먼트의 정보를 모두 담고 있습니다. 아마도...?
  console.log(buttonContainerArray);
  if (target.matches('button')) { // 클릭된 HTML 엘리먼트가 'button'인 경우
    for (let i = 0; i < buttonContainerArray.length; i++) { 
      const childrenArray = buttonContainerArray[i].children;
      for (let j=0; j < childrenArray.length; j++) {
        childrenArray[j].classList.remove('isPressed');
      }
    }
  }

  // ! 여기서부터 intermetiate & advanced 과제룰 풀어주세요.
  if (target.matches('button')) {
    if (action === 'number') {
      // 계산식을 입력해줍니다.
      if (newDiv.textContent === '0') { // newDiv의 텍스트가 0이면 입력값없음 상태로 인지
        newDiv.textContent = buttonContent; // 지금 클릭한 엘리먼트의 텍스트로 교체
      } else { // 그 외의 경우에는
        newDiv.textContent = newDiv.textContent + buttonContent; // 지금 클릭한 엘리먼트의 텍스트를 concat
      }

      console.log('previousKey: ' + previousKey);
      console.log(buttonContent);
      // previousKey값이 없을 경우, 직전에 누른 버튼이 연산자인 경우, 화면의 숫자가 0인 경우에는 지금 누른 숫자를 화면에 표시하자
      if (previousKey === undefined || previousKey === 'operator' || display.textContent === '0') {
        display.textContent = buttonContent;
      } else if (previousKey === 'number' || previousKey === 'decimal') { // 그게 아니면 화면에 있는 숫자에 지금 누른 숫자를 concat하자
        display.textContent = display.textContent + buttonContent;
      } else if (beforeResult !== undefined) {
        console.log(beforeResult);
        display.textContent = buttonContent;
        newDiv.textContent = buttonContent;
        
        firstNum = undefined;
        intermediateOperator = undefined;
        previousNum = undefined;
        beforeResult = undefined;
        previousKey = undefined; // 직전에 누른 키값을 undefined로 바꿔주자
      } else if (buttonContent === '0' && display.textContent === '0.') { // 0,.,0을 차례로 누르면 0.0이 나오는 문제 해결
        display.textContent = '0';
      } 
      
      previousKey = 'number'; // 직전에 누른 키 값을 넘버로 바꿔주자
    }
    if (action === 'operator') {
      console.log('previousKey: ' + previousKey);
      console.log(buttonContent);

      target.classList.add('isPressed'); // isPressed 클래스를 추가하자

      if (beforeResult && previousKey === 'operator') {
        display.textContent = beforeResult;
      } else if (firstNum && intermediateOperator && previousKey !== 'calculate' && previousKey !== 'operator') {
        display.textContent = calculate(firstNum, intermediateOperator, display.textContent);
      }

      firstNum = display.textContent; // 화면에 보이는 숫자를 문자열 상태 그대로 따로 저장
      intermediateOperator = buttonContent; // 클릭한 연산자 정보를 저장
      if (previousKey === 'operator') { // 연산자를 연속해서 클릭한 경우라면 
        newDiv.textContent = firstNum + intermediateOperator; // 저장해둔 정보를 가져와서 보여주자
      } else if (previousKey === 'calculate') { // 엔터와 연산자를 연달아 클릭한 경우
        newDiv.textContent = `${beforeResult}${buttonContent}`;
      } else {
        newDiv.textContent = newDiv.textContent + buttonContent; // 지금 클릭한 엘리먼트의 텍스트를 concat
      }
      previousKey = 'operator'; // 직전에 누른 키값을 연산자로 바꿔주자

      console.log('방금 저장된 firstNum은 '+firstNum);
    }
    if (action === 'decimal') {
      console.log('previousKey: ' + previousKey);
      console.log(buttonContent);

      if (previousKey === 'calculate' || display.textContent === '0') {
        display.textContent = '0.';
        newDiv.textContent = '0.';
      } else if (previousKey === 'operator') {
        display.textContent = '0.';
        newDiv.textContent = newDiv.textContent + '0.';
      } else if (previousKey !== 'decimal'){
        display.textContent = display.textContent + '.';
      } 

      previousKey = 'decimal'; // 직전에 누른 키값을 'decimal'로 바꿔주자
    }
    if (action === 'clear') {
      console.log('previousKey: ' + previousKey);
      console.log(buttonContent);

      display.textContent = '0';
      newDiv.textContent = '0';
      previousKey = undefined; // 직전에 누른 키값을 undefined로 바꿔주자
      firstNum = undefined;
      intermediateOperator = undefined;
      previousNum = undefined;
    }
    if (action === 'calculate') {
      console.log('previousKey: ' + previousKey);
      console.log('직전 숫자는 ' + previousNum);
      console.log('=');
      
      if (previousKey === undefined) {
        display.textContent = '0';
      } else if (!firstNum && previousKey === 'calculate') {
        newDiv.textContent = '0';
      } else if (intermediateOperator !== undefined) {
        if ( previousKey !== 'calculate') {
          previousNum = display.textContent;
          beforeResult = calculate(firstNum, intermediateOperator, display.textContent);
          display.textContent = beforeResult;
          newDiv.textContent = `${firstNum}${intermediateOperator}${previousNum}=${beforeResult}`;
        } else {
          let afterResult = calculate(display.textContent, intermediateOperator, previousNum);
          newDiv.textContent = `${display.textContent}${intermediateOperator}${previousNum}=${afterResult}`;
          display.textContent = afterResult;
          beforeResult = afterResult;
        }
      }
      previousKey = 'calculate'; // 직전에 누른 키값을 'calculate'로 바꿔주자
    }
  }

  // 숫자가 길어지면 크기 조정
  if (display.textContent.length < 12) {
    display.style.fontSize = '36px';
  } else if (display.textContent.length >= 12 && display.textContent.length < 14) {
    display.style.fontSize = '30px';
  } else if (display.textContent.length >= 14 && display.textContent.length < 16) {
    display.style.fontSize = '27px';
  } else if (display.textContent.length >= 16 && display.textContent.length < 18) {
    display.style.fontSize = '24px';
  } else if (display.textContent.length >= 18 && display.textContent.length < 20) {
    display.style.fontSize = '21px';
  } else if (display.textContent.length >= 20 && display.textContent.length < 23) {
    display.style.fontSize = '18px';
  } else if (display.textContent.length >= 23 && display.textContent.length < 28) {
    display.style.fontSize = '15px';
  } else if (display.textContent.length >= 28 && display.textContent.length < 36) {
    display.style.fontSize = '12px';
  } else if (display.textContent.length >= 36 && display.textContent.length < 44) {
    display.style.fontSize = '9px';
  } else {
    display.style.fontSize = '6px';
  }
});

// 추가적으로 구현해볼 내용들
// 1. 구글 계산기나 안드로이드 계산기처럼 작동하게 해보기
// 2. 공학용 계산기 만들기
