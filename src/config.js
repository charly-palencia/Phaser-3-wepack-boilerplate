import PipeTop from "./models/pipe-top";
import PipeBottom from "./models/pipe-bottom";
import Pipe from "./models/pipe";

export default {
  backgroundColor: "#71c5cf",
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 336,
  height: 512,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 300 }
    }
  },
  scene: {
    preload: preload,
    create: create,
  }
};

function preload ()
{
  this.load.image('yellow-bird', 'assets/yellowbird-upflap.png');
  this.load.image('base', 'assets/base.png');
  this.load.image('pipe', 'assets/pipe-green.png');
}

function create ()
{
  const bird = this.physics.add.image(168, 256, "yellow-bird");
  const base = this.add.tileSprite(0, 480, 672, 112, "base");
  base.setDepth(10);

  this.input.keyboard.on('keydown_SPACE', (pressed) => {
    bird.body.velocity.y = -250;
  });


  const pipe = this.add.group({
    classType: Pipe,
  });


  setInterval(function(){
    // pipeTopGroup.create(1);
    // pipeBottomGroup.create(1);
    pipe.create(1);
  }, 2000);
}
