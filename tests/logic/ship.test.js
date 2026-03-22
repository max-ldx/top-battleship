import { assert, describe, it } from "vitest";
import { Ship } from "../../src/logic/ship";

describe("ship", () => {

    it("is not sunk if not hit", () => {
        const ship = new Ship(5);
        assert.isFalse(ship.isSunk());
    });

    it("is sunk if hit enough", () => {
        const shipLength = 5;
        const ship = new Ship(shipLength);
        for (let i = 0; i < shipLength; i++) {
            ship.hit();
        }
        assert.isTrue(ship.isSunk());
    });
});