import "phaser";
import Pipe from "./models/pipe";
import * as constants from "./constants";

export default {
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
  scene: {
    preload() {
      this.load.image("yellow-bird", "assets/yellowbird-upflap.png");
      this.load.image("base", "assets/base.png");
      this.load.image("pipe", "assets/pipe-green.png");
      this.load.image("game-over", "assets/gameover.png");
      this.load.image("background-night", "assets/background-night.png");

      this.load.image("0", "assets/0.png");
      this.load.image("1", "assets/1.png");
      this.load.image("2", "assets/2.png");
      this.load.image("3", "assets/3.png");
      this.load.image("4", "assets/4.png");
      this.load.image("5", "assets/5.png");
      this.load.image("6", "assets/6.png");
      this.load.image("7", "assets/7.png");
      this.load.image("8", "assets/8.png");
      this.load.image("9", "assets/9.png");
    },
    update(){
      //arctang
      if(!this.gameover){
        this.bird.rotation = Math.atan2((256 -this.bird.body.y), this.bird.body.x) * -1;
      }
    },
    create() {
      this.add.tileSprite(0, 0, constants.SCREEN_WIDTH * 2, constants.SCREEN_HEIGHT*2, "background-night");
      // TODO move this to a diff place any thoughts?
      this.bird = this.physics.add.image(168, 256, "yellow-bird");
      this.bird.body.allowRotation = true;

      this.input.keyboard.on("keydown_ENTER", start.bind(this));

      this.birdEvent = this.input.keyboard.on("keydown_SPACE", () => {
        if(this.gameOver) return;
        this.bird.body.velocity.y = -150;
      });

      const base = this.add.tileSprite(0, 480, 672, 112, "base");
      this.physics.add.existing(base);
      base.setDepth(10);
      base.body.immovable = true;
      base.body.allowGravity = false;

      this.physics.add.overlap(this.bird, base, stopGame, null, this);

      this.pipe = this.add.group({
        classType: Pipe,
        maxSize: 3,
        runChildUpdate: true,
      });

      this.pipeGenerator = this.time.addEvent({
        delay: 2000,
        loop: true,
        callback: () => this.pipe.create(),
        callbackScope: this,
      });

      this.stopGame = stopGame.bind(this);
      this.addPoint = addPoint.bind(this);
      this.gameOver = false;
      this.score = [];
      this.points = 0;
      this.updateScore = updateScore.bind(this);
      this.updateScore();
    },
  }
};

const updateScore = function(){
  this.score.forEach(item => item.destroy());
  const score = this.points.toString();
  const  characters = score.split("");
  const positionX = 158 - ((12*characters.length)/2);
  this.score = characters.map((character, index) => {
    return this.add.image(positionX + (24 * index), 100, character);
  });
};

const start = function(){
  if(!this.gameOver) return;
  this.gameOverImage.destroy();
  this.birdEvent.enabled = true;
  this.pipeGenerator.paused = false;
  this.bird.body.reset(186, 256);
  this.gameOver = false;
  this.children.list.forEach((child) => {
    if(child instanceof Pipe){
      child.destroyChild();
      child.destroy(true, true);
    }
  });
};


const stopGame = function(){
  if(this.gameOver) return;
  this.gameOver = true;
  this.gameOverImage = this.add.image(168, 256, "game-over");
  this.pipeGenerator.paused = true;
  this.bird.body.velocity.x = -30;
  this.children.list.forEach((child) => {
    if(child instanceof Pipe){
      child.paused = true;
    }
  });
};

const addPoint = function(){
  this.points += 1;
  this.updateScore();
};
