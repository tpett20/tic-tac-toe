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

function init() {
    console.log('starting game')
    for (square of squareEls) {
        square.classList.add('inactive')
        square.classList.remove('first-player')
        square.classList.remove('second-player')
        square.textContent = ''
    }
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    console.log('Board of Zeroes', board)
    turn = 0
    winnerEl.textContent = 'Winner: ❓'
    render()
}

function render() {
    console.log('rendering game')
    if (turn % 2 === 0) {
        squareModifier = 1
    } else {
        squareModifier = (-1)
    }
    playerIcon = playerIcons[Number(squareModifier)]
    winnerIcon = playerIcons[-Number(squareModifier)]
    turnEl.textContent = `Your Move: ${playerIcon}`
    console.log('Turn', turn)
    console.log('Square Changer', squareModifier)
    console.log('Player Icon', playerIcon)
    console.log('Winner Icon', winnerIcon)
}

function setSquare(evt) {
    evt.target.classList.remove('inactive')
    evt.target.classList.remove('first-player')
    evt.target.classList.remove('second-player')
    // CLEAN THIS UP TO REMOVE first and second player tags when game ends or resets!
    if (squareModifier === 1) {
        evt.target.classList.add('first-player')
    } else {
        evt.target.classList.add('second-player')
    }
    const squarePlayedIndex = evt.target.id
    console.log('Square Index', squarePlayedIndex)
    console.log('Square Modifier', squareModifier)
    board[squarePlayedIndex] += squareModifier
    console.log('Square Played Value', board[squarePlayedIndex])
    console.log('Icon Option', playerIcon)
    for (squareEl of squareEls) {
        if (squareEl.id === squarePlayedIndex) {
            squareEl.innerHTML = `<p class="square-text">${playerIcon}</p>`
            squareEl.removeEventListener('click', handleClick)
        }
    }
}

function checkWinStatus() {
    if (
        // Horizontal Wins
        (board[0] && board[0] === board[1] && board[0] === board[2]) ||
        (board[3] && board[3] === board[4] && board[3] === board[5]) ||
        (board[6] && board[6] === board[7] && board[6] === board[8]) ||
        // Vertical Wins
        (board[0] && board[0] === board[3] && board[0] === board[6]) ||
        (board[1] && board[1] === board[4] && board[1] === board[7]) ||
        (board[2] && board[2] === board[5] && board[2] === board[8]) ||
        // Diagonal Wins
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
    console.log('Stopping Play')
    for (squareEl of squareEls) {
        squareEl.removeEventListener('click', handleClick)
        squareEl.classList.remove('inactive')
    }
    highlightBtn()
    if (gameResult === 'win') {
        displayWinner()
    } else if (gameResult === 'tie') {
        displayTie()
    }
}

function highlightBtn() {
    console.log('Start Over is now Play Again')
    resetBtn.classList.add('play-again')
    resetBtn.textContent = 'Play Again!'
}

function displayWinner() {
    console.log('game over')
    turnEl.textContent = `🏆 ${winnerIcon} 🏆`
    winnerEl.textContent = `Winner: ${winnerIcon}`

}

function displayTie() {
    console.log('tie game')
    turnEl.textContent = `It's a 👔!`
    winnerEl.textContent = `Winner: 🙀`

}

/*----- event listeners -----*/

function handleClick(evt) {
    setSquare(evt)
    turn++
    render()
    checkWinStatus()
}

for (squareEl of squareEls) {
    console.log('adding listener to each:', squareEl)
    squareEl.addEventListener('click', handleClick)
}

function handleReset() {
    for (squareEl of squareEls) {
        console.log('adding listener to each:', squareEl)
        squareEl.addEventListener('click', handleClick)
    }
    init()
}

resetBtn.addEventListener('click', handleReset)

init()