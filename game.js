const gameBoard = document.querySelector("#gameboard");
const info = document.querySelector("#info");

const cells = [
    "", "", "", "", "", "", "", "", "",
]

const createBoard = () => {
cells.forEach((cell, index) => {
    const cellElement = document.createElement('div')
    cellElement.classList.add('square');
})
}
