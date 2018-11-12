import {AppGame} from "src/game";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "src/constants";

let game;
describe("AppGame", () => {
  beforeAll(() => {
    game = new AppGame({
      type: Phaser.AUTO,
      parent: "test",
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      banner: {
        hidePhaser: true,
      },
    });
  });

  it("inheritances from Phaser.Game object", () => {
    expect(game).toBeInstanceOf(Phaser.Game);
  });

  it("returns valid resolution", ()=> {
    const {width, height} = game.config;
    expect(width).toBe(SCREEN_WIDTH, "valid width");
    expect(height).toBe(SCREEN_HEIGHT, "valid height");
  });
});
