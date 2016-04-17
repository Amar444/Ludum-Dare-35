var game = window.game;
var stats = require('character');
var mobType = require('mob');
var player = require('player');
var world = require('world');
var projectiles = require("projectileFactory")
var projectile = require("projectile");
var specs = require('specs');


var mobFactory = {};

var mobs = new Array();
var easystar;

mobFactory.preload = function(){
    game.load.script('EasyStar', '_plugins/easystar.js');
}

mobFactory.update = function() {
    for (var mob in mobs) {
        mobs[mob].update();

        if (mobs[mob].current_health <= 0) {
            mobs.splice(mob, 1);
        }
    }
    if (game.input.mousePointer.isDown && this.mobtest) {
        this.mobtest = false;
        this.spawnMob(player.entity.x + 250, player.entity.y + 250, mobFactory.defaultMobType, world.getMobLevel());
        for (var mob in mobs) {
            mobs[mob].update();
        }
        if (game.input.mousePointer.isDown) {
        }
    }
    easystar.calculate();
}

mobFactory.create = function () {
    easystar = new EasyStar.js();
    easystar.setAcceptableTiles([0]);
    easystar.enableDiagonals();

    var defaultSprite = game.add.graphics(0, 0);
    defaultSprite.beginFill(0x222222);
    defaultSprite.drawCircle(0, 0, 32);
    defaultSprite.beginFill(0xFF0000);
    defaultSprite.drawCircle(0, 0, 25);

    var defaultRangedSprite = game.add.graphics(0,0);
    defaultRangedSprite.beginFill(0x121212);
    defaultRangedSprite.drawRect(0, 0, 30, 30);
    defaultRangedSprite.beginFill(0x666666);
    defaultRangedSprite.drawRect(0, 0, 24, 24);

    var defaultRangedCollisionHandler = function(target, A, B, equation){
        if(target.sprite.name == "player"){
            console.log("player got hit");
        }
    }

    mobFactory.defaultRangedProjectile = new projectile(undefined, undefined, undefined, undefined, undefined, defaultRangedCollisionHandler)
    mobFactory.defaultMobType = new mobType(mobFactory.defaultAi, defaultSprite.generateTexture());
    mobFactory.defaultRangedMob = new mobType(mobFactory.defaultRangedAi, defaultRangedSprite.generateTexture());
    defaultSprite.destroy();
    defaultRangedSprite.destroy();
}


mobFactory.spawnMob = function (locationX, locationY, mobType, level) {
    var mob = {};
    mob = stats.random_mob(level);
    mob.entity = game.add.sprite(locationX, locationY, mobType.texture);
    game.physics.p2.enable(mob.entity);

    mob.update = mobType.ai;
    mob.move = mobType.move;
    mob.pathfindRange = mobType.pathfindRange;
    mobs.push(mob);
    mob.entity.name = "enemy";
    //mob.entity.onBeginContact.add(mobType.collisionHandler);

    /* Returns the mob in case you want to do something special with it */
    return mob;
}

mobFactory.defaultAi = function () {
    var rad = 7;
    //console.log(this.current_health)
    if (this.hit) {
        this.pathfindRange = 15;
        this.hit = false;
        var dmg = this.hitDamage;
        this.current_health -= 1;
        if (this.current_health <= 0) {
            this.entity.destroy();
            //Drop random item
            return;
        }
    }
    var rad = this.pathfindRange;

    var m_x = Math.floor(this.entity.x / specs.size); //tile x
    var m_y = Math.floor(this.entity.y / specs.size); //tile y
    var tiles = world.getTilesAroundPlayer(rad);
    var self = this;
    easystar.setGrid(tiles.grid);
    if (m_x >= tiles.pX - rad && m_x <= tiles.pX + rad &&
        m_y >= tiles.pY - rad && m_y <= tiles.pY + rad) {
        easystar.findPath(rad + m_x - tiles.pX, rad + m_y - tiles.pY, rad, rad, (path) => {
            if (path === undefined || path === null || path.length === 0) {
                self.move(0, 0);
            } else {
                var next = path.slice(0, 1)[0];

                var dx = 0;
                var dy = 0;
                if (next.x < rad)
                    dx++;
                if (next.x > rad)
                    dx--;
                if (next.y < rad)
                    dy++;
                if (next.y > rad)
                    dy--;

                self.move(dx, dy);
            }
        });
    } else {
        self.move(0, 0);
    }
};


mobFactory.defaultRangedAi = function(){
    if(this.defaultAI == undefined) {this.defaultAi = mobFactory.defaultAi;};
    this.defaultAi();
    projectiles.spawnProjectile(this, player, mobFactory.defaultRangedProjectile)
};


mobFactory.findMobInCone = function (x,y,direction,spread,range){
    var out = []
    for(var i in mobs){
        var m = mobs[i]
        var d = Math.sqrt(Math.pow(x-m.entity.x,2) + Math.pow(y-m.entity.y,2));

        var sx = player.entity.x;
        var sy = player.entity.y;
        var tx = m.entity.x;
        var ty = m.entity.y;
        var angle = Phaser.Point.angle(new Phaser.Point(sx, sy), new Phaser.Point(tx, ty));
        if(d < range){
            // TODO: radius
            out.push(m)
        }
    }
    
    return out
}
module.exports = mobFactory


