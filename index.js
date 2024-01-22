// get the score from LS or default Scores

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0, 
    losses: 0,
    ties: 0
}

updateScore();

document.querySelector('.rock').addEventListener (
    'click', () => {
        playGame('rock');
    }
);

document.querySelector('.paper').addEventListener(
    'click', () => {
        playGame('paper');
    }
);
document.querySelector('.scissor').addEventListener(
    'click', () => {
        playGame('scissor');
    }
);

document.body.addEventListener('keydown', event => {
    if (event.key === 'r'){
        playGame('rock')
    }
    else if (event.key === 'p'){
        playGame('paper')
    }
    else if (event.key === 's'){
        playGame('scissor')
    }
});

function selectComputerMove () {
    const randomNumber  = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber <= (1 / 3)){
        computerMove = 'rock';
    }
    else if (randomNumber > (1 / 3 ) && randomNumber < (2 / 3)){
        computerMove = 'paper';
    }
    else if (randomNumber > (2 / 3 ) && randomNumber < 1){
        computerMove = 'scissor';
    }
    return(computerMove);
};

function playGame (playerMove) {
    const computerMove = selectComputerMove();
    let result = '' ;

    if (playerMove === 'rock'){
        if (computerMove === 'rock'){
            result = 'tie';
        }
        else if (computerMove === 'paper') {
            result = 'you lose';
        }
        else if (computerMove === 'scissor'){
            result = 'you win';
        }
    }
    else if (playerMove === 'paper'){
        if (computerMove === 'paper'){
            result = 'tie';
        }
        else if (computerMove === 'scissor'){
            result = 'you lose';
        }
        else if (computerMove === 'rock'){
            result = 'you win';
        }
    }
    else if (playerMove === 'scissor'){
        if (computerMove === 'scissor'){
            result = 'tie';
        }
        else if (computerMove === 'rock'){
            result = 'you lose';
        }
        else if (computerMove === 'paper'){
            result = 'you win';
        }
    }

    if (result === 'you win'){
        score.wins += 1;
    }
    else if (result === 'you lose') {
        score.losses += 1;
    }
    else if (result === 'tie'){
        score.ties += 1;
    }


    //save result
    localStorage.setItem('score', JSON.stringify(score));
    updateScore();

    //print result
    document.querySelector('.gameResult').innerHTML = result.toUpperCase();

    //display computer move
    document.querySelector('.gameMoves').innerHTML = ` 
    <button type="button" class="svg-button">
    <img src="logos/${computerMove}.svg" alt="${computerMove}" class="icon" />
    <p>${computerMove}</p>
    </button> `
};

function updateScore () {
    document.querySelector('.gameScore').innerHTML = `Wins : ${score.wins} Losses : ${score.losses} Ties : ${score.ties}` 
}


function resetScore () {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    //remove localstorage
    localStorage.removeItem("score");
    //update the score display
    updateScore();
}

document.getElementById('resetScores').addEventListener('click', resetScore);
