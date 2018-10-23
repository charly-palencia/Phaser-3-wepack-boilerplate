import Pipe from "../models/pipe";
import * as constants from "../constants";
const {Utils: {Array: {NumberArrayStep}}} =  Phaser;

export default class BootScene extends Phaser.Scene {
  constructor(){
    super({key: "Boot"});
    this.gameOver = false;
    this.score = [];
    this.points = 10;
  }

  preload() {
    this.load.image("yellow-bird", "assets/yellowbird-upflap.png");
    this.load.image("base", "assets/base.png");
    this.load.image("pipe", "assets/pipe-green.png");
    this.load.image("game-over", "assets/gameover.png");
    this.load.image("background-night", "assets/background-night.png");
    NumberArrayStep(0,10).forEach(number => {
      this.load.image(number.toString(), `assets/${number}.png`);
    });
  }

  update(){
    //arctang
    if(!this.gameover){
      this.bird.rotation = Math.atan2((256 -this.bird.body.y), this.bird.body.x) * -1;
    }
  }

  create() {
    //include elements
    this.addBackground();
    this.addBird();
    const floor = this.addFloor();
    this.addPipeGenerator();

    //include events
    this.physics.add.overlap(this.bird, floor, this.stopGame, null, this);
    this.input.keyboard.on("keydown_ENTER", this.start.bind(this));
    this.updateScore();
  }

  addPoint(){
    this.points += 1;
    this.updateScore();
  }

  //no public methods

  addPipeGenerator(){
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
  }

  addBackground(){
    this.add.tileSprite(0, 0, constants.SCREEN_WIDTH * 2, constants.SCREEN_HEIGHT*2, "background-night");
  }

  addBird(){
    this.bird = this.physics.add.image(168, 256, "yellow-bird");
    this.bird.body.allowRotation = true;

    this.birdEvent = this.input.keyboard.on("keydown_SPACE", () => {
      if(this.gameOver) return;
      this.bird.body.velocity.y = -150;
    });
  }

  addFloor(){
    const floor= this.add.tileSprite(0, 480, 672, 112, "base");
    this.physics.add.existing(floor);
    floor.setDepth(10);
    floor.body.immovable = true;
    floor.body.allowGravity = false;
    return floor;
  }

  updateScore(){
    this.score.forEach(item => item.destroy());
    const score = this.points.toString();
    const  characters = score.split("");
    const positionX = constants.HALF_SCREEN_WIDTH - (12*characters.length)/2;
    this.score = characters.map((character, index) => {
      return this.add.image(positionX + (24 * index), 100, character).setDepth(20);
    });
  }

  start(){
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
  }

  stopGame(){
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
  }
}

