import "phaser";
// import config from "./config";
import * as constants from "./constants";
import BootScene from "./scenes/boot-scene";
import HomScene from "./scenes/home-scene";

export class AppGame extends Phaser.Game {
  constructor(config){
    super(config);
  }
}

FBInstant.initializeAsync().then(function() {
  FBInstant.setLoadingProgress(100);
  FBInstant.startGameAsync().then(function() {
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
  });
});

window.onload = function() {
  new AppGame({
    // backgroundColor: "#71c5cf",
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: constants.SCREEN_WIDTH,
    height: constants.SCREEN_HEIGHT,
    physics: {
      default: "arcade",
      arcade: {
        // debug: true,
        gravity: { y: 300 }
      }
    },
    scene: [HomScene, BootScene]
  });
};
