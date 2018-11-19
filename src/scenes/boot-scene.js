import Ball from "src/models/ball";
import  {SCREEN_WIDTH} from "src/constants";
import  {SCREEN_HEIGHT} from "src/constants";

export default class BootScene extends Phaser.Scene {
  constructor(){
    super({key: "Boot"});

    this.width = SCREEN_WIDTH;
    this.height = SCREEN_HEIGHT;
    this.isGameOver = false;
  }

  preload() {
    this.load.image("red-ball", "assets/imgs/ball.png");
    this.load.image("tiles", "assets/tileMap/block_spritesheet.png");
    this.load.image("phaser-logo", "assets/imgs/logo.png");
    this.load.image("gameOverImage", "assets/imgs/gameover.png");
    this.load.image("diamond", "assets/imgs/diamond.png");

    this.load.tilemapTiledJSON("map", "assets/tileMap/blocks.json");

    this.load.audio("bounce", "assets/audio/bounce.wav");
    this.load.audio("gameOverSound", "assets/audio/gameOver.wav");
  }

  create() {
    this.groundLayer = this.addGround();
    this.redBall = new Ball(this, 200, 200);
    this.diamonds = this.addAllDiamonds();
    this.showScore = this.addScore();
    this.gameOverSound = this.sound.add("gameOverSound");
    this.keyR = this.input.keyboard.addKey("R");

    this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height);
    this.cameras.main.startFollow(this.redBall, true);

    this.physics.add.collider(this.groundLayer, this.redBall);
  }

  update(time, delta){
    this.redBall.update(time, delta);

    if(this.redBall.isDead && !this.isGameOver){
      this.runGameOver();
    }

    if(this.redBall.isDead){
      this.resetTheGame();
    }
  }

  addGround(){
    const map = this.make.tilemap({key: "map"});
    const groundTiles = map.addTilesetImage("block_spritesheet", "tiles");
    const groundLayer = map.createDynamicLayer("ground", groundTiles, 0, 100);

    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = 512;
    groundLayer.setCollisionByProperty({ collides: true });
    return groundLayer;
  }

  addScore(){
    this.score = 0;
    this.scoreImage = this.add.image(270,25, "diamond");
    this.scoreImage.setScrollFactor(0);
    this.scoreText = this.add.text(290, 20, "x " + this.score);
    this.scoreText.setScrollFactor(0);
  }

  addAllDiamonds(){
    const map = this.make.tilemap({key: "map"});
    this.groupDiamond = map.createFromObjects("groupDiamond", "diamond", { key: "diamond" }, this);
    this.groupDiamond.forEach((diamondSprite) => {
      this.physics.world.enable(diamondSprite);
      diamondSprite.body.immovable =true;
      diamondSprite.body.allowGravity = false;
      this.physics.add.overlap(this.redBall, diamondSprite, this.collectDiamond, null, this);
    });
  }

  collectDiamond(redBall, diamond){
    this.score ++;
    this.scoreText.setText("x " + this.score);
    diamond.destroy();
  }

  runGameOver(){
    this.physics.world.pause();
    this.gameOverText = this.add.image(this.redBall.x, this.height/2,"gameOverImage");
    this.resetText = this.add.text(this.redBall.x - 120, this.height - 200,
      "Presiona R para Reiniciar");
    this.gameOverSound.play();
    this.isGameOver = true;
  }

  resetTheGame(){
    if(Phaser.Input.Keyboard.JustDown(this.keyR)){
      this.isGameOver = false;
      this.redBall.reset();
      this.physics.world.resume();
      this.deleteMessage();
      this.resetScore();
      this.destroyDiamonds();
      this.addAllDiamonds();
    }
  }

  deleteMessage(){
    this.gameOverText.destroy();
    this.resetText.destroy();
  }

  resetScore(){
    this.score = 0;
    this.scoreText.setText("x " + this.score);
  }

  destroyDiamonds(){
    this.groupDiamond.forEach(diamond => diamond.destroy());
  }
}
