document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Functionality ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    // ... (theme toggle logic remains the same)

    // --- Tic-Tac-Toe Game Functionality ---
    const cells = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('game-board');
    const statusText = document.getElementById('status-text');
    const restartButton = document.getElementById('restart-button');
    const winAnimationContainer = document.getElementById('win-animation-container'); // Get the animation container
    const PLAYER_X = 'x';
    const PLAYER_O = 'o'; // Bot
    const WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    let gameActive = true;

    // ... (theme toggle logic here)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) { body.classList.add(savedTheme); }
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : '');
    });

    startGame();
    restartButton.addEventListener('click', startGame);

    function startGame() {
        gameActive = true;
        winAnimationContainer.classList.remove('active'); // Hide animation on restart
        cells.forEach(cell => {
            cell.classList.remove(PLAYER_X, PLAYER_O);
            cell.removeEventListener('click', handleCellClick);
            cell.addEventListener('click', handleCellClick, { once: true });
        });
        board.classList.remove('thinking');
        statusText.innerText = "Your turn (X)";
    }

    function handleCellClick(e) {
        if (!gameActive) return;
        const cell = e.target;
        placeMark(cell, PLAYER_X);

        if (checkWin(PLAYER_X)) {
            endGame(false, PLAYER_X);
        } else if (isDraw()) {
            endGame(true);
        } else {
            statusText.innerText = "Bot is thinking...";
            board.classList.add('thinking');
            setTimeout(botMove, 700);
        }
    }

    function botMove() {
        // ... (botMove logic remains the same)
        if (!gameActive) return;
        const bestMove = findBestMove();
        if (bestMove) { placeMark(bestMove, PLAYER_O); }
        if (checkWin(PLAYER_O)) {
            endGame(false, PLAYER_O);
        } else if (isDraw()) {
            endGame(true);
        } else {
            statusText.innerText = "Your turn (X)";
            board.classList.remove('thinking');
            gameActive = true;
        }
    }

    function findBestMove() {
        // ... (findBestMove logic remains the same)
        for (const combination of WINNING_COMBINATIONS) { /* Check for bot win */ const [a,b,c] = combination; if(cells[a].classList.contains(PLAYER_O) && cells[b].classList.contains(PLAYER_O) && !cells[c].matches('.x, .o')) return cells[c]; if(cells[a].classList.contains(PLAYER_O) && cells[c].classList.contains(PLAYER_O) && !cells[b].matches('.x, .o')) return cells[b]; if(cells[b].classList.contains(PLAYER_O) && cells[c].classList.contains(PLAYER_O) && !cells[a].matches('.x, .o')) return cells[a]; }
        for (const combination of WINNING_COMBINATIONS) { /* Check for player block */ const [a,b,c] = combination; if(cells[a].classList.contains(PLAYER_X) && cells[b].classList.contains(PLAYER_X) && !cells[c].matches('.x, .o')) return cells[c]; if(cells[a].classList.contains(PLAYER_X) && cells[c].classList.contains(PLAYER_X) && !cells[b].matches('.x, .o')) return cells[b]; if(cells[b].classList.contains(PLAYER_X) && cells[c].classList.contains(PLAYER_X) && !cells[a].matches('.x, .o')) return cells[a]; }
        const availableCells = [...cells].filter(c => !c.matches('.x, .o'));
        return availableCells.length ? availableCells[Math.floor(Math.random() * availableCells.length)] : null;
    }

    function endGame(draw, winner = null) {
        gameActive = false;
        board.classList.remove('thinking');
        if (draw) {
            statusText.innerText = 'It\'s a Draw!';
        } else {
            statusText.innerText = `${winner === PLAYER_X ? 'You Win!' : 'Bot Wins!'}`;
            if (winner === PLAYER_X) {
                winAnimationContainer.classList.add('active'); // Trigger animation on player win
            }
        }
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    }

    function isDraw() {
        return [...cells].every(cell => cell.classList.contains(PLAYER_X) || cell.classList.contains(PLAYER_O));
    }

    function placeMark(cell, playerClass) {
        cell.classList.add(playerClass);
        cell.removeEventListener('click', handleCellClick);
    }

    function checkWin(playerClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => cells[index].classList.contains(playerClass));
        });
    }
});
