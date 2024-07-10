// SCENES
const homeElement = document.querySelector('.home');
const gameElement = document.querySelector('.game');
// PANELS
const blackScreen = document.querySelector('.blackscreen');
const ansPanel = document.querySelector('.ans');
const resPanel = document.querySelector('.res');
const winningPanel = document.querySelector('.answer');
const restartPanel = document.querySelector('.restart-panel');
// TEXTS
const winAnswer = document.querySelector('#win-answer');
// BUTTONS
const quitBtn = document.querySelector('#quit');
const nextBtn = document.querySelector('#next');
let turnText = document.querySelector('.turn-btn');
const cancelBtn = document.querySelector('#cancel');
const yesRestartBtn = document.querySelector('#yesRe');
const reBtn = document.querySelector('.restart-btn');
const playerBtn = document.querySelector('.player');
// VALUES
let compNumber = 0;
let tieNumber = 0;
let xNumber = 0;
// SCORES TEXTS
let xText = document.getElementById('you-score');
let compText = document.getElementById('cpu-score');
let tieText = document.getElementById('tie-score');
let flexObj = document.getElementById('flex');
//TEXTS with CPU
const lost = 'OH NO, YOU LOST…';
const round = 'TAKES THE ROUND';
const takeRound = document.getElementById('take-round');
let winnerImage = document.getElementById('winnerImage');
const won = 'YOU WON!';
// 
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
// 

// QUIT button onclick
quitBtn.addEventListener('click', function () {
    location.reload();
});
// Start game function
function startGame() {
    homeElement.classList.add('none');
    gameElement.classList.add('block');
}
// PLAYER button onclick
playerBtn.addEventListener('click', startGame);

// RESTART button onclick
reBtn.addEventListener('click', function () {
    resPanel.classList.add('block');
    blackScreen.classList.add('block');
    handleRestartGame();

});
// cancel button onclick
cancelBtn.addEventListener('click', function () {
    resPanel.classList.remove('block');
    blackScreen.classList.remove('block');
});
//yes, restart button click
yesRestartBtn.addEventListener('click', function () {
    resPanel.classList.remove('block');
    blackScreen.classList.remove('block');
    valueFunc();
});
function valueFunc() {
    xNumber = 0;
    compNumber = 0;
    tieNumber = 0;
    xText.innerHTML = xNumber;
    compText.innerHTML = compNumber;
    tieText.innerHTML = tieNumber;
}
document.querySelectorAll('.box').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelectorAll('.box').forEach(cell => cell.addEventListener('mouseover', function () {
    this.style.cursor = 'pointer';
    if (currentPlayer === "X" && gameState[parseInt(this.getAttribute('data-index'))] === "") {
        this.style.backgroundImage = 'url("./assets/icon-x-outline.svg")';
    } else if (currentPlayer === "O" && gameState[parseInt(this.getAttribute('data-index'))] === "") {
        this.style.backgroundImage = 'url("./assets/icon-o-outline.svg")';
    }
}));
document.querySelectorAll('.box').forEach(cell => cell.addEventListener('mouseout', function () {
    this.style.cursor = 'pointer';
    this.style.backgroundImage = 'none';
}));
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-index')
    );

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    if (currentPlayer === "X") {
        clickedCell.innerHTML = `<img src="./assets/icon-x.svg">`;
    } else {

        clickedCell.innerHTML = `<img src="./assets/icon-o.svg">`;
    }
}
const winningConditions =
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
function handleResultValidation() {
    let roundWon = false;
    let winCondition;
    for (let i = 0; i <= 7; i++) {
        winCondition = winningConditions[i];
        var a = gameState[winCondition[0]];
        var b = gameState[winCondition[1]];
        var c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        if (roundWon && currentPlayer == 'X') {
            winnerImage.style.display = 'block';
            winAnswer.style.display = 'block';
            takeRound.style.color = '#31C3BD';
            takeRound.innerHTML = round;
            winnerImage.src = './assets/icon-x.svg';
            xNumber++;
            xText.innerText = xNumber;
            for (let i = 0; i < 3; i++) {
                const winningCell = document.querySelector(`[data-index="${winCondition[i]}"]`);
                winningCell.style.backgroundColor = '#31C3BD';
                winningCell.innerHTML = `<img src="./assets/X.png" style="width: 50px; height: 50px;">`;
            }
        }
        else if (roundWon && currentPlayer == 'O') {
            winnerImage.style.display = 'block';
            winAnswer.style.display = 'block';
            winnerImage.src = './assets/icon-o.svg';
            takeRound.innerHTML = round;
            takeRound.style.color = '#F2B137';
            takeRound.style.textAlign = 'center';
            takeRound.style.width = '100%';
            compNumber++;
            compText.innerText = compNumber;
            for (let i = 0; i < 3; i++) {
                const winningCell = document.querySelector(`[data-index="${winCondition[i]}"]`);
                winningCell.style.backgroundColor = '#F2B137';
                winningCell.innerHTML = `<img src="./assets/O.svg" style="width: 70px; height: 70px;">`;
            }
        }
        answerPanel();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        answerPanel();
        winnerImage.style.display = 'none';
        winAnswer.style.display = 'none';
        takeRound.innerHTML = 'ROUND TIED';
        takeRound.style.color = '#A8BFC9';
        tieNumber++;
        tieText.innerText = tieNumber;
        flexObj.style.justifyContent = 'space-around';
        gameActive = false;
        return;
    }
    handlePlayerChange();
}
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnText.innerHTML = currentPlayerTurn();
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    turnText.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.box').forEach(cell => cell.innerHTML = "");
    valueFunc();
}
const winningMessage = () => `PLAYER ${currentPlayer} WINS!`;
const drawMessage = () => `ROUND TIE!`;
const currentPlayerTurn = () => `${currentPlayer} turn`;

winAnswer.innerHTML = currentPlayerTurn();

function answerPanel() {
    ansPanel.classList.add('block');
    blackScreen.classList.add('block');
    winAnswer.innerHTML = winningMessage();
}
nextBtn.addEventListener('click', function () {
    ansPanel.classList.remove('block');
    blackScreen.classList.remove('block');
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    turnText.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.box').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.box').forEach(cell => cell.style.backgroundColor = '');
});
const buttons = document.querySelectorAll(".btn");
const xBtn = document.querySelector('#X-btn');
const oBtn = document.querySelector('#O-btn');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        buttons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        if (xBtn.classList.contains('active')) {
            xBtn.querySelector('img').src = './assets/X.png';
            oBtn.querySelector('img').src = './assets/O.png';
        }
        else {
            oBtn.querySelector('img').src = './assets/O.svg';
            xBtn.querySelector('img').src = './assets/X.svg';
        }});
    });