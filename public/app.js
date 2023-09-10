// Initial game state
let cells = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = 'X';
// let result = document.querySelector('.result');
const btns = Array.from(document.querySelectorAll('.btn'));
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');
let isGameActive = true;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const tie = 'tie';

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
    for (let i = 0; i <= 8; i++) {
        if(cells[conditions[i]]==='X' || cells[conditions[i]]==='O')
        {
            roundWon = true;
            break;
        }
        else
            i--;
        //const winCondition = conditions[i];
        // const a = cells[conditions[i+0]];
        // const b = cells[conditions[i+1]];
        // const c = cells[conditions[i+2]];
        // if (a===[' ',' ',' '] || b===[' ',' ',' '] || c===[' ',' ',' ']){
        //     continue;
        // }
        // if (a!=[' ',' ',' '] && b!=[' ',' ',' '] && c!=[' ',' ',' ']) {
        //     roundWon = true;
        //     break;
        // }
    }

    if (roundWon) {
        announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }
    if (!cells.includes(' '))
        announce(tie);
}

const announce = (type) => {
    switch (type) {
        case PLAYERO_WON:
            announcer.innerHTML = 'Player O Won';
            break;
        case PLAYERX_WON:
            announcer.innerHTML = 'Player X Won';
            break;
        case tie:
            announcer.innerText = 'Tie';
    }
    announcer.classList.remove('hide');
};

const isValidAction = (element) => {
    if (element.innerText === 'X' || element.innerText === 'O') {
        return false;
    }
    return true;
};

const updateBoard = (index) => {
    cells[index] = currentPlayer;
}

const changePlayer = () => {
    playerDisplay.classList.remove('player${currentPlayer}');
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add('player${currentPlayer}');
}

// Function to handle player moves
const ticTacToe = (element, index) => {
    if (isValidAction(element) && isGameActive) {
        element.innerText = currentPlayer;
        element.classList.add('player${currentPlayer}');
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}

// Function to reset the game
const resetGame = () => {
    cells = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    btns.forEach(element => {
        element.innerText = '';
        element.classList.remove('playerX');
        element.classList.remove('playerO');
    })
}

btns.forEach((btn, index) => {
    btn.addEventListener('click', () => ticTacToe(btn, index));
});

resetButton.addEventListener('click', resetGame);
