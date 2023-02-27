/*----- constants -----*/

const colors = {
    '0': 'lightgrey',
    '1': 'lightblue',
    '-1': 'lightgreen'
}

const boardTest = {
    a: [1, 2, 3],
    b: [1, 2, 3],
    c: [1, 2, 3]
}

/*----- state variables -----*/

let turn
let squareChanger
const board = []
let gameStatus

/*----- cached elements  -----*/

const squareEls = document.querySelectorAll('div.square')

/*----- functions -----*/

function init() {
    console.log('starting game')
    for (square of squareEls) {
        square.classList.add('inactive')
    }
    for (let i=0; i<9; i++){
        board.push(0)
    }
    console.log('Board of Zeroes', board)
    turn = 0
    render()
}

function render() {
    console.log('rendering game')
    if (turn % 2 === 0) {
        squareChanger ++
    } else {
        squareChanger --
    }
}

function setSquare(evt) {
    const squarePlayedIndex = evt.target.id
    console.log('Square Index', squarePlayedIndex)
    const squarePlayed = board[squarePlayedIndex]
    console.log('Square Played Value', squarePlayed)
}

function checkWinStatus() {
    if (
        // Horizontal Wins
        (board[0] === board[1] === board[2]) ||
        (board[3] === board[4] === board[5]) ||
        (board[6] === board[7] === board[8]) ||
        // Vertical Wins
        (board[0] === board[3] === board[6]) ||
        (board[1] === board[4] === board[7]) ||
        (board[2] === board[5] === board[8]) ||
        // Diagonal Wins
        (board[0] === board[4] === board[8]) ||
        (board[2] === board[4] === board[6])
        ) {
        gameStatus = 'Game Over'
    }
}

/*----- event listeners -----*/

function handleClick(evt) {
    console.log('this works')
    setSquare(evt)
    checkWinStatus()
    turn++
    render()
}

for (squareEl of squareEls) {
    console.log(squareEl)
    squareEl.addEventListener('click', handleClick)
}

// squareEls.addEventListener('click', setSquare)

init()