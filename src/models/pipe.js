import "phaser";
import {SCREEN_WIDTH} from "../constants";

const INITIAL_STATE = 338;

export default new Phaser.Class({
  Extends: Phaser.GameObjects.Image,
  paused: false,
  initialize: function Pipe (scene) {
    Phaser.GameObjects.Image.call(this, scene, INITIAL_STATE, 0, "");
    this.alpha=0; //hide parent
    this.speed = Phaser.Math.GetSpeed(SCREEN_WIDTH, 1.5); //screen widht, 1s
    this.addChildren(scene);
  },

  addChildren(scene) {
    const randPositionY = Phaser.Math.RND.between(-80, 80);
    this.pipeTop  = this.buildPipe(scene,INITIAL_STATE, (-42 - randPositionY), 180, true);
    this.pipeBottom = this.buildPipe(scene,INITIAL_STATE, (378 - randPositionY));
  },

  destroyChild(){
    this.pipeTop.destroy();
    this.pipeBottom.destroy();
  },

  buildPipe(scene, x, y, angle=0, flipX=false){
    const pipe = scene.physics.add.image(x, y, "pipe");
    pipe.setAngle(angle);
    pipe.flipX = flipX;
    pipe.body.allowGravity = false;
    pipe.body.immovable = true;
    scene.physics.add.collider(scene.bird, pipe, this.birdCrash, null, this);
    return pipe;
  },

  birdCrash(){
    this.scene.stopGame();
  },

  update(time, delta) {
    if(this.paused) return;
    const distance = this.speed * delta;
    this.pipeTop.x -= distance;
    this.pipeBottom.x -= distance;
    this.x -= distance;

    if (this.x < -50) {
      this.destroy();
    }
  },
});
