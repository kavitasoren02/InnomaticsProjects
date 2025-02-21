let timer;
        let score = 0;
        let selectedCategory = "";
        let flippedCards = [];

        const categories = {
            animals: ["🐶", "🐱", "🐭", "🐰", "🐼", "🐷", "🐵", "🐧"]
        };

        function startGame(category) {
            selectedCategory = category;
            document.getElementById("landing-page").classList.add("hidden");
            document.getElementById("game-container").classList.remove("hidden");
            initializeGame();
        }

        function initializeGame() {
            const board = document.getElementById("game-board");
            board.innerHTML = "";
            score = 0;
            document.getElementById("score").textContent = score;
            flippedCards = []; // Clear flipped cards

            let items = categories[selectedCategory];
            items = [...items, ...items].sort(() => Math.random() - 0.5);
            items = items.slice(0, 16); // Take only the first 16

            items.forEach((item) => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.dataset.value = item;

                const cardFront = document.createElement("div");
                cardFront.classList.add("card-front");

                const cardBack = document.createElement("div");
                cardBack.classList.add("card-back");
                cardBack.textContent = item;

                card.appendChild(cardFront);
                card.appendChild(cardBack);

                card.onclick = () => flipCard(card);
                board.appendChild(card);
            });

            startTimer();
        }

        function flipCard(card) {
            if (flippedCards.length < 2 && !card.classList.contains("matched") && !card.classList.contains("flipped")) {
                card.classList.toggle("flipped");

                if (flippedCards.length === 0) {
                    flippedCards.push(card);
                } else if (flippedCards.length === 1 && flippedCards[0] !== card) {
                    flippedCards.push(card);
                    setTimeout(checkMatch, 1000);
                }
            }
        }

        function checkMatch() {
            const [card1, card2] = flippedCards;
            const value1 = card1.querySelector('.card-back').textContent;
            const value2 = card2.querySelector('.card-back').textContent;

            if (value1 === value2) {
                card1.classList.add("matched");
                card2.classList.add("matched");
                score += 10;
                document.getElementById("score").textContent = score;
            } else {
                setTimeout(() => {
                    card1.classList.remove("flipped");
                    card2.classList.remove("flipped");
                }, 500);
            }
            flippedCards = [];

            const matchedCards = document.querySelectorAll('.matched');
            if (matchedCards.length === document.querySelectorAll('.card').length) {
                clearInterval(timer);
                alert("Game Over! Your Score: " + score);
                restartGame();
            }
        }

        function startTimer() {
            let timeLeft = 30;
            document.getElementById("timer").textContent = timeLeft;
            timer = setInterval(() => {
                timeLeft--;
                document.getElementById("timer").textContent = timeLeft;
                if (timeLeft === 0) {
                    clearInterval(timer);
                    alert("Game Over! Your Score: " + score);
                    restartGame();
                }
            }, 1000);
        }

        function restartGame() {
            clearInterval(timer);
            document.getElementById("landing-page").classList.remove("hidden");
            document.getElementById("game-container").classList.add("hidden");
        }