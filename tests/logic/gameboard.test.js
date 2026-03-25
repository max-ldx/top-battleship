import { assert, describe, it } from "vitest";
import { Gameboard } from "../../src/logic/gameboard";

describe("gameboard places ship", () => {
	it("does not place a ship with too small length", () => {
		const gameboard = new Gameboard();
		assert.throw(() => gameboard.placeShip(0, 0, 0), RangeError);
	});

	it("does not place a ship with too big length", () => {
		const gameboard = new Gameboard();
		assert.throw(() => gameboard.placeShip(10, 0, 0), RangeError);
	});

	it("does not place a ship at too small x", () => {
		const gameboard = new Gameboard();
		assert.throw(() => gameboard.placeShip(5, -1, 0), RangeError);
	});

	it("does not place a ship at too big x", () => {
		const gameboard = new Gameboard();
		assert.throw(() => gameboard.placeShip(5, 10, 0), RangeError);
	});

	it("does not place a ship at too small y", () => {
		const gameboard = new Gameboard();
		assert.throw(() => gameboard.placeShip(5, 0, -1), RangeError);
	});

	it("does not place a ship at too big y", () => {
		const gameboard = new Gameboard();
		assert.throw(() => gameboard.placeShip(5, 0, 10), RangeError);
	});

	it("does not place a ship out of bounds", () => {
		const gameboard = new Gameboard();
		assert.throw(() => gameboard.placeShip(5, 0, 8), Error);
	});

	it("does not place a ship if a ship is already present", () => {
		const gameboard = new Gameboard();
		gameboard.placeShip(5, 0, 0);
		assert.throw(() => gameboard.placeShip(5, 0, 0), Error);
	});

	it("places a ship if everything is ok", () => {
		const gameboard = new Gameboard();
		assert.isTrue(gameboard.placeShip(5, 0, 0));
	});
});
