// Initial game state
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

// let result = document.querySelector('.result');
const boxes = Array.from(document.querySelectorAll('.btn'));
const playerDisplay = document.querySelector('.current_player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

const conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = conditions[i];
        const a = cells[winCondition[0]];
        const b = cells[winCondition[1]];
        const c = cells[winCondition[2]];
        if (a === '' || b === '' || c === ''){
            continue;
        }
        if (a===b && b===c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }
    if (!cells.includes(''))
        announce(TIE);
}

const announce = (type) => {
    switch (type) {
        case PLAYERO_WON:
            announcer.innerHTML = 'Player O Won';
            break;
        case PLAYERX_WON:
            announcer.innerHTML = 'Player X Won';
            break;
        case TIE:
            announcer.innerText = 'TIE';
    }
    announcer.classList.remove('hide');
};

const isValidAction = (btn) => {
    if (btn.innerText === 'X' || btn.innerText === 'O') {
        return false;
    }
    return true;
};

const updateBoard = (index) => {
    cells[index] = currentPlayer;
}

const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

// Function to handle player moves
const ticTacToe = (btn, index) => {
    if (isValidAction(btn) && isGameActive) {
        btn.innerText = currentPlayer;
        btn.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}

// Function to reset the game
const resetGame = () => {
    cells = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    boxes.forEach(btn => {
        btn.innerText = '';
        btn.classList.remove('playerX');
        btn.classList.remove('playerO');
    })
}

boxes.forEach((btn, index) => {
    btn.addEventListener('click', () => ticTacToe(btn, index));
});

resetButton.addEventListener('click', resetGame);
