var game = window.game;
var player = require('player');

var projectiles = {};
var projectile = {};
var PROJECTILE_COOLDOWN = 660;
var PROJECTILE_SPEED = 600;

projectiles.preload = function(){

    game.load.image('projectile','assets/square.png');
};

projectile.render = function(){
};

projectiles.update = function() {
    if (game.input.mousePointer.isDown && this.cooldown === false){ /*TODO add check for class when implemented*/
        this.cooldown = true;

        var px = player.entity.body.x;
        var py = player.entity.body.y;
        var mx = game.input.x;
        var my = game.input.y;
        var dx = mx - px;
        var dy = py - my;

        var angle = Phaser.Point.angle(new Phaser.Point(player.entity.body.x, player.entity.body.y), new Phaser.Point(game.input.worldX, game.input.worldY))

        var x_distance = -Math.cos(angle);
        var y_distance = -Math.sin(angle);
        console.log("angle: "+angle+"\n"+
                    "x_distance: "+x_distance+"\n"+
                    "y_distance: "+y_distance+"\n"+
                    "player_entity coords: "+player.entity.body.x+","+player.entity.body.y+"\n"+
                    "game input coords: "+game.input.worldX+","+game.input.worldY+"\n")
        this.getProjectile(1, x_distance * PROJECTILE_SPEED, y_distance * PROJECTILE_SPEED);
        setTimeout(function () {
          projectiles.cooldown = false;
        }, PROJECTILE_COOLDOWN);
    }
};

projectiles.create = function() {
    game.projectileCollisionGroup = game.physics.p2.createCollisionGroup();
    projectiles.cooldown = false;
    
};

projectiles.getProjectile = function(damageValue, velocityX, velocityY) {
    
    var projectile= {};
    projectile.entity = game.add.sprite(player.entity.body.x, player.entity.body.y, 'projectile');
    game.physics.p2.enable(projectile.entity);
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