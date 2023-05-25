'use strict'
const gameBoard = document.querySelector("#gameboard");
const info = document.querySelector("#info");

const cells = [
    "", "", "", "", "", "", "", "", "",
]

let turn = "cross";
info.textContent = "cross goes first"

const nextMove = (e) => {
    const moveDisplay = document.createElement('div');
    moveDisplay.classList.add(turn);
    e.target.append(moveDisplay);
    turn = turn === "cross" ? "circle" : "cross";
    info.textContent = "it is " + turn + " now";
    e.target.removeEventListener("click", nextMove);
    checkScore();
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

const checkScore = () => {
    const allSquares = document.querySelectorAll(".square");
    const combo = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    combo.forEach(array => {
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));

        if (crossWins) {
            info.textContent = "Cross wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })

    console.log(allSquares[0]);

    combo.forEach(array => {
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));

        if (circleWins) {
            info.textContent = "Circle wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })
}
createBoard();
