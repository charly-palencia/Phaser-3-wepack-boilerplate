import "phaser";
// import config from "./config";
import * as constants from "./constants";
import BootScene from "./scenes/boot-scene";
import HomScene from "./scenes/home-scene";

class AppGame extends Phaser.Game {
  constructor(config){
    super(config);
  }
}

new AppGame({
  // backgroundColor: "#71c5cf",
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
  scene: [HomScene, BootScene]
});
