import "phaser";
import {SCREEN_WIDTH} from "../constants";

const INITIAL_STATE = 338;

export default new Phaser.Class({
  Extends: Phaser.GameObjects.Image,
  initialize: function Pipe (scene) {
    Phaser.GameObjects.Image.call(this, scene, INITIAL_STATE, 0, "");
    this.alpha=0; //hide parent
    this.speed = Phaser.Math.GetSpeed(SCREEN_WIDTH, 1.5); //screen widht, 1s
    this.addChildren(scene);
  },

  addChildren(scene) {
    const randPositionY = Phaser.Math.RND.between(-80, 80);
    const top = scene.add.image(INITIAL_STATE, -42, "pipe");
    const bottom = scene.add.image(INITIAL_STATE, 378, "pipe");
    top.setAngle(180);
    top.flipX = true;
    // Add random number
    top.y -= randPositionY;
    bottom.y -= randPositionY;
    //assign it to the parent image
    this.pipeTop = top;
    this.pipeBottom = bottom;
  },

  update(time, delta) {
    const distance = this.speed * delta;
    this.pipeTop.x -= distance;
    this.pipeBottom.x -= distance;
    this.x -= distance;

    if (this.x < -50) {
      this.destroy();
    }
  },
});
