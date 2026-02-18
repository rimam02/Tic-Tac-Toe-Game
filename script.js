let currentPlayer = "X";
let gameActive = true;

let gameState = ["","","","","","","","",""];

let xScore = 0;
let oScore = 0;

const winConditions = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

function startGame()
{
document.getElementById("start-screen").classList.remove("active");
document.getElementById("game-screen").classList.add("active");
}

function makeMove(cell,index)
{

if(gameState[index] !== "" || !gameActive)
return;

gameState[index] = currentPlayer;

cell.textContent = currentPlayer;

if(checkWinner())
return;

currentPlayer = currentPlayer === "X" ? "O" : "X";

document.getElementById("player-turn").textContent = currentPlayer;

}

function checkWinner()
{

for(let condition of winConditions)
{

let a = condition[0];
let b = condition[1];
let c = condition[2];

if(
gameState[a] !== "" &&
gameState[a] === gameState[b] &&
gameState[a] === gameState[c]
)
{

gameActive = false;

let winner = gameState[a]; 

highlightWin(condition);

if(winner === "X")
{
xScore++;
document.getElementById("x-score").textContent = xScore;
}
else
{
oScore++;
document.getElementById("o-score").textContent = oScore;
}

setTimeout(() =>
{
showGameOver(winner + " Wins!");
},1000);

return true;

}

}

if(!gameState.includes(""))
{
gameActive = false;

setTimeout(() =>
{
showGameOver("Draw!");
},1000);

return true;
}

return false;

}

function highlightWin(condition)
{

let cells = document.querySelectorAll(".cell");

condition.forEach(index =>
{
cells[index].classList.add("win");
});

}

function showGameOver(message)
{

document.getElementById("game-screen").classList.remove("active");

document.getElementById("game-over-screen").classList.add("active");

document.getElementById("winner-text").textContent = message;

}

function restartGame()
{
resetBoard();
}

function playAgain()
{

resetBoard();

document.getElementById("game-over-screen").classList.remove("active");

document.getElementById("game-screen").classList.add("active");

}

function resetBoard()
{

gameState = ["","","","","","","","",""];

gameActive = true;

currentPlayer = "X";

document.getElementById("player-turn").textContent = "X";

let cells = document.querySelectorAll(".cell");

cells.forEach(cell =>
{
cell.textContent = "";
cell.classList.remove("win");
});

}
