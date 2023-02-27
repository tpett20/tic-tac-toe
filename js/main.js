/*----- constants -----*/

const colors = {
    '0': 'lightgrey',
    '1': 'lightblue',
    '-1': 'lightgreen'
}

const board = {
    a: [1, 2, 3],
    b: [1, 2, 3],
    c: [1, 2, 3]
}

/*----- state variables -----*/

let turn
const squares = [0, 0, 0, 0, 0, 0, 0, 0, 0]

/*----- cached elements  -----*/

const squareEls = document.querySelectorAll('div.square')

/*----- functions -----*/

function init() {
    console.log('starting game')
    for (square of squareEls) {
        square.classList.add('inactive')
    }
    render()
}

function render() {
    console.log('rendering game')
}

function setSquare(evt) {
    
}

/*----- event listeners -----*/

// squareEls.addEventListener('click', setSquare)

init()