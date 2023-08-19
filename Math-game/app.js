const operators = ['+', '-', '*'];
const startBtn = document.getElementById('start-btn');
const question = document.getElementById('question');
const controls = document.querySelector('.controls-container');
const result = document.getElementById('result');
const btnSubmit = document.getElementById('btn-submit');
const errorMsg = document.getElementById('error-msg');


let answerQuestion = 0;
const randomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const questionGenerator=()=>{
    const [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];
    const randomOperator = operators[randomValue(0, 2)];
    const resultOperation = eval(`${num1} ${randomOperator} ${num2}`);
    const randomValueHide = randomValue(0, 3);

    const options = [
        { answer: num1, question: `<input type="text" id="input-value" placeholder="?">${randomOperator}${num2}=${resultOperation}` },
        { answer: num2, question: `${num1}${randomOperator}<input type="text" id="input-value" placeholder="?">=${resultOperation}` },
        { answer: randomOperator, question: `${num1}<input type="text" id="input-value" placeholder="?">${num2}=${resultOperation}` },
        { answer: resultOperation, question: `${num1}${randomOperator}${num2}=<input type="text" id="input-value" placeholder="?">` }
    ];

    const selectedOption = options[randomValueHide];
    question.innerHTML = selectedOption.question;
    answerQuestion = (selectedOption.answer).toString();
}
const checkAnswer = (ans) => {
    const answerUser = document.getElementById('input-value').value;
    console.log(ans, answerUser);
    if (ans === answerUser) {
        result.innerHTML = 'Correcto';
        result.style.color = 'green';
    } else {
        result.innerHTML = 'Incorrecto';
        result.style.color = 'red';
    }
}
startBtn.addEventListener('click', () => {
    answerQuestion = questionGenerator();
});
btnSubmit.addEventListener('click', () => {
    checkAnswer(answerQuestion);
    questionGenerator();
});

questionGenerator();