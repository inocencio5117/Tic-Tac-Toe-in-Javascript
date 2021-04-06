// slider é o controlador dos turnos 
const slider = document.querySelector('.slider');

slider.classList.add('xactive');

// controla a transição da tela inicial para o jogo
const game = document.querySelector('.game');
const inicialScreen = document.querySelector('.inicial-screen');

const resultBox = document.querySelector('.result-box');
const winnerPlayer = document.querySelector('.winner');

// condição de vitória e marcador 
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let board = [
    '', '', '',

    '', '', '',

    '', '', ''
];

function verifyWin() {

    let winner;

    winningConditions.forEach(function (combo, index) {

        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];

        let roundDraw = !board.includes("");

        if (roundDraw) {

            game.classList.add('hide');
            resultBox.classList.remove('hide')
            winnerPlayer.innerHTML = "It's a tie!";
            return;
        }
    });

    return winner;
   
}

// função de reinicio
function restartButton() {

    board = ["", "", "", "", "", "", "", "", ""];

    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");

    game.classList.remove('hide');
    resultBox.classList.add('hide')

    if (!slider.classList.contains('xactive')) slider.classList.add('xactive');
}


function clickCell() {

    // detecta os clicks
    document.addEventListener('click', (e) => {
        const el = e.target;
        let att = el.getAttribute('data-index');

        // verifica a vitória a cada clique
        if (el) verifyWin();

        // evita o click em uma celula já ocupada
        if (el.classList.contains('img')) return;

        // condição de vitória
        if (verifyWin() === 'x' || verifyWin() === 'o') {
            game.classList.add('hide');
            resultBox.classList.remove('hide')
            winnerPlayer.innerHTML =`Player <b>${verifyWin().toUpperCase()}</b> won!`;
        }

        // click no botão restart
        if (el.classList.contains('btn-restart')) restartButton();  

        // função que inicia o jogo
        function playGame() {

            // click no botão start
            if (el.classList.contains('btn-start')) {
                inicialScreen.classList.add('hide');
                game.classList.remove('hide');
            }

            // colocando os marcadores na tela
            if (el.classList.contains('cell') && slider.classList.contains('xactive')) {
                if (el.classList.contains('cell')) el.innerHTML = '<img src="assets/img/x-mark.png" alt="x image" class="img">';
                slider.classList.replace('xactive', 'oactive');

                board[att] = 'x';

            } else if (el.classList.contains('cell') && slider.classList.contains('oactive')) {
                el.innerHTML = '<img src="assets/img/circle.png" alt="o image" class="img">';
                slider.classList.replace('oactive', 'xactive');

                board[att] = 'o';
            }
 
        }

        playGame();

    })
}

clickCell();
