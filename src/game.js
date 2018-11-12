import "phaser";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "./constants";
import BootScene from "./scenes/boot-scene";

export class AppGame extends Phaser.Game {
  constructor(config){
    super(config);
  }
}

const config = {
  backgroundColor: "#7ec0ee",
  type: Phaser.AUTO,
  parent: "phaser-boilerplate",
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 300 }
    }
  },
  scene: [BootScene]
};

if(typeof FBInstant !== "undefined"){
  FBInstant.initializeAsync().then(function() {
    FBInstant.setLoadingProgress(100);
    FBInstant.startGameAsync().then(function() {
      new AppGame(config);
    });
  });
}

window.onload = function() {
  new AppGame(config);
};
