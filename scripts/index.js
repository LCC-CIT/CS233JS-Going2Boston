/* I/O code for the Going to Boston dice game.
   Written by Brian Bird, 4/16/2024, revised 4/22/24 */

// Global constants
const NUMBER_OF_DIE = 3;
const NUMBER_OF_SIDES = 6;   // number of die images--representing the sides of the die

let boston = new Game();
// Temporary for testing
/*
boston.addPlayer("Brian");
document.getElementById("player1").textContent = boston.players[0].name;
boston.addPlayer("Wayne");
document.getElementById("player2").textContent = boston.players[1].name;
*/


// Initialize the page

// disable score and end turn buttons
document.getElementById("endTurn").disabled = true;
document.getElementById("endRound").disabled = true;

// Event handlers for the bottons
document.getElementById("addPlayers").addEventListener("click", addPlayers);
document.getElementById("roll").addEventListener("click", rollDice);
document.getElementById("endTurn").addEventListener("click", endTurn);
document.getElementById("endRound").addEventListener("click", endRound);

// add players to the game
function addPlayers() {
    let player1Name = document.getElementById("player1Name").value;
    let player2Name = document.getElementById("player2Name").value;
    boston.addPlayer(player1Name);
    boston.addPlayer(player2Name);
    document.getElementById("player").textContent = boston.getCurrentPlayer().name;
    document.getElementById("player1").textContent = player1Name;
    document.getElementById("player2").textContent = player2Name;
    document.getElementById("addPlayers").disabled = true;
    document.getElementById("roll").disabled = false;
    enableMovingDice(false);
}

// event handlers

function rollDice() {
    boston.rollDice();
    // set the images to the dice values
    let values = boston.getDiceValues();
    for (let i = 0; i < boston.dice.length; i++) {
        document.getElementById(`${i}`).src = `images/die${values[i]}.png`;
    }
    // enable the dice images to be clicked
    enableMovingDice(true);
}

function setAside() {
    // remove the die from the dice array and add it to the scoreDice array 
    let value = boston.setDieAside(Number(this.id));
    displayDice();
    // add the image to the score dice area
    document.getElementById(`s${boston.scoreDice.length - 1}`).src = `images/die${value}.png`;
    // update the score
    document.getElementById("points").textContent = boston.getScore();
    // if there are three dice in the scoreDice array, enable the end turn button
    if (boston.scoreDice.length === NUMBER_OF_DIE) {
        document.getElementById("endTurn").disabled = false;
    }
    // disable the dice images
    enableMovingDice(false);
}

function endTurn() {
    // enable the End Round button if player 2's turn ended
    if (boston.getCurrentPlayer().number === 2) {
        document.getElementById("endRound").disabled = false;
    }
    boston.endTurn();  // will switch players and reset the dice
    document.getElementById("points").textContent = "";
    document.getElementById("player").textContent = boston.getCurrentPlayer().name;
    // clear the score dice images
    for (let i = 0; i < NUMBER_OF_DIE; i++) {
        document.getElementById(`s${i}`).src = "";
    }
    displayDice();
    // disable the end turn button
    document.getElementById("endTurn").disabled = true;
    displayScores();
}

// end the current round
function endRound() {
    document.getElementById("round").textContent = boston.endRound();
    displayScores();
}

// helper function to enable or disable the dice images to be clicked
function enableMovingDice(canMove) {
    // Event handlers for the dice images so they can be clicked to set them aside die for scoring
    for (let i = 0; i < NUMBER_OF_DIE; i++) {
        let imgElement = document.getElementById(`${i}`);
        if (canMove) {
            imgElement.onclick = setAside;
        }
        else {
            imgElement.onclick = null;
        }
    }
}
// helper function to display the dice values
function displayDice() {
    let values = boston.getDiceValues();
    for (let i = 0; i < NUMBER_OF_DIE; i++) {
        // set the img to the dice value
        if (i < values.length) {
            document.getElementById(`${i}`).src = `images/die${values[i]}.png`;
        }
        else {
            // set the img to "" for the die that aren't there any more
            document.getElementById(`${i}`).src = "";
        }
    }
}

// display the scores of the players
function displayScores() {
    for (let i = 0; i < boston.players.length; i++) {
        document.getElementById(`player${i + 1}RoundScore`).textContent = boston.players[i].roundScore;
        document.getElementById(`player${i + 1}RoundWins`).textContent = boston.players[i].roundWins;
    }
}

/******** Testing *****/

// test to see if players are switched after the score is calculated
function testSwitchPlayer() {
    console.log("Current player: " + boston.getCurrentPlayer().number);
    boston.setDieAside(0);
    boston.setDieAside(0);
    boston.setDieAside(0);
    let score = boston.getScore();
    console.log("Score: " + score);
    console.log("Current player: " + boston.getCurrentPlayer().number);
    score = boston.getScore();
    console.log("Score: " + score);
    console.log("Current player: " + boston.getCurrentPlayer().number);
}
