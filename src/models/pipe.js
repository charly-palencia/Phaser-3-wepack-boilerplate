import "phaser";
import {SCREEN_WIDTH} from "../constants";

const INITIAL_STATE = 338;

export default class Pipe extends Phaser.GameObjects.Container{
  constructor(scene){
    super(scene, INITIAL_STATE, 0);
    this.speed = Phaser.Math.GetSpeed(SCREEN_WIDTH, 1.5); //screen widht, 1s
    const randPositionY = Phaser.Math.RND.between(-80, 80);
    this.y -= randPositionY;
    this.addChildren();
  }

  addChildren() {
    //explain this calc
    this.buildPipe(0, -47, 180, true);
    this.buildPipe(0, 372);
  }

  buildPipe(x, y, angle=0, flipX=false){
    const pipe = this.scene.physics.add.image(x, y, "pipe");
    pipe.setAngle(angle);
    pipe.flipX = flipX;
    pipe.body.allowGravity = false;
    pipe.body.immovable = true;
    this.scene.physics.add.collider(this.scene.bird, pipe, this.birdCrash, null, this);
    this.add(pipe);
    return pipe;
  }

  birdCrash(){
    this.scene.stopGame();
  }

  update(time, delta) {
    if(this.paused) return;
    const distance = this.speed * delta;
    this.x -= distance;

    if (this.x < -50) {
      this.destroy();
    }

    if (this.x < 202 && !this.passed) {
      this.passed = true;
      this.scene.addPoint();
    }
  }
}
