import 'phaser';
import PipeTop from "./pipe-top";
import PipeBottom from "./pipe-bottom";

const Pipe = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,
  initialize:

    function Pipe (scene)
  {
    const diff = Phaser.Math.RND.between(-63, 63);
    const pipeTopGroup = scene.add.group({
      classType: PipeTop,
      maxSize: 4,
      runChildUpdate: true,
    });
    const pipeBottomGroup = scene.add.group({
      classType: PipeBottom,
      maxSize: 4,
      runChildUpdate: true,
    });

    Phaser.GameObjects.Image.call(this, scene, 388, 0, '');
    const top =  pipeTopGroup.create(1);
    const bottom = pipeBottomGroup.create(1);

    top.y -= diff;
    bottom.y -= diff;
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
