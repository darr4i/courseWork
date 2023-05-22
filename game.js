'use strict'
const gameBoard = document.querySelector("#gameboard");
const info = document.querySelector("#info");

const cells = [
    "", "", "", "", "", "", "", "", "",
]

let go = "cross";
info.textContent = "cross goes first"

const nextMove = (e) => {
    const moveDisplay = document.createElement('div');
    moveDisplay.classList.add(go);
    e.target.append(moveDisplay);
    go = go === "cross" ? "circle" : "cross";
    info.textContent = "it is " + go + " now";
    e.target.removeEventListener("click", nextMove);
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
