/*----- constants -----*/

playerIcons = {
    '-1': '🥨',
    '1': '🍩'
}

/*----- state variables -----*/

let turn
let squareModifier
let board = []
let playerIcon
let winnerIcon
let gameResult

/*----- cached elements  -----*/

const squareEls = document.querySelectorAll('div.square')
const resetBtn = document.querySelector('button')
const turnEl = document.querySelector('#turn')
const winnerEl = document.querySelector('#winner')

/*----- functions -----*/

// Initialize

function init() {
    initSquares()
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    turn = Math.floor(Math.random()*2)
    console.log(turn)
    winnerEl.textContent = 'Winner: ❓'
    render()
}

function initSquares() {
    for (square of squareEls) {
        square.classList.add('available')
        square.classList.remove('first-player')
        square.classList.remove('second-player')
        square.textContent = ''
    }
}

// Render

function render() {
    renderModifier()
    renderIcons()
    renderBtn()
    turnEl.textContent = `Your Move: ${playerIcon}`
}

function renderModifier() {
    if (turn % 2 === 0) {
        squareModifier = 1
    } else {
        squareModifier = (-1)
    } 
}

function renderIcons() {
    playerIcon = playerIcons[Number(squareModifier)]
    winnerIcon = playerIcons[-Number(squareModifier)]
}

function renderBtn() {
    resetBtn.classList.remove('play-again')
    resetBtn.textContent = 'Start Over'
}

// Event Response

function modifySquare(evt) {
    // Modify Classes for CSS Styling
    const selectedSquare = evt.target
    selectedSquare.classList.remove('available')
    selectedSquare.classList.remove('first-player')
    selectedSquare.classList.remove('second-player')
    if (squareModifier === 1) {
        selectedSquare.classList.add('first-player')
    } else {
        selectedSquare.classList.add('second-player')
    }
    // Modify Square Content and Clickability
    const squareIndex = selectedSquare.id
    board[squareIndex] += squareModifier
    for (squareEl of squareEls) {
        if (squareEl.id === squareIndex) {
            squareEl.innerHTML = `<p>${playerIcon}</p>`
            squareEl.removeEventListener('click', handleClick)
        }
    }
}

function checkWinStatus() {
    if (
        // Horizontal Win Conditions
        (board[0] && board[0] === board[1] && board[0] === board[2]) ||
        (board[3] && board[3] === board[4] && board[3] === board[5]) ||
        (board[6] && board[6] === board[7] && board[6] === board[8]) ||
        // Vertical Win Conditions
        (board[0] && board[0] === board[3] && board[0] === board[6]) ||
        (board[1] && board[1] === board[4] && board[1] === board[7]) ||
        (board[2] && board[2] === board[5] && board[2] === board[8]) ||
        // Diagonal Win Conditions
        (board[0] && board[0] === board[4] && board[0] === board[8]) ||
        (board[2] && board[2] === board[4] && board[2] === board[6])
    ) {
        gameResult = 'win'
        stopPlay()
    } else if (!board.includes(0)) {
        gameResult = 'tie'
        stopPlay()
    }
}

function stopPlay() {
    disableSquares()
    highlightResetBtn()
    if (gameResult === 'win') {
        displayWinner()
    } else if (gameResult === 'tie') {
        displayTie()
    }
}

function disableSquares () {
    for (squareEl of squareEls) {
        squareEl.removeEventListener('click', handleClick)
        squareEl.classList.remove('available')
    }
}

function highlightResetBtn() {
    resetBtn.classList.add('play-again')
    resetBtn.textContent = 'Play Again!'
}

function displayWinner() {
    turnEl.textContent = `🏆 ${winnerIcon} 🏆`
    winnerEl.textContent = `Winner: ${winnerIcon}`
}

function displayTie() {
    turnEl.textContent = `It's a 👔!`
    winnerEl.textContent = `Winner: 🙀`
}

/*----- event listeners -----*/

function handleClick(evt) {
    modifySquare(evt)
    turn++
    render()
    checkWinStatus()
}

for (squareEl of squareEls) {
    squareEl.addEventListener('click', handleClick)
}

function handleReset() {
    for (squareEl of squareEls) {
        squareEl.addEventListener('click', handleClick)
    }
    init()
}

resetBtn.addEventListener('click', handleReset)

// Initialize Game:
init()