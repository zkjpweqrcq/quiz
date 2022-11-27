let shuffledQuestions = []; 
const questionsCountByPeople = 10;
const questionsCount = questionsCountByPeople - 1;
let questionNumber = 1;
let playerScore = 0;
let wrongAttempt = 0;
let indexNumber = 0;

window.addEventListener('load', () =>  {
	document.querySelectorAll('.questions-count').forEach(element => {
		element.textContent = questionsCount + 1;
	});
});

function handleQuestions() {
	while(shuffledQuestions.length <= questionsCount) {
		const random = questions[Math.floor(Math.random() * questions.length)];

		if (!shuffledQuestions.includes(random)) {
			shuffledQuestions.push(random);
		}
	}
}

function NextQuestion(index) {
  handleQuestions();
  const currentQuestion = shuffledQuestions[index];
  document.getElementById("question-number").innerHTML = questionNumber;
  document.getElementById("player-score").innerHTML = playerScore;
  document.getElementById("display-question").innerHTML = currentQuestion.question;
  document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
  document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
  document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
  document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}

function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber];
	const currentQuestionAnswer = currentQuestion.correctOption;
	const options = document.getElementsByName('option');
	let correctOption = null;

	options.forEach(option => {
		if (option.value === currentQuestionAnswer) {
			correctOption = option.labels[0].id;
		}
	});

	if (
		options[0].checked === false 
		&& options[1].checked === false 
		&& options[2].checked === false 
		&& options[3].checked === false 
		) {
			document.getElementById('option-modal').style.display = 'flex';
		}

		options.forEach( option =>  {
			if (option.checked === true && option.value === currentQuestionAnswer) {
				document.getElementById(correctOption).style.backgroundColor = "#63FF8F"; // lightgreen
				playerScore++;
				indexNumber++;
				setTimeout(() => {
					questionNumber++;
				}, 1000);
			} else if (option.checked === true && option.value !== currentQuestionAnswer) {
				const wrongLabelId = option.labels[0].id;
				document.getElementById(wrongLabelId).style.backgroundColor = "#FF6363"; // lightred
				document.getElementById(correctOption).style.backgroundColor = "#63FF8F"; // lightgreen
				wrongAttempt++;
				indexNumber++;
				setTimeout(() => {
					questionNumber++;
				}, 1000);
			}
		});
}

function handleNextQuestion() {
  checkForAnswer();
  unCheckRadioButtons();
  
  setTimeout(() => {
    if (indexNumber <= questionsCount) {
      NextQuestion(indexNumber);
    } else {
      handleEndGame();
    }
    resetOptionBackground();
  }, 1000);
}

function resetOptionBackground() {
	const options = document.getElementsByName('option');
	options.forEach( option => {
		const labelId = option.labels[0].id;
		document.getElementById(labelId).style.backgroundColor = "";
	});
}

function unCheckRadioButtons() {
	const options = document.getElementsByName('option');
	// options.forEach(option => { 
	// 	option.checked = false;
	// });

	for(let i = 0; i < options.length; i++) {
		options[i].checked = false;
	}
}

function handleEndGame() {

	let remark = null;
	let remarkColor = null;

	if (playerScore < questionsCountByPeople * 0.3) {
		remark = "Bad Grades, Keep Practicing.";
		remarkColor = "red";
	} else if (playerScore >= questionsCountByPeople * 0.3 
							&& playerScore <= questionsCountByPeople * 0.7) {
		remark = "Average Grades, You can do better.";
		remarkColor = "orange";
	} else if (playerScore > questionsCountByPeople * 0.7) {
		remark = "Excelent, Keep the good work going";
		remarkColor = "green";
	}

	const playerGrade = (playerScore / questionsCountByPeople) * 100;
	document.getElementById('remarks').innerHTML = remark;
	document.getElementById('remarks').style.color = remarkColor;
	document.getElementById('grade-percentage').innerHTML = playerGrade.toFixed(0);
	document.getElementById('wrong-answers').innerHTML =	wrongAttempt;
	document.getElementById('right-answers').innerHTML = playerScore;
	document.getElementById('score-modal').style.display = 'flex';
}

function closeScoreModal() {
  questionNumber = 1;
	playerScore = 0;
	wrongAttempt = 0;
	indexNumber = 0;
	shuffledQuestions = [];
	NextQuestion(indexNumber);
	document.getElementById('score-modal').style.display = 'none';
}

function closeOptionModal() {
	document.getElementById('option-modal').style.display = 'none';
}
