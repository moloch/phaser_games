window.onload = function() {

  var game = new Phaser.Game(800, 600, Phaser.AUTO, '',
   { preload: preload, create: create, update: update });

  function preload () {

    game.load.image('sky', 'images/sky.png');
    game.load.image('platform', 'images/platform.png');
    game.load.image('star', 'images/star.png');
    game.load.spritesheet('dude', 'images/dude.png', 32, 48);


  }

  function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');

    createPlatforms();

    player = game.add.sprite(32, game.world.height - 110, 'dude', 4);
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 400;

    cursors = game.input.keyboard.createCursorKeys();

  }

  function update () {

    player.body.velocity.x = 0;
    game.physics.arcade.collide(player, platforms);

    if (cursors.left.isDown){
      player.body.velocity.x = -150;
      if(player.body.touching.down){
        player.animations.play('left');
      }
    }
    else if (cursors.right.isDown){
      player.body.velocity.x = 150;
      if(player.body.touching.down){
        player.animations.play('right');
      }
    }
    else{
      player.animations.stop();
      player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down){
        player.body.velocity.y = -350;
        player.animations.stop()
    }
    
  }

  function createPlatforms(){
    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, 'platform');

    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var ledge = platforms.create(400, 400, 'platform');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'platform');
    ledge.body.immovable = true;
  }

};