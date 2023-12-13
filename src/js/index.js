import { QUESTIONS } from './questions/questions';

const container = document.getElementById('letters-container');
const letters = container.querySelectorAll('.letter');
const buttons = document.getElementById('buttons');
const questionTextElement = document.getElementById('question');
const radius = 150; // Radio del círculo, ajusta según tus necesidades
const totalLetters = letters.length;
const angleIncrement = (2 * Math.PI) / totalLetters;

const jumpedQuestions = [];
let arrayOfQuestions = QUESTIONS;
let questionCounter = 0;
let currentLetter;

letters.forEach((letter, index) => {
	// Cambia el ángulo inicial para que la "A" esté arriba
	const angle = (3 * Math.PI) / 2 + index * angleIncrement;
	const x = radius * Math.cos(angle);
	const y = radius * Math.sin(angle);

	// Posiciona cada letra en el círculo
	letter.style.left = `${x + radius}px`;
	letter.style.top = `${y + radius}px`;
});

const printQuestion = questionToPrint => {
	currentLetter = questionToPrint[questionCounter].id;
	questionTextElement.textContent = questionToPrint[questionCounter].question;
};

const checkCounter = () => {
	if (questionCounter >= arrayOfQuestions.length - 1) {
		questionCounter = 0;
		arrayOfQuestions = jumpedQuestions;
	} else {
		questionCounter++;
	}

	printQuestion(arrayOfQuestions);
};

const deleteJumpedQuestion = () => {
	if (arrayOfQuestions === QUESTIONS) return;

	const indexOfLetter = jumpedQuestions.findIndex(
		question => question.id === currentLetter
	);

	jumpedQuestions.splice(indexOfLetter, 1);
	questionCounter--;
};

const checkAnswer = event => {
	console.log(arrayOfQuestions);
	const type = event.target.dataset.type;
	if (!type) return;
	const letterElement = document.querySelector(
		`[data-letter='${currentLetter}']`
	);
	letterElement.classList.remove('letter--jumped');
	if (type === 'correct') {
		letterElement.classList.add('letter--correct');
		deleteJumpedQuestion();
	} else if (type === 'incorrect') {
		letterElement.classList.add('letter--incorrect');
		deleteJumpedQuestion();
	} else if (arrayOfQuestions === QUESTIONS) {
		jumpedQuestions.push(QUESTIONS[questionCounter]);
		letterElement.classList.add('letter--jumped');
	} else {
		letterElement.classList.add('letter--jumped');
	}

	checkCounter();
};

printQuestion(arrayOfQuestions);

buttons.addEventListener('click', checkAnswer);
