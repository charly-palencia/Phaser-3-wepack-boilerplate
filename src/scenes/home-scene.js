import * as constants from "../constants";

export default class HomScene extends Phaser.Scene {
  constructor(){
    super({key: "Home"});
  }

  preload() {
    this.load.image("base", "assets/base.png");
    this.load.image("message", "assets/message.png");
    this.load.image("background-night", "assets/background-night.png");
  }

  update(){
  }

  create() {
    this.addFloor();
    this.addMessage();
    this.addBackground();
    this.birdEvent = this.input.on("pointerdown", () => {
      this.game.scene.stop("Home");
      this.game.scene.start("Boot");
    });
  }

  addBackground(){
    this.add.tileSprite(0, 0, constants.SCREEN_WIDTH * 2, constants.SCREEN_HEIGHT*2, "background-night");
  }

  addMessage(){
    const message = this.add.image(constants.HALF_SCREEN_WIDTH, 256, "message");
    message.setDepth(10);
  }

  addFloor(){
    const floor= this.add.tileSprite(0, 480, 672, 112, "base");
    this.physics.add.existing(floor);
    floor.setDepth(10);
    floor.body.immovable = true;
    floor.body.allowGravity = false;
    return floor;
  }
}
