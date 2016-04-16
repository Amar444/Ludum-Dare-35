var user_class = {};

player.create = function() {
    
    var sprite = game.add.graphics(0, 0);
    sprite.beginFill(0x222222);
    sprite.drawCircle(0, 0, 32);
    sprite.beginFill(0xC21210);
    sprite.drawCircle(0, 0, 25);
    player.entity = game.add.sprite(game.world.centerX, game.world.centerY, sprite.generateTexture());


    game.physics.p2.enable(player.entity);
    cursors = game.input.keyboard.createCursorKeys();
    keys = {
        w: game.input.keyboard.addKey(Phaser.Keyboard.W),
        a: game.input.keyboard.addKey(Phaser.Keyboard.A),
        s: game.input.keyboard.addKey(Phaser.Keyboard.S),
        d: game.input.keyboard.addKey(Phaser.Keyboard.D)
    };
}

player.render = function() {
    player.entity.removeChild(sprite);

    sprite = game.add.graphics(0, 0);
    iter += 0.4;
    if (iter > 10)
        iter = -10;

    sprite.beginFill(0x7BD930);
    sprite.drawCircle(0, 0, Math.abs(iter) + 5);
    player.entity.addChild(sprite);
}

player.update = function(player) {
    
}

module.exports = user_class;