var game = window.game;
var player = require('player');

var projectiles = {};
var projectile = {};
var PROJECTILE_COOLDOWN = 660;
var PROJECTILE_SPEED = 600;
var PROJECTILE_DAMAGE = 0;

projectiles.preload = function(){

    game.load.image('projectile','assets/square.png');
};

projectile.render = function(){
};

projectiles.update = function(source, target) {
    if(!source.hasOwnProperty("cooldown")){source.cooldown = false;}
    if (game.input.mousePointer.isDown && source.cooldown === false){ /*TODO add check for class when implemented*/
        source.cooldown = true;

        var sx, sy, tx, ty;

        sx = source.entity.x;
        sy = source.entity.y;

        if(target == "mouse") {
            tx = game.input.worldX;
            ty = game.input.worldY;
        } else {
            tx = target.entity.x;
            ty = target.entity.y;
        }


        var angle = Phaser.Point.angle(new Phaser.Point(sx, sy), new Phaser.Point(tx, ty));

        var x_distance = -Math.cos(angle);
        var y_distance = -Math.sin(angle);

        /*DEBUG MESSAGE
        console.log("angle: "+angle+"\n"+
                    "x_distance: "+x_distance+"\n"+
                    "y_distance: "+y_distance+"\n"+
                    "player_entity coords: "+player.entity.body.x+","+player.entity.body.y+"\n"+
                    "game input coords: "+game.input.worldX+","+game.input.worldY+"\n")*/

        this.getProjectile(source.projectileDamage || PROJECTILE_DAMAGE, x_distance * (source.projectileSpeed || PROJECTILE_SPEED), y_distance * (source.projectileSpeed || PROJECTILE_SPEED), angle);
        setTimeout(function () {
          source.cooldown = false;
        }, source.cooldownTime || PROJECTILE_COOLDOWN);
    }
};

projectiles.create = function() {
    game.projectileCollisionGroup = game.physics.p2.createCollisionGroup();
    projectiles.cooldown = false;
    
};

projectiles.getProjectile = function(damageValue, velocityX, velocityY, rotation) {
    
    var projectile= {};

    var sprite = game.add.graphics(0, 0);
    sprite.beginFill(0xFF002F);
    sprite.drawRect(0,0,20,5);

    projectile.entity = game.add.sprite(player.entity.x, player.entity.y, sprite.generateTexture());

    game.physics.p2.enable(projectile.entity);
    projectile.entity.body.angle = rotation*180/Math.PI;
    projectile.damageValue = damageValue;
    projectile.entity.body.velocity.x = velocityX;
    projectile.entity.body.velocity.y = velocityY;
    projectile.entity.body.setCollisionGroup(game.projectileCollisionGroup);
    /*projectile.entity.body.collides([game.enemyCollisionGroup], projectiles.collisionHandler, this);*/
    return projectile;
};

projectiles.collisionHandler = function (projectile, enemy) {
    enemy.removeHealth(projectile.damageValue);
    projectile.kill();
};

module.exports = projectiles;