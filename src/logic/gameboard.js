import { Directions } from "./directions";
import { Ship } from "./ship";

export class Gameboard {
	#SIZE = 10;
	#ships = [];
	#grid;

	constructor() {
		this.#grid = Array.from({ length: this.#SIZE }, () =>
			Array(this.#SIZE).fill(null),
		);
	}

	placeShip(length, x, y, direction = Directions.horizontal) {
		if (length < 1 || length >= this.#SIZE) {
			throw new RangeError("Wrong ship length.");
		}

		if (x < 0 || x >= this.#SIZE || y < 0 || y >= this.#SIZE) {
			throw new RangeError("Coordinates out of bounds.");
		}

		const isHorizontal = direction === Directions.horizontal;
		const endPoint = isHorizontal ? y + length : x + length;
		if (endPoint > this.#SIZE) {
			throw new Error("Ship out of bounds.");
		}

		for (let i = 0; i < length; i++) {
			const currentX = isHorizontal ? x : x + i;
			const currentY = isHorizontal ? y + i : y;

			if (this.#grid[currentX][currentY] !== null) {
				throw new Error("Ship already present.");
			}
		}

		const ship = new Ship(length);

		for (let i = 0; i < length; i++) {
			const currentX = isHorizontal ? x : x + i;
			const currentY = isHorizontal ? y + i : y;
			this.#grid[currentX][currentY] = { ship: ship, hit: false };
		}

		this.#ships.push(ship);
		return true;
	}

	receiveAttack(x, y) {
		if (x < 0 || x >= this.#SIZE || y < 0 || y >= this.#SIZE) {
			throw new RangeError("Coordinates out of bounds.");
		}

		const cell = this.#grid[x][y];

		if (cell === null) {
			this.#grid[x][y] = "miss";
			return "miss";
		}

		if (cell === "miss" || cell.hit === true) {
			throw new Error("Already attacked");
		}

		cell.hit = true;
		cell.ship.hit();
		return "hit";
	}
}
