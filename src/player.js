var game = window.game;

var player = {}

player.entity = {}

player.preload = function(){
   player.entity = new Phaser.Rectangle(0, 0, 10, 10);
}

player.render = function(){
    var zone = game.camera.deadzone;
    game.context.fillStyle = 'rgba(255,0,0,0.6)';
    game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player.entity, 32, 500);
}

player.update = function() {
    player.entity.body.setZeroVelocity();
    if (cursors.up.isDown) {
        player.entity.body.moveUp(300)
    }
    else if (cursors.down.isDown) {
        player.body.moveDown(300);
    }
    if (cursors.left.isDown){
        player.entity.body.velocity.x = -300;
    } else if (cursors.right.isDown) {
        player.entity.body.moveRight(300);
    }
}


player.create = function() {
    //player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    //console.log(game.physics);
    game.physics.p2.enable(player.entity);
    cursors = game.input.keyboard.createCursorKeys();
}

module.exports = player;