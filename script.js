let targetNumber = Math.floor(100000 + Math.random() * 900000).toString();
let guessedDigits = ['_', '_', '_', '_', '_', '_'];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

function updateDisplay() {
    for (let i = 0; i < 6; i++) {
        const digitElement = document.getElementById(`d${i}`);
        digitElement.textContent = guessedDigits[i];
        if (guessedDigits[i] !== '_') {
            digitElement.classList.add('filled');
        }
    }
    document.getElementById('attempts').textContent = `Wrong attempts left: ${maxWrongGuesses - wrongGuesses}`;
}

function makeGuess() {
    const guessInput = document.getElementById('guessInput');
    const guess = guessInput.value;
    const messageElement = document.getElementById('message');

    if (!/^[0-9]$/.test(guess)) {
        messageElement.textContent = "Please enter a single digit (0-9)!";
        guessInput.value = '';
        return;
    }

    let correctGuess = false;
    for (let i = 0; i < targetNumber.length; i++) {
        if (targetNumber[i] === guess && guessedDigits[i] === '_') {
            guessedDigits[i] = guess;
            correctGuess = true;
        }
    }

    if (correctGuess) {
        messageElement.textContent = "Correct guess! Keep going!";
    } else {
        wrongGuesses++;
        messageElement.textContent = "Wrong guess!";
    }

    guessInput.value = '';
    updateDisplay();

    if (wrongGuesses >= maxWrongGuesses) {
        endGame(false);
    } else if (!guessedDigits.includes('_')) {
        endGame(true);
    }
}

function endGame(won) {
    const messageElement = document.getElementById('message');
    const restartButton = document.querySelector('.restart');
    
    if (won) {
        messageElement.textContent = `Congratulations! You guessed ${targetNumber}!`;
    } else {
        messageElement.textContent = `Game Over! The number was ${targetNumber}.`;
    }
    
    document.getElementById('guessInput').disabled = true;
    document.querySelector('button:not(.restart)').disabled = true;
    restartButton.style.display = 'block';
}

function restartGame() {
    targetNumber = Math.floor(100000 + Math.random() * 900000).toString();
    guessedDigits = ['_', '_', '_', '_', '_', '_'];
    wrongGuesses = 0;
    
    document.getElementById('guessInput').disabled = false;
    document.querySelector('button:not(.restart)').disabled = false;
    document.querySelector('.restart').style.display = 'none';
    document.getElementById('message').textContent = "Let's begin! Guess a digit.";
    
    for (let i = 0; i < 6; i++) {
        document.getElementById(`d${i}`).classList.remove('filled');
    }
    updateDisplay();
}

// Initialize the game
updateDisplay();

// Allow Enter key to submit guess
document.getElementById('guessInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        makeGuess();
    }
});
