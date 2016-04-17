var game = window.game;
var stats = require('character');
var mobType = require('mob');
var player = require('player');
var world = require('world');

var mobFactory = {};

var mobs = new Array();
var easystar;

mobFactory.preload = function(){
    game.load.script('EasyStar', '_plugins/easystar.js');
}

mobFactory.update = function() {
    for (var mob in this.mobs) {
        this.mobs[mob].update();
    }
    if (game.input.mousePointer.isDown && this.mobtest) {
        this.mobtest = false;
        this.spawnMob(player.entity.x + 250, player.entity.y + 250, mobFactory.defaultMobType, 20);
        for (var mob in mobs) {
            mobs[mob].update();
        }
        easystar.calculate();
        if (game.input.mousePointer.isDown) {
        }
    }
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

    mobFactory.defaultMobType = new mobType(mobFactory.defaultAi, defaultSprite.generateTexture());
    defaultSprite.destroy();
    game.enemyCollisionGroup = game.physics.p2.createCollisionGroup();
}


mobFactory.spawnMob = function (locationX, locationY, mobType, level) {
    var mob = {};
    mob = stats.random_mob(level);
    mob.entity = game.add.sprite(locationX, locationY, mobType.texture);
    game.physics.p2.enable(mob.entity);
    mob.update = mobType.ai;
    mob.move = mobType.move;
    mob.entity.body.setCollisionGroup(game.enemyCollisionGroup);
    mob.entity.body.collides(game.projectileCollisionGroup);
    mob.entity.body.debug = true;
    mobs.push(mob);

    /* Returns the mob in case you want to do something special with it */
    return mob;
}

mobFactory.defaultAi = function () {
    var rad = 7;
    var m_x = Math.floor(this.entity.x / world.getTileSize()); //tile x
    var m_y = Math.floor(this.entity.y / world.getTileSize()); //tile y
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

module.exports = mobFactory