var game = window.game;
var player = require('player');
var projectile = require("projectile")
var sound = require("sound")

var projectileFactory = {};

projectileFactory.preload = function(){


};

projectileFactory.create = function () {
    var defaultCollisionHandler = function(projectile, target){
        projectile.destroy();
        target.destroy();
    };
    this.defaultProjectile = new projectile(undefined, undefined, undefined, undefined, game.enemyCollisionGroup, defaultCollisionHandler);
}

projectileFactory.spawnProjectile = function(source, target, projectile) {
    /*
    Creates an projectile object that moves from source towards the target
    Target = "mouse" if the projectile needs to move towards the mouse pointer
     */
    if (projectile.cooldown === false){
        projectile.cooldown = true;

        /*Variables used in velocity calulations*/
        var sx, sy, tx, ty, angle, x_velocity, y_velocity;

        /* Calculate the Projectile velocity*/
        sx = source.entity.x;
        sy = source.entity.y;
        if(target == "mouse") {
            tx = game.input.worldX;
            ty = game.input.worldY;
        } else {
            tx = target.entity.x;
            ty = target.entity.y;
        }
        angle = Phaser.Point.angle(new Phaser.Point(sx, sy), new Phaser.Point(tx, ty));
        x_velocity = -Math.cos(angle)*projectile.velocity;
        y_velocity = -Math.sin(angle)*projectile.velocity;

        /*creations of the actual projectile*/
        var p = {};
        p.entity = game.add.sprite(sx, sy, projectile.texture);
        game.physics.p2.enable(p.entity);
        p.entity.body.angle = angle*180/Math.PI;
        p.damageValue = projectile.damageValue;
        p.entity.body.velocity.x = x_velocity;
        p.entity.body.velocity.y = y_velocity;
        p.entity.body.setCollisionGroup(game.projectileCollisionGroup);

        if(projectile.collideGroups != undefined && projectile.collisionHandler != undefined){
            p.entity.body.collides([projectile.collideGroups, game.projectileCollisionGroup], projectile.collisionHandler);
        }

        // Shoot sound
        sound.play_effect("shot");
        p.entity.body.debug = true;
        /* Set the cooldown*/
        setTimeout(function () {
            projectile.cooldown = false;
        }, projectile.cooldownTime);
        /* Returns the projectile in case you want to do something special with it */
        return p;
    }
};


module.exports = projectileFactory;