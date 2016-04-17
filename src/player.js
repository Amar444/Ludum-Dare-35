var game = window.game;

var cursors;
var keys;

var sprite = 0;
var iter = 0;
var speed = 200;

var weapon;
var weaponsprite;

var player = {};
var projectile = require("projectileFactory")
var init_char = require("character")
var shapes = require("shapes");

player.preload = function(){
}

player.create = function() {
    player.character = init_char.getCurrentUser();

    var sprite = game.add.graphics(0, 0);
    sprite.beginFill(0x222222);
    sprite.drawCircle(0, 0, 32);
    sprite.beginFill(0x1463ab);
    sprite.drawCircle(0, 0, 25);
    player.entity = game.add.sprite(game.world.centerX, game.world.centerY, sprite.generateTexture());
    sprite.destroy();
    game.physics.p2.enable(player.entity);
    player.entity.body.parent = player;
    cursors = game.input.keyboard.createCursorKeys();
    keys = {
        w: game.input.keyboard.addKey(Phaser.Keyboard.W),
        a: game.input.keyboard.addKey(Phaser.Keyboard.A),
        s: game.input.keyboard.addKey(Phaser.Keyboard.S),
        d: game.input.keyboard.addKey(Phaser.Keyboard.D)
    };

    this.createWeapon();
}

player.render = function() {
    player.entity.removeChild(sprite);

    sprite = game.add.graphics(0, 0);

    iter += 0.4;
    if (iter > 10)
        iter = -10;

    sprite.beginFill(0xEDBE00);
    sprite.drawCircle(0, 0, Math.abs(iter) + 5);

    this.drawWeapon(sprite);
    var child = player.entity.addChild(sprite);
}

player.createWeapon = function() {
    if (player.character.type != "Melee")
        return;

    weaponsprite = game.add.graphics(0, 0);
    switch(player.character.type) {
        case "Range":

            break;
        case "Melee":
            weaponsprite.beginFill(0x1463ab);
            weaponsprite.drawRect(0, 0, 8, 40);
            break;
        case "Magic":
            break;
        default:
            break;
    }
    weapon = game.add.sprite(player.entity.x + 10, player.entity.y - 35, weaponsprite.generateTexture());
    weaponsprite.destroy();
    game.physics.p2.enable(weapon);
    weapon.body.setCollisionGroup(game.physics.p2.nothingCollisionGroup);

    weapon.xOff = 30;
    weapon.yOff = -35;
}

player.drawWeapon = function(sprite) {
    player.entity.body.angle = 0;
    var sx = player.entity.x;
    var sy = player.entity.y;
    var tx = game.input.worldX;
    var ty = game.input.worldY;
    var angle = Phaser.Point.angle(new Phaser.Point(sx, sy), new Phaser.Point(tx, ty));
    switch(player.character.type) {
        case "Range":
            var x = -Math.cos(angle);
            var y = -Math.sin(angle);
            sprite.lineStyle(5, 0xEDBE00, 1);
            sprite.moveTo(x*16, y*16);
            sprite.lineTo(x*25, y*25);            
            break;
        case "Melee":
            weapon.body.rotation = angle - (1/2) * Math.PI;
            weapon.body.debug = true;
            break;
        case "Magic":
            break;
        default:
            break;
    }
    
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
    if (cursors.right.iesDown || keys.d.isDown)
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

    if(game.input.mousePointer.isDown) {
        switch(player.character.type) {
            case "Range":
                projectile.spawnProjectile(player, "mouse", projectile.defaultProjectile);
                break;
            case "Melee":

                break;
            case "Magic":
                break;
            default:
                break;
        }
    }

    if (weapon !== undefined) {
        weapon.body.x = player.entity.x + Math.sin(weapon.body.rotation) * weapon.xOff;
        weapon.body.y = player.entity.y + Math.cos(weapon.body.rotation) * weapon.yOff;
    }
}

module.exports = player;