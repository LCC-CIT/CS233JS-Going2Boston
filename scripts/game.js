/* Written by Brian Bird, 4/16/24 */

class Game {
    // private fields (instance variables)
    #players
    #dice
    #scoreDice
    #currentPlayer

    constructor() { 
        this.#players = [];
        this.#dice = [];
        this.#scoreDice = [];
        this.#currentPlayer = 0;


        // put six die in the dice array
        for (let i = 0; i < NUMBER_OF_DIE; i++) {
            this.#dice.push(new Die());
        }
    }   

    // getters

    // TODO: remove the getters for the private fields
    get dice() { return this.#dice; }
    get scoreDice() { return this.#scoreDice; }
    
    // Add a player to the game
    addPlayer(name) {
        this.#players.push(new Player(name));
    }

    // Get the current player
    getCurrentPlayer() {
        return this.#players[this.#currentPlayer];
    }

    // Pass the dice to the current player and have them roll
    rollDice() {
        this.getCurrentPlayer().roll(this.#dice);
    }

    // get the values of the dice
    getDiceValues() {
        let values = [];
        for (let die of this.#dice) {
            values.push(die.value);
        }
        return values;
    }

    setDieAside(index) {
        // remove the die from the dice array and add it to the scoreDice array
        let removedDice = this.#dice.splice(index, 1); // splice returns an array of Die objects
        let dieRemoved = removedDice[0];
        this.#scoreDice.push(dieRemoved);
        return dieRemoved.value;
    }   

    // Get the sum of the score dice values
    getScore() {
        let sum = 0;
        for (let die of this.#scoreDice) {
            sum += die.value;
        }
        return sum;
    }
}