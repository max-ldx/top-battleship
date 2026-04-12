import { Directions } from "./directions";

export class Player {
    #gameboard;

    constructor(gameboard) {
        this.#gameboard = gameboard;
    }

    placeShip(length, x, y, direction = Directions.horizontal) {
        this.#gameboard.placeShip(length, x, y, direction);
    }

    receiveAttack(x, y) {
        this.#gameboard.receiveAttack(x, y);
    }

    allShipsSunk() {
        return this.#gameboard.allShipsSunk();
    }
}