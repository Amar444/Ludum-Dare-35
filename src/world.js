var game = window.game;
var player = require('player');

var world = {}

world.preload = function(){
    game.load.image('background','assets/tests/debug-grid-1920x1920.png');
}
world.preCreate = function(){
    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);
    game.physics.startSystem(Phaser.Physics.P2JS);
}

world.postCreate = function(){
    game.camera.follow(player.entity);
    game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);
}

module.exports = world;