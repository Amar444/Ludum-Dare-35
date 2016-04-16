var game = window.game;
var player = require('player');

var world = {}
var specs = {
    size: 30,
    chunk: 30
}
world.preload = function(){
    game.load.image('background','assets/tests/debug-grid-1920x1920.png');
}

world.create = function() {
    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);
    game.physics.startSystem(Phaser.Physics.P2JS);
    this.createMap();
}

world.createMap = function() {
    for (var y = 0; y < specs.chunk; y++) {
        for (var x = 0; x < specs.chunk; x++) {
            var bounds = new Phaser.Rectangle(y * specs.size, x * specs.size, specs.size, specs.size);
            var graphics = game.add.graphics(bounds.x, bounds.y);
            if (Math.random() > 0.2)
                graphics.beginFill(0xD9CC3C);
            else
                graphics.beginFill(0x00ADA7);
            graphics.drawRect(0, 0, bounds.width, bounds.height);
        }
    }
}

world.postCreate = function(){
    game.camera.follow(player.entity);
    game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);

}

module.exports = world;