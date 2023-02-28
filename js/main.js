/*----- constants -----*/

playerIcons = {
    '-1': 'X',
    '1': 'O'
}

/*----- state variables -----*/

let turn
let squareModifier
let board = []
let playerIcon

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
        square.textContent = ''
        square.addEventListener('click', handleClick)
    }
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    console.log('Board of Zeroes', board)
    turn = 0
    winnerEl.textContent = 'Winner: TBD'
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
    turnEl.textContent = `Your Move: ${playerIcon}`
    console.log('Turn', turn)
    console.log('Square Changer', squareModifier)
    console.log('Player Icon', playerIcon)
}

function setSquare(evt) {
    const squarePlayedIndex = evt.target.id
    console.log('Square Index', squarePlayedIndex)
    console.log('Square Modifier', squareModifier)
    board[squarePlayedIndex] += squareModifier
    console.log('Square Played Value', board[squarePlayedIndex])
    console.log('Icon Option', playerIcon)
    for (squareEl of squareEls) {
        if (squareEl.id === squarePlayedIndex) {
            squareEl.textContent = playerIcon
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
        stopPlay()
    }
}

function stopPlay() {
    console.log('Stopping Play')
    for (squareEl of squareEls) {
        squareEl.removeEventListener('click', handleClick)
    }
    displayWinner()
}

function displayWinner() {
    console.log('game over')
    turnEl.textContent = 'No More Moves'
    winnerEl.textContent = `${playerIcon} Wins the Game!`

}

/*----- event listeners -----*/

function handleClick(evt) {
    setSquare(evt)
    turn++
    render()
    checkWinStatus()
}

// for (squareEl of squareEls) {
//     console.log('adding listener to each:', squareEl)
//     squareEl.addEventListener('click', handleClick)
// }

function handleReset() {
    init()
}

resetBtn.addEventListener('click', handleReset)

init()