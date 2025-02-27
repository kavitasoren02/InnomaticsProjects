const gameBoard = document.getElementById("game-board");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");

let cards = [];
let flippedCards = [];
let score = 0;
let timer;
let timeLeft;

const categories = {
    animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
    fruits: ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🥭", "🍍"],
    emojis: ["😀", "😂", "😎", "😡", "😍", "🤯", "🥶", "🤩"],
    shapes: ["🔷", "⬛", "🔺", "⭐", "⚪", "🔶", "⬜", "🟠"]
};

// Function to start the game
function startGame(category) {
    document.getElementById("landing-page").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");

    score = 0;
    scoreElement.textContent = score;

    createBoard(category);
    startTimer(); // Start the timer
}

// Function to create the game board
function createBoard(category) {
    const selectedEmojis = categories[category];
    cards = [...selectedEmojis, ...selectedEmojis]; // Duplicate for pairs
    cards.sort(() => Math.random() - 0.5); // Shuffle cards

    gameBoard.innerHTML = ""; // Clear previous game board

    cards.forEach((emoji) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");

        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        cardBack.textContent = emoji;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener("click", () => flipCard(card));

        gameBoard.appendChild(card);
    });
}

// Function to flip a card
function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

// Function to check if two flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.innerHTML === card2.innerHTML) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        score += 10;
        scoreElement.textContent = score;
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
    }
    flippedCards = [];

    if (document.querySelectorAll(".matched").length === cards.length) {
        clearInterval(timer);
        alert("🎉 You won! Score: " + score);
    }
}

// Function to start the timer
function startTimer() {
    timeLeft = 30;
    timerElement.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            alert("⏳ Time's up! Your Score: " + score);
            restartGame();
        }
    }, 1000);
}

// Function to restart the game
function restartGame() {
    clearInterval(timer); // Stop the timer
    flippedCards = []; // Clear flipped cards

    document.getElementById("game-container").classList.add("hidden");
    document.getElementById("landing-page").classList.remove("hidden");
}
