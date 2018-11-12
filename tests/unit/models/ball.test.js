import "Phaser";
import scene from "test/fixtures/scene";
import Ball from "src/models/ball";

describe("Ball", () => {
  it("return a Sprint instance", () => {
    const ball = new Ball(scene,10,10);
    expect(ball).toBeInstanceOf(Phaser.GameObjects.Sprite);
  });
});
