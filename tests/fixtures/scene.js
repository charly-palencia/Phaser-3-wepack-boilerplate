const events = {
  on(){
  },
  once(){
  },
  emit(){
  }
};

const world = {
  defaults: {
    debugShowBody: false,
  }
};

const textures = {
  get(){
    return {
      get(){
        return {};
      }
    };
  },
};

const sceneManager  = new Phaser.Scenes.SceneManager({
  config: {
    defaultPhysicsSystem: {
    }
  },
  plugins: {
    addToScene(sys){
      sys.events = events;
    },
    getDefaultScenePlugins(){
    }
  },
  events
}, {});

let sceneInstance = sceneManager.createSceneFromObject("scene", {
  create(){
  }
});

sceneInstance = Object.assign(sceneInstance, {
  add: {
    existing(element){
      element.body = element.scene.body;
    }
  },
  sound: {
    add(){
    }
  },
  input:{
    keyboard: {
      on(){}
    }
  }
});


sceneInstance.physics = new Phaser.Physics.Arcade.ArcadePhysics(sceneInstance);
sceneInstance.physics.world = {
  enable(){}
};
const displayList = new Phaser.GameObjects.DisplayList(sceneInstance);
sceneInstance.sys = Object.assign(sceneInstance.sys, {
  events,
  displayList,
  textures,
  anims: events,
});
sceneInstance.body = new Phaser.Physics.Arcade.Body(world, {});
sceneInstance.body.setCollideWorldBounds = () => {};


export default sceneInstance;
