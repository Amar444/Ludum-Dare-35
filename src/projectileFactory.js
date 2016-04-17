var game = window.game;
var player = require('player');
var projectile = require("projectile")
var particles = require("particles")
var sound = require("sound")

var projectileFactory = {};

projectileFactory.preload = function(){


};

projectileFactory.create = function () {
    var defaultCollisionHandler = function(projectile, enemy){
        console.log("do stuff here");
    };
    this.defaultProjectile = new projectile(undefined, undefined, undefined, undefined, undefined, defaultCollisionHandler);
}

projectileFactory.update = function () {

}

projectileFactory.spawnProjectile = function(source, target, projectile) {
    /*
    Creates an projectile object that moves from source towards the target
    Target = "mouse" if the projectile needs to move towards the mouse pointer
     */
    if (projectile.cooldown === false){
        projectile.cooldown = true;
        particles.explosion(source.entity.x,source.entity.y)

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
        p.entity = game.add.sprite(sx + (-Math.cos(angle)*10), sy + (-Math.sin(angle)*10), projectile.texture);
        game.physics.p2.enable(p.entity);
        p.entity.body.angle = angle*180/Math.PI;
        p.entity.body.velocity.x = x_velocity;
        p.entity.body.velocity.y = y_velocity;
        p.entity.body.setCollisionGroup(game.projectileCollisionGroup);
        p.entity.body.collides([game.projectileCollisionGroup]);
        p.entity.body.collides([game.playerCollisionGroup, game.mobCollisionGroup], projectile.collisionHandler);
        p.entity.body.daddy = p;
        p.entity.name == "projectile";

        // Shoot sound
        sound.play_effect("shot");
        /* Set the cooldown*/
        setTimeout(function () {
            projectile.cooldown = false;
        }, projectile.cooldownTime);
        /* Returns the projectile in case you want to do something special with it */
        setTimeout(function(){
            p.entity.destroy();
        }, projectile.lifetime)
        return p;
    }
};


module.exports = projectileFactory;