/*----- constants -----*/


/*----- state variables -----*/

squareStatus

/*----- cached elements  -----*/

const boardEl = document.querySelector('#board')


/*----- functions -----*/

function init() {
    console.log('starting game')
    render()
}

function render() {
    console.log('rendering game')
}

function setSquare(evt) {
    
}

/*----- event listeners -----*/

boardEl.addEventListener('click', setSquare)