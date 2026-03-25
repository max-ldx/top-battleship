import { assert, describe, it } from "vitest";
import { Gameboard } from "../../src/logic/gameboard";

describe("gameboard places ship", () => {
	it("does not place a ship with too small length", () => {
		const gameboard = new Gameboard();
		assert.throws(() => gameboard.placeShip(0, 0, 0), RangeError);
	});

	it("does not place a ship with too big length", () => {
		const gameboard = new Gameboard();
		assert.throws(() => gameboard.placeShip(10, 0, 0), RangeError);
	});

	it("does not place a ship at too small x", () => {
		const gameboard = new Gameboard();
		assert.throws(() => gameboard.placeShip(5, -1, 0), RangeError);
	});

	it("does not place a ship at too big x", () => {
		const gameboard = new Gameboard();
		assert.throws(() => gameboard.placeShip(5, 10, 0), RangeError);
	});

	it("does not place a ship at too small y", () => {
		const gameboard = new Gameboard();
		assert.throws(() => gameboard.placeShip(5, 0, -1), RangeError);
	});

	it("does not place a ship at too big y", () => {
		const gameboard = new Gameboard();
		assert.throws(() => gameboard.placeShip(5, 0, 10), RangeError);
	});

	it("does not place a ship out of bounds", () => {
		const gameboard = new Gameboard();
		assert.throws(() => gameboard.placeShip(5, 0, 8), Error);
	});

	it("does not place a ship if a ship is already present", () => {
		const gameboard = new Gameboard();
		gameboard.placeShip(5, 0, 0);
		assert.throws(() => gameboard.placeShip(5, 0, 0), Error);
	});

	it("places a ship if everything is ok", () => {
		const gameboard = new Gameboard();
		assert.isTrue(gameboard.placeShip(5, 0, 0));
	});
});

describe("gameboard receives attack", () => {
	it("does not receive out of bounds attacks", () => {
		const gameboard = new Gameboard();
		assert.throws(() => gameboard.receiveAttack(-1, 0), RangeError);
	});

	it("misses when attacking water", () => {
		const gameboard = new Gameboard();
		gameboard.placeShip(5, 1, 1);
		assert.strictEqual(gameboard.receiveAttack(0, 0), "miss");
	});

	it("hits when attacking a ship cell", () => {
		const gameboard = new Gameboard();
		gameboard.placeShip(5, 0, 0);
		assert.strictEqual(gameboard.receiveAttack(0, 0), "hit");
	});

	it("cannot attack same water cell twice", () => {
		const gameboard = new Gameboard();
		gameboard.placeShip(5, 1, 1);
		gameboard.receiveAttack(0, 0);
		assert.throws(() => gameboard.receiveAttack(0, 0), Error);
	});

	it("cannot attack same ship cell twice", () => {
		const gameboard = new Gameboard();
		gameboard.placeShip(5, 0, 0);
		gameboard.receiveAttack(0, 0);
		assert.throws(() => gameboard.receiveAttack(0, 0), Error);
	});
});

describe("gameboard knows if all ships are sunk", () => {
	it("has zero of two ships sunk", () => {
		const gameboard = new Gameboard();
		gameboard.placeShip(5, 0, 0);
		gameboard.placeShip(5, 1, 1);
		assert.isFalse(gameboard.allShipsSunk());
	});

	it("has one of two ships sunk", () => {
		const gameboard = new Gameboard();
		gameboard.placeShip(5, 0, 0);
		gameboard.placeShip(5, 1, 1);
		gameboard.receiveAttack(0, 0);
		gameboard.receiveAttack(0, 1);
		gameboard.receiveAttack(0, 2);
		gameboard.receiveAttack(0, 3);
		gameboard.receiveAttack(0, 4);
		assert.isFalse(gameboard.allShipsSunk());
	});

	it("has two of two ships sunk", () => {
		const gameboard = new Gameboard();
		gameboard.placeShip(5, 0, 0);
		gameboard.placeShip(5, 1, 1);
		gameboard.receiveAttack(0, 0);
		gameboard.receiveAttack(0, 1);
		gameboard.receiveAttack(0, 2);
		gameboard.receiveAttack(0, 3);
		gameboard.receiveAttack(0, 4);
		gameboard.receiveAttack(1, 1);
		gameboard.receiveAttack(1, 2);
		gameboard.receiveAttack(1, 3);
		gameboard.receiveAttack(1, 4);
		gameboard.receiveAttack(1, 5);
		assert.isTrue(gameboard.allShipsSunk());
	});
});
