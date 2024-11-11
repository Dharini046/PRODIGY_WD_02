// script.js

const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('#reset');

let currentPlayer = 'X';  // X goes first
let gameState = ['', '', '', '', '', '', '', '', ''];  // Represents the 9 cells of the board
let gameActive = true;  // To track if the game is ongoing

// Check if there's a winner
const checkWinner = () => {
    const winningPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]               // Diagonals
    ];

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            alert(` hurray!${currentPlayer} wins`);
            gameActive = false;
            return;
        }
    }

    // Check for a tie
    if (!gameState.includes('')) {
        alert('It\'s a tie!');
        gameActive = false;
    }
};

// Handle cell click
const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedIndex = clickedCell.getAttribute('data-cell-index');

    // Prevent the cell from being clicked if it's already filled or if the game is over
    if (gameState[clickedIndex] !== '' || !gameActive) return;

    // Update the game state and the cell
    gameState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check for a winner after the move
    checkWinner();

    // Switch the player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

// Reset the game
const resetGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
};

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

