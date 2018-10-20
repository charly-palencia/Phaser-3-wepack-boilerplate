import 'phaser';

const Pipe = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,
  initialize:

    function Pipe (scene)
  {
    Phaser.GameObjects.Image.call(this, scene, 388, -4, 'pipe');
    this.speed = Phaser.Math.GetSpeed(336, 1.5); //336 width, 1 s
    // this.setBounceX(Phaser.Math.FloatBetween(0.4, 0.9));
    this.setAngle(180);
    this.flipX = true;
  },


  update: function (time, delta) //???delta
  {
    this.setPosition(this.x - (this.speed * delta), this.y);

    if (this.x < -50)
      {
        this.destroy();
      }
  },

});


export default Pipe;
