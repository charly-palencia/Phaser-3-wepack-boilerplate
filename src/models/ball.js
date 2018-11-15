import  {VELOCITY} from "src/constants";

export default class Ball extends Phaser.GameObjects.Sprite {
  constructor(scene, x,y){
    super(scene, x, y, "red-ball");
    scene.physics.world.enable(this);
    scene.add.existing(this);

    this.addEventhandlers();
    this.addPhysicConfig();

    this.acceleration = VELOCITY;
    this.isRunning = false;
    this.isJumping = false;
    this.isDead = false;
    this.bounceSound = scene.sound.add("bounce");
  }

  addPhysicConfig(){
    const {body} = this;
    body.setCollideWorldBounds(true);
    body.setBounce(0.1);
    body.maxVelocity.x = VELOCITY;
    body.maxVelocity.y = 500;
    body.drag.x = 150;
  }

  addEventhandlers(){
    this.scene.input.keyboard.on("keydown_RIGHT", () => {
      this.isRunning = true;
      this.direction = "right";
    });

    this.scene.input.keyboard.on("keydown_LEFT", () => {
      this.isRunning = true;
      this.direction = "left";
    });

    this.scene.input.keyboard.on("keyup_RIGHT", () => {
      this.isRunning = false;
    });

    this.scene.input.keyboard.on("keyup_LEFT", () => {
      this.isRunning = false;
    });

    this.scene.input.keyboard.on("keydown_UP", () => {
      if(!this.isJumping && this.body.blocked.down){
        this.bounceSound.play();
        this.body.setVelocityY(-this.acceleration);
        this.isJumping = true;
      }
    });
  }

  reset(){
    this.body.reset(100, 200);
    this.isDead = false;
  }

  update(){
    const rightKey = this.scene.input.keyboard.addKey("RIGHT");

    if(this.isRunning){
      const velocityX = rightKey.isDown ? this.acceleration : this.acceleration * -1;
      this.body.setVelocityX(velocityX);
    }

    if(this.body.blocked.down){
      this.isJumping = false;
    }

    if(this.y > 400){
      this.body.setCollideWorldBounds(false);
    }

    if(this.y > 600){
      this.isDead = true;
    }
  }
}
