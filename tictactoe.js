const tiles = Array.from(document.querySelectorAll('.tile'));
// console.log(tiles); 
const playerDisplay = document.querySelector('.display-player');
// console.log(playerDisplay);
const resetButton = document.querySelector('#reset');
// console.log(resetButton);
const singlePlayer = document.querySelector('#singlePlayer');
// console.log(soloPlayer)
const announcer = document.querySelector('.announcer');
// console.log(announcer);

// **************Variables**********************//
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const PlayerX_Won = 'PlayerX_Won';
const PlayerO_Won = 'PlayerO_Won';
const Tie = 'Tie';

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*
    Index of the board
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/

// **************Functions for state*************//

function resultHandler() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winning = winningCombos[i];
        const a = board[winning[0]];
        const b = board[winning[1]];
        const c = board[winning[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        // console.log(roundWon) registers false 
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    // console.log(roundWon) registers true when won


    if (roundWon) {
        announce(currentPlayer === 'X' ? PlayerX_Won : PlayerO_Won);
        isGameActive = false;
        return;
    }
    // console.log("hello")

    if (!board.includes(''))
        announce(Tie);
}


const announce = (type) => {
    switch (type) {
        case PlayerO_Won:
            announcer.innerHTML = 'Player O Wins!!!';
            break;
        case PlayerX_Won:
            announcer.innerHTML = 'Player X Wins!!!';
            break;
        case Tie:
            announcer.innerText = 'You actually Tied...';
    }
    // console.log("announcement")
    announcer.classList.remove('hide');
};
// console.log(announce) /*runs the switch functions to switch players check*/

const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O') {
        return false;
    }
    // console.log("valid")
    return true;
};

const updateBoard = (index) => {
    board[index] = currentPlayer;
    // console.log("update")
}

const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
    // console.log("playerchange") /*swaps players*/
}

tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => playerAction(tile, index));
});

const playerAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        resultHandler();
        changePlayer();
        // console.log("action") /*registers action*/ 
    }
}


const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    } console.log('hello') /* always starts with x */

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
}

resetButton.addEventListener('click', resetBoard);


// // computer marks a random empty tile
//     let randomInput = Math.ceil(Math.random() * tiles.length) - 1;
//     tiles[random].textContent = mark;
//     isValidAction();
//     changePlayer();
