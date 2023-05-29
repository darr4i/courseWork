'use strict'
const gameBoard = document.querySelector("#gameboard");
const info = document.querySelector("#info");

const cells = [
    "", "", "", "", "", "", "", "", "",
]

let turn = "cross";
info.textContent = "Cross goes first."

const nextMove = (e) => {
    if (e.target.firstChild !== null) {
        return;
    }
    const moveDisplay = document.createElement('div');
    moveDisplay.classList.add(turn);
    e.target.append(moveDisplay);
    turn = turn === "cross" ? "circle" : "cross";
    info.textContent = "It is " + turn + " now";

    e.target.removeEventListener("click", nextMove);

    checkScore();

    if (turn === "circle") {
        setTimeout(aiMove, 300);
    }
}

const aiMove = () => {
    const availableCells = cells.reduce((acc, cell, index) => {
        if (cell === "") {
            acc.push(index);
        }
        return acc;
    }, []);

    if (availableCells.length === 0) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const selectedCell = availableCells[randomIndex];

    const moveDisplay = document.createElement('div');
    moveDisplay.classList.add(turn);

    const cellElement = document.getElementById(selectedCell.toString());

    if (cellElement.firstChild !== null) {
        aiMove(); 
        return;
    }

    cellElement.append(moveDisplay);

    turn = turn === "cross" ? "circle" : "cross";
    info.textContent = "It is " + turn + " now";

    checkScore();

    cellElement.addEventListener("click", nextMove);
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
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    combo.forEach(array => {
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));

        if (crossWins) {
            info.textContent = "Cross wins!";
            disableClicks();
            return
        }
    })

    combo.forEach(array => {
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));

        if (circleWins) {
            info.textContent = "Circle wins!";
            disableClicks();
            return
        }
    })

    const isTie = Array.from(allSquares).every(square => square.firstChild !== null);
    if (isTie) {
        info.textContent = "Tie!";
        disableClicks();
    }
}

const disableClicks = () => {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => square.removeEventListener("click", nextMove));
}

createBoard();
