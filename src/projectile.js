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
        var rad_angle = Math.atan2(dy, dx);
        var x_distance = Math.cos(rad_angle*180/Math.PI);
        var y_distance = Math.sin(rad_angle*180/Math.PI);
        console.log("ANGLE: "+rad_angle*Math.PI/180+"  YDISTANCE"+y_distance+"  XDISTANCE "+x_distance);

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