'use strict'
const gameBoard = document.querySelector("#gameboard");
const info = document.querySelector("#info");

const cells = [
    "", "", "", "", "", "", "", "", "",
]

const nextMove = (e) => {
    console.log(e.target);
}

const createBoard = () => {
cells.forEach((cell, index) => {
    const cellElement = document.createElement('div')
    cellElement.classList.add('square');
    cellElement.id = index;
    cellElement.addEventListener("click", nextMove);
    gameBoard.append(cellElement);
 })
}
createBoard();
