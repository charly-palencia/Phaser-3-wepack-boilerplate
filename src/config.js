import "phaser";
import Pipe from "./models/pipe";
import * as constants from "./constants";

export default {
  backgroundColor: "#71c5cf",
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: constants.SCREEN_WIDTH,
  height: constants.SCREEN_HEIGHT,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 300 }
    }
  },
  scene: {
    preload() {
      this.load.image("yellow-bird", "assets/yellowbird-upflap.png");
      this.load.image("base", "assets/base.png");
      this.load.image("pipe", "assets/pipe-green.png");
    },
    create()
    {
      // TODO move this to a diff place any thoughts?
      const bird = this.physics.add.image(168, 256, "yellow-bird");
      this.input.keyboard.on("keydown_SPACE", () => {
        bird.body.velocity.y = -250;
      });

      const base = this.add.tileSprite(0, 480, 672, 112, "base");
      base.setDepth(10);

      const pipe = this.add.group({
        classType: Pipe,
        maxSize: 3,
        runChildUpdate: true,
      });

      this.time.addEvent({
        delay: 2000,
        loop: true,
        callback: () => pipe.create(),
        callbackScope: this,
      });
    },
  }
};
