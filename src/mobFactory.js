var game = window.game;
var stats = require('character');
var mobType = require('mob');
var player = require('player');
var world = require('world');
var itemFactory = require('itemFactory');

var projectiles = require("projectileFactory");
var projectile = require("projectile");
var particles = require("particles");
var sound = require("sound");
var specs = require('specs');
var random = require('random');
var TileManager = require('tileManager');



var mobFactory = {};

var mobs = new Array();
var easystar;

var IFRAMELENGTH = 250;

mobFactory.preload = function(){
    game.load.script('EasyStar', '_plugins/easystar.js');
};

mobFactory.update = function() {
    for (var mob in mobs) {
        mobs[mob].update();

        if (mobs[mob].current_health <= 0) {
            particles.splatter(mobs[mob].entity.x,mobs[mob].entity.y)
            sound.play_effect('meow')
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
    this.spawn();
};

mobFactory.spawn = function() {
    var freq = 175 - world.getMobLevel() * 10;
    var chance = random.newIntBetween(0, freq);
    if (chance != 1)
        return;
    var x = player.entity.x;
    var y = player.entity.y;
    var minDistance = 5;
    var variation = 5;

    var dx = random.newIntBetween(minDistance, minDistance + variation);
    var dy = random.newIntBetween(minDistance, minDistance + variation);
    if (random.newFloat() > 0.5)
        dx = -dx;
    if (random.newFloat() > 0.5)
        dy = -dy;

    var solid = TileManager.getType(world.simplex.noise(
        Math.round(x/specs.size)+dx,
        Math.round(y/specs.size)+dy)
    );
    if (!solid) {
        this.spawnMob(
            Math.round(x/specs.size)*specs.size + (dx * specs.size),
            Math.round(y/specs.size)*specs.size + (dy * specs.size),
            mobFactory.defaultMobType, world.getMobLevel()
        );
        //console.log("Creature has spawned");
    }
};

mobFactory.create = function () {
    //-------------------------------------------------------------
    //-------------- TEMPORARY - DROP RANDOM ITEM ON GROUND -------
    //-------------------------------------------------------------
    game.input.keyboard.addKey(Phaser.Keyboard.X).onDown.add(function () {
        itemFactory.dropRandomItem(10, player.entity.x + 20, player.entity.y + 20);
    }, this);
    //-------------------------------------------------------------


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

    var defaultRangedCollisionHandler = function(projectile, player){
        //console.log("Do shit when you hit the player");
    }
    var defaultMeleeCollisionHandler = function(mob, player){
        //console.log("Do shit when you hit the player");
        if(player.daddy.iframes){return};
        player.daddy.iframes = true;
        player.daddy.character.current_health--;
        setTimeout(function(){
            player.daddy.iframes = false;
        }, IFRAMELENGTH);
    }

    mobFactory.defaultRangedProjectile = new projectile(undefined, undefined, undefined, undefined, undefined, defaultRangedCollisionHandler, game.playerCollisionGroup);
    mobFactory.defaultMobType = new mobType(mobFactory.defaultAi, defaultSprite.generateTexture(), defaultMeleeCollisionHandler);
    mobFactory.defaultRangedMob = new mobType(mobFactory.defaultRangedAi, defaultRangedSprite.generateTexture());
    defaultSprite.destroy();
    defaultRangedSprite.destroy();
};


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
    mob.entity.body.daddy = mob;
    //mob.entity.onBeginContact.add(mobType.collisionHandler);
    mob.entity.body.setCollisionGroup(game.mobCollisionGroup);
    mob.entity.body.collides(game.playerCollisionGroup, mobType.collisionHandler);
    mob.entity.body.collides(game.allCollisionGroups);
    /* Returns the mob in case you want to do something special with it */
    return mob;
};

var last;
mobFactory.defaultAi = function () {
    if (this.current_health <= 0) {
        //Drop random item
        itemFactory.dropRandomItem(this.level, this.entity.x, this.entity.y);
        this.entity.destroy();
        return;
    }

    var rad = 7;
    if (this.hit) {
        this.pathfindRange = 15;
        this.hit = false;
        var dmg = this.hitDamage;
        this.current_health -= 1;
    }

    var rad = this.pathfindRange;

    var m_x = Math.round(this.entity.x / specs.size); //tile x
    var m_y = Math.round(this.entity.y / specs.size); //tile y
    var tiles = world.getTilesAroundPlayer(rad);
    var self = this;
    easystar.setGrid(tiles.grid);
    if (m_x >= tiles.pX - rad && m_x <= tiles.pX + rad &&
        m_y >= tiles.pY - rad && m_y <= tiles.pY + rad) {
        easystar.findPath(rad + m_x - tiles.pX, rad + m_y - tiles.pY, rad, rad, (path) => {
            if (path === undefined || path === null || path.length === 0) {
                self.move(0, 0);
            } else {
                var now = path.slice(0, 1)[0];
                var next = path.slice(1, 2)[0];

                var dx = 0;
                var dy = 0;
                dx = next.x - now.x;
                dy = next.y - now.y;
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
    projectiles.spawnProjectile(this, player, mobFactory.defaultRangedProjectile);
};


mobFactory.findMobInCone = function (x,y,direction,spread,range){
    var out = [];
    for(var i in mobs){
        var m = mobs[i];
        var d = Math.sqrt(Math.pow(x-m.entity.x,2) + Math.pow(y-m.entity.y,2));

        var sx = player.entity.x;
        var sy = player.entity.y;
        var tx = m.entity.x;
        var ty = m.entity.y;
        var angle = Phaser.Point.angle(new Phaser.Point(sx, sy), new Phaser.Point(tx, ty));
        if(d < range){
            console.log(angle, direction);
            if (Math.abs(Math.abs(angle) - Math.abs(direction)) < spread) {
                out.push(mobs[i]);
            }
        }
    }

    return out;
};
module.exports = mobFactory;
