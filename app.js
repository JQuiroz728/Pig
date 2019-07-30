// Initialize globals
let scores, roundScore, currentPlayer, gamePlaying;

initGame(); //Game loop


// Rolling dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // Random number (1-6) for dice 
        let dice = Math.floor(Math.random() * 6) + 1;
        // Display result
        const diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        // Update round score IF rolled number was NOT 1 (loses round score)
        if (dice !== 1) {
            roundScore += dice; // Add score
            document.querySelector('#current-' + currentPlayer).textContent = roundScore;
        } else { // Next player turn
            nextPlayer();
        }
    }
});


// Hold Functionality
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add current score to total score
        scores[currentPlayer] += roundScore;
        // Display
        document.querySelector('#score-' + currentPlayer).textContent = scores[currentPlayer];
        // Verify if player has won
        if (scores[currentPlayer] >= 100) {
            document.querySelector('#name-' + currentPlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else { // Continue
            nextPlayer();
        }
    }
});


// New game
document.querySelector('.btn-new').addEventListener('click', initGame);


function initGame() {
    scores = [0, 0];
    roundScore = 0;
    currentPlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active'); // Reinitialize player 1 as current player
}


const nextPlayer = () => {
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}
