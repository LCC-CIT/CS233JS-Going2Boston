// Written by Brian Bird, 4/9/2024 with the assistance of GitHub Copilot

class Player
{
    // declare private instance variables
    #name
    #number // player number
    #totalScore
    #roundScore
    #roundsWon

    constructor(name)
    {
        // Initialize instance variables.
        this.#name = name;
        this.#number = 0;
        this.#totalScore = 0;
        this.#roundScore = 0;
    }

    // Getters and Setters
    get name() {return this.#name; }
    get number() { return this.#number; }
    get roundScore() { return this.#roundScore; }
    get totalScore() { return this.#totalScore; }

    set number(value) { this.#number = value; }
    set roundScore(value) { this.#roundScore = value; }
    set totalScore(value) { this.#totalScore = value; }

    // Roll all the dice in the array passed to the player
    roll(dice)
    {
        for (let i = 0; i < dice.length; i++)
        {
            dice[i].roll();
        }
    }

    // Calculate the socre for this round and add it to the player's total score
    calculateScore(dice)
    {
        for (let die of dice)
        {
            this.#roundScore += die.value;
        }
        return this.#roundScore;
    }
}