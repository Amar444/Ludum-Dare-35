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

projectile.update = function() {

};


projectiles.create = function(damageValue, velocityX, velocityY) {
    game.projectileCollisionGroup = game.physics.p2.createCollisionGroup();
    var projectile= {};
    projectile.entity = game.add.sprite(game.world.centerX, game.world.centerY, 'projectile');
    game.physics.p2.enable(projectile.entity);
    projectile.damageValue = damageValue;
    projectile.entity.velocity.x = velocityX;
    projectile.entity.velocity.y = velocityY;
    projectile.setCollisionGroup(game.projectileCollisionGroup);
    projectile.collides([game.enemyCollisionGroup], projectiles.collisionHandler, this);
    return projectile;
};

projectiles.collisionHandler = function (projectile, enemy) {
    enemy.removeHealth(projectile.damageValue);
    projectile.kill();
};

module.exports = projectiles;