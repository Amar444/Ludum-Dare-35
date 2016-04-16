var game = window.game;

var cursors;

var player = {}

player.preload = function(){
     game.load.image('player','assets/square.png');
}

player.create = function() {
    player.entity = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    player.entity.z = 100;
    game.physics.p2.enable(player.entity);
    cursors = game.input.keyboard.createCursorKeys();
}

player.render = function(){
    game.debug.spriteCoords(player.entity, 32, 500);
    console.log(player.entity);
}

player.update = function() {
    player.entity.body.setZeroVelocity();

    if (cursors.up.isDown) {
        player.entity.body.moveUp(300)
    } else if (cursors.down.isDown) {
        player.entity.body.moveDown(300);
    }
    if (cursors.left.isDown){
        player.entity.body.moveLeft(300);
    } else if (cursors.right.isDown) {
        player.entity.body.moveRight(300);
    }
}



module.exports = player;