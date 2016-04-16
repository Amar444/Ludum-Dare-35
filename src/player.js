var game = window.game;

var cursors;

var sprite = 0;
var iter = 0;

var player = {};

player.preload = function(){
     game.load.image('player','assets/square.png');
}

player.create = function() {
    
    var sprite = game.add.graphics(0, 0);
    sprite.beginFill(0x222222);
    sprite.drawCircle(0, 0, 32);
    sprite.beginFill(0x1463ab);
    sprite.drawCircle(0, 0, 25);
    player.entity = game.add.sprite(game.world.centerX, game.world.centerY, sprite.generateTexture());


    game.physics.p2.enable(player.entity);
    cursors = game.input.keyboard.createCursorKeys();
}

player.render = function() {
    game.debug.spriteCoords(player.entity, 32, 500);
    player.entity.removeChild(sprite);

    sprite = game.add.graphics(0, 0);
    iter += 0.4;
    if (iter > 10)
        iter = -10;

    sprite.beginFill(0xD9C021);
    sprite.drawCircle(0, 0, Math.abs(iter) + 5);
    player.entity.addChild(sprite);
}

player.update = function() {
    player.entity.body.setZeroVelocity();
    if (cursors.up.isDown) {
        player.entity.body.moveUp(300);
    }
    if (cursors.down.isDown) {
        player.entity.body.moveDown(300);
    }
    if (cursors.left.isDown){
        player.entity.body.moveLeft(300);
    }
    if (cursors.right.isDown) {
        player.entity.body.moveRight(300);
    }
}

module.exports = player;