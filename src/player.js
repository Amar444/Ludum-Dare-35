var game = window.game;

var cursors;
var keys;

var sprite = 0;
var iter = 0;
var speed = 200;

var player = {};
var projectile = require("projectileFactory")
var init_char = require("character")
var particles = require("particles")
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
    player.entity.name = "player";
    sprite.destroy();
    game.physics.p2.enable(player.entity);
    cursors = game.input.keyboard.createCursorKeys();
    keys = {
        w: game.input.keyboard.addKey(Phaser.Keyboard.W),
        a: game.input.keyboard.addKey(Phaser.Keyboard.A),
        s: game.input.keyboard.addKey(Phaser.Keyboard.S),
        d: game.input.keyboard.addKey(Phaser.Keyboard.D)
    };
    console.log("HI")
    
    player.entity.body.setCollisionGroup(game.playerCollisionGroup)
    player.entity.body.collides([game.mobCollisionGroup,
        game.projectileCollisionGroup,
        game.playerCollisionGroup,]
    );
    game.input.keyboard.addKey(Phaser.Keyboard.C).onDown.add(function () {
        player.mutate();
    }, this);
    setInterval(function (){
       var c = player.character.current_health;
       var m = player.character.getStats().maxHealth;
        if(c < m){
            player.character.current_health++
        }
    },5000)

}

player.mutate = function (){
    player.character.changeType()
    particles.explosion(player.entity.x,player.entity.y);
}

player.render = function() {
    player.entity.removeChild(sprite);

    sprite = game.add.graphics(0, 0);

    iter += 0.4;
    if (iter > 10)
        iter = -10;
    this.drawWeapon(sprite);


    sprite.beginFill(0xEDBE00);
    sprite.drawCircle(0, 0, Math.abs(iter) + 5);
    var child = player.entity.addChild(sprite);
}


player.drawWeapon = function(sprite) {
    player.entity.body.angle = 0;
    var sx = player.entity.x;
    var sy = player.entity.y;
    var tx = game.input.worldX;
    var ty = game.input.worldY;
    var angle = Phaser.Point.angle(new Phaser.Point(sx, sy), new Phaser.Point(tx, ty));

    function lt(diff, length){
        var x = -Math.cos(angle + diff);
        var y = -Math.sin(angle + diff);
        sprite.lineTo(x*length, y*length);
    }
    switch(player.character.type) {
        case "Range":
            var x = -Math.cos(angle);
            var y = -Math.sin(angle);
            sprite.lineStyle(5, 0xEDBE00, 1);
            sprite.moveTo(x*16, y*16);
            sprite.lineTo(x*25, y*25);            
            break;
        case "Melee":

            // sprite.fill(2, 0xEDBE00, 1);
            sprite.lineStyle(2, 0xEDBE00, 1);
            sprite.moveTo(0, 0);
            lt(Math.PI,10)
            lt(Math.PI/16,30)
            lt(0,35)
            lt(-Math.PI/16,30)
            lt(-Math.PI,10)
            break;
        case "Magic":
            var xa = -Math.cos(angle + Math.PI/4);
            var ya = -Math.sin(angle + Math.PI/4);
            var xb = -Math.cos(angle - Math.PI/4);
            var yb = -Math.sin(angle - Math.PI/4);
            // sprite.fill(2, 0xEDBE00, 1);
            sprite.lineStyle(2, 0xEDBE00, 1);
            sprite.moveTo(xa*25, ya*25);
            sprite.lineTo(xa, ya);
            sprite.lineTo(xb*25, yb*25);
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

    if(game.input.mousePointer.isDown) {
        switch(player.character.type) {
            case "Range":
                projectile.spawnProjectile(player, "mouse", projectile.defaultProjectile);
                break;
            case "Melee":
                var sx = player.entity.x;
                var sy = player.entity.y;
                var tx = game.input.worldX;
                var ty = game.input.worldY;
                var angle = Phaser.Point.angle(new Phaser.Point(sx, sy), new Phaser.Point(tx, ty));

                var m_x = player.entity.x;
                var m_y = player.entity.y;
                var m_direction = angle;
                var m_spread = Math.PI;
                var m_range = 50;
                var m_mobs = require("mobFactory").findMobInCone(m_x,m_y,m_direction,m_spread,m_range);
                for(var m in m_mobs){
                    var sx2 = player.entity.x;
                    var sy2 = player.entity.y;
                    var tx2 = m_mobs[m].entity.x;
                    var ty2 = m_mobs[m].entity.y;
                    var angle2 = Phaser.Point.angle(new Phaser.Point(sx2, sy2), new Phaser.Point(tx2, ty2));

                    var x_velocity = -Math.cos(angle2)*20;
                    var y_velocity = -Math.sin(angle2)*20;
                    m_mobs[m].move(x_velocity,y_velocity);
                    m_mobs[m].current_health--;
                }
                // debugger
                console.log(m_mobs.length)
                break;
            case "Magic":
                projectile.spawnProjectile(player, "mouse", projectile.magicMissile);
                break;
            default:
                break;
        }
    }


}

module.exports = player;