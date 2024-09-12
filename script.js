let score = 0;
let currentQuestionIndex = 0;

const quizData = [
    {
        question: '"op"',
        correct: 1,
        choices: ['images/op.png', 'images/onder.png', 'images/naast.png']
    },
    {
        question: '"onder"',
        correct: 2,
        choices: ['images/naast.png', 'images/onder.png', 'images/op.png']
    },
    {
        question: '"naast"',
        correct: 3,
        choices: ['images/op.png', 'images/onder.png', 'images/naast.png']
    },
    {
        question: '"in"',
        correct: 1,
        choices: ['images/in.png', 'images/tussen.png', 'images/buiten.png']
    },
    {
        question: '"tussen"',
        correct: 2,
        choices: ['images/in.png', 'images/tussen.png', 'images/achter.png']
    },
    {
        question: '"achter"',
        correct: 3,
        choices: ['images/op.png', 'images/achter.png', 'images/voor.png']
    },
    {
        question: '"voor"',
        correct: 1,
        choices: ['images/voor.png', 'images/achter.png', 'images/naast.png']
    },
    {
        question: '"binnen"',
        correct: 2,
        choices: ['images/binnen.png', 'images/buiten.png', 'images/op.png']
    },
    {
        question: '"buiten"',
        correct: 3,
        choices: ['images/naast.png', 'images/in.png', 'images/buiten.png']
    }
];

// Shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Start the quiz by shuffling the questions
function startQuiz() {
    shuffleArray(quizData);
    document.getElementById('start-btn').style.display = 'none';
    nextQuestion();
}

// Use the Web Speech API to read out the question
function speakQuestion(text) {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.lang = 'nl-NL';  // Set to Dutch
    synth.speak(utterThis);
}

// Load the next question
function nextQuestion() {
    if (currentQuestionIndex < quizData.length) {
        const questionData = quizData[currentQuestionIndex];

        // Shuffle answers for each question
        const choices = [...questionData.choices];
        shuffleArray(choices);

        // Display question and answers
        document.getElementById('question-text').textContent = questionData.question;
        document.getElementById('choice1').src = choices[0];
        document.getElementById('choice2').src = choices[1];
        document.getElementById('choice3').src = choices[2];

        // Speak the question
        speakQuestion(questionData.question);
    } else {
        // End of quiz
        document.getElementById('question-text').textContent = 'Gefeliciteerd! Je hebt de quiz voltooid!';
        document.getElementById('choices-container').style.display = 'none';
    }
}

// Check if the selected answer is correct
function checkAnswer(selected) {
    const questionData = quizData[currentQuestionIndex];
    const correctChoice = questionData.choices[questionData.correct - 1];

    if (document.getElementById('choice' + selected).src.includes(correctChoice)) {
        document.getElementById('feedback').textContent = '🎉 Goed gedaan!';
        score++;
    } else {
        document.getElementById('feedback').textContent = '😕 Probeer het opnieuw!';
    }

    document.getElementById('score').textContent = score;
    currentQuestionIndex++;
    setTimeout(nextQuestion, 2000);  // Move to the next question after 2 seconds
}

// On page load, display the start button
window.onload = () => {
    document.getElementById('start-btn').style.display = 'block';
};
