var game = window.game;

var cursors;
var keys;

var sprite = 0;
var iter = 0;
var speed = 200;

var player = {};
var projectile = require("projectileFactory")
var init_char = require("character")

player.preload = function(){
}

player.create = function() {
    player.character = init_char.new_user();
    var sprite = game.add.graphics(0, 0);
    sprite.beginFill(0x222222);
    sprite.drawCircle(0, 0, 32);
    sprite.beginFill(0x1463ab);
    sprite.drawCircle(0, 0, 25);
    player.entity = game.add.sprite(game.world.centerX, game.world.centerY, sprite.generateTexture());
    sprite.destroy();
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

    sprite.beginFill(0xD9C021);
    sprite.drawCircle(0, 0, Math.abs(iter) + 5);
    player.entity.addChild(sprite);game.debug.spriteInfo(player.entity, 32, 32);
}

player.update = function() {
    var nspeed = speed;
    player.entity.body.setZeroVelocity();

    var vert = false;
    var hori = false;
    if (cursors.up.isDown || keys.w.isDown)
        vert = !vert;
    if (cursors.down.isDown || keys.s.isDown)
        vert = !vert;
    if (cursors.left.isDown || keys.a.isDown)
        hori = !hori;
    if (cursors.right.isDown || keys.d.isDown)
        hori = !hori;

    if (vert & hori)
        nspeed = speed/Math.sqrt(2);
        if (cursors.up.isDown || keys.w.isDown) {
        vert = !vert;
    }

    if (cursors.up.isDown || keys.w.isDown)
        player.entity.body.moveUp(nspeed);
    if (cursors.down.isDown || keys.s.isDown)
        player.entity.body.moveDown(nspeed);
    if (cursors.left.isDown || keys.a.isDown)
        player.entity.body.moveLeft(nspeed);
    if (cursors.right.isDown || keys.d.isDown)
        player.entity.body.moveRight(nspeed);

    if(game.input.mousePointer.isDown){
        projectile.spawnProjectile(player, "mouse", projectile.defaultProjectile);
    }
}

module.exports = player;