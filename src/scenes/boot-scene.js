import Ball from "src/models/ball";

export default class BootScene extends Phaser.Scene {
  constructor(){
    super({key: "Boot"});
  }

  preload() {
    this.load.image("red-ball", "assets/imgs/ball.png");
    this.load.image("tiles", "assets/tileMap/block_spritesheet.png");
    this.load.image("phaser-logo", "assets/imgs/logo.png");

    this.load.tilemapTiledJSON("map", "assets/tileMap/blocks.json");

    this.load.audio("bounce", "assets/audio/bounce.wav");
    this.load.audio("gameOver", "assets/audio/gameOver.wav");
  }

  update(time, delta){
    this.redBall.update(time, delta);
    if(this.redBall.isDead){
      this.gameOverSound.play();
      this.redBall.reset();
    }
  }

  create() {
    this.groundLayer = this.addGround();
    this.redBall = new Ball(this, 200, 200);
    this.gameOverSound = this.sound.add("gameOver");

    this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height);
    this.cameras.main.startFollow(this.redBall, true);

    this.physics.add.collider(this.groundLayer, this.redBall);
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
}

