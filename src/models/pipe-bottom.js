import 'phaser';

const Pipe = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,
  initialize:

    function Pipe (scene)
  {
    // const y = Phaser.Math.RND.between(350, 400);
    Phaser.GameObjects.Image.call(this, scene, 388, 416, 'pipe');
    this.speed = Phaser.Math.GetSpeed(336, 1.5);
    // this.setBounceX(Phaser.Math.FloatBetween(0.4, 0.9));
  },


  update: function (time, delta)
  {
    this.setPosition(this.x - (this.speed * delta), this.y );

    if (this.x < -50)
      {
        this.destroy();
      }
  },

});


export default Pipe;
