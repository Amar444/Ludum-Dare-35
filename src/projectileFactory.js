var game = window.game;
var player = require('player');
var projectile = require("projectile")
var sound = require("sound")
var particles = require("particles")

var projectileFactory = {};

projectileFactory.preload = function(){
    game.load.image('diamond', 'images/diamond.png');

};

projectileFactory.create = function () {
    var defaultCollisionHandler = function(projectile, enemy){
        enemy.daddy.current_health-= projectile.daddy.damage;
        projectile.daddy.entity.destroy();
    };

    var magicCollisionHandler = function(projectile, enemy) {
        var entity = projectile.daddy.entity;
        var m_mobs = require("mobFactory").findMobInCone(entity.x,entity.y,0,Math.PI,100);
        for(var m in m_mobs){
            m_mobs[m].current_health -= projectile.daddy.damage;
        }
        particles.magic(entity.x, entity.y);
        entity.destroy();
    }

    this.defaultProjectile = new projectile(undefined, 1, undefined, undefined, undefined, defaultCollisionHandler, game.mobCollisionGroup);


    var defaultSprite = game.add.graphics();
    defaultSprite.beginFill(0x0000ff);
    defaultSprite.drawCircle(0,0, 7);

    defaultSprite.drawCircle(-5,-5, 5);
    defaultSprite.drawCircle(5,-5, 5);
    defaultSprite.drawCircle(-5,5, 5);
    defaultSprite.drawCircle(5,5, 5);
    var missle = defaultSprite.generateTexture();
    defaultSprite.destroy();
    this.magicMissile = new projectile(200, 2, 800,missle , 1000, magicCollisionHandler, game.mobCollisionGroup);
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
        var p = {}
        p.damage = projectile.damageValue;
        p.entity = game.add.sprite(sx + (-Math.cos(angle)), sy + (-Math.sin(angle)), projectile.texture);
        game.physics.p2.enable(p.entity);
        p.entity.body.angle += angle*180/Math.PI;
        p.entity.body.velocity.x = x_velocity;
        p.entity.body.velocity.y = y_velocity;
        p.entity.body.setCollisionGroup(game.projectileCollisionGroup);
        p.entity.body.collides(projectile.collidesWith, projectile.collisionHandler);
        p.entity.body.collides(game.allCollisionGroups);
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