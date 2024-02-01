const statusDisplay = document.querySelector('.spelStatus');

let spelActief = true;
let huidigeSpeler = "X";
let spelStatus = ["", "", "", "", "", "", "", "", ""];

const winstBoodschap = () => `Speler ${huidigeSpeler} heeft gewonnen!`;
const gelijkspelBoodschap = () => `Spel is geëindigd in een gelijkspel!`;
const huidigeSpelerBeurt = () => `Het is de beurt van speler ${huidigeSpeler}`;

statusDisplay.innerHTML = huidigeSpelerBeurt();

const winstCondities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    spelStatus[clickedCellIndex] = huidigeSpeler;
    clickedCell.innerHTML = huidigeSpeler;
}

function handlePlayerChange() {
    huidigeSpeler = huidigeSpeler === "X" ? "O" : "X";
    statusDisplay.innerHTML = huidigeSpelerBeurt();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winstCondities[i];
        let a = spelStatus[winCondition[0]];
        let b = spelStatus[winCondition[1]];
        let c = spelStatus[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winstBoodschap();
        spelActief = false;
        return;
    }

    let roundDraw = !spelStatus.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = gelijkspelBoodschap();
        spelActief = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (spelStatus[clickedCellIndex] !== "" || !spelActief) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    spelActief = true;
    huidigeSpeler = "X";
    spelStatus = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = huidigeSpelerBeurt();
    document.querySelectorAll('.cel').forEach(cel => cel.innerHTML = "");
}

document.querySelectorAll('.cel').forEach(cel => cel.addEventListener('click', handleCellClick));
document.querySelector('.spelHerstart').addEventListener('click', handleRestartGame);