var game = window.game;
var player = require('player');

var projectiles = {};
var projectile = {};

projectiles.preload = function(){

    game.load.image('projectile','assets/square.png');
};

projectile.render = function(){
   /* var zone = game.camera.deadzone;
    game.context.fillStyle = 'rgba(255,0,0,0.6)';
    game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(projectile.entity, 32, 500);*/
};

projectiles.update = function() {
    if (game.input.mousePointer.isDown && this.cooldown === false){
        this.cooldown = true;
        this.getProjectile(1, 100, 100);
        setTimeout(function () {
          projectiles.cooldown = false;
        }, 330);
    }
};

projectiles.create = function() {
    game.projectileCollisionGroup = game.physics.p2.createCollisionGroup();
    projectiles.cooldown = false;
    
};

projectiles.getProjectile = function(damageValue, velocityX, velocityY) {
    
    var projectile= {};
    projectile.entity = game.add.sprite(player.centerX, player.centerY, 'projectile');
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