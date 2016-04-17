var game = window.game;
var stats = require('character');
var mobType = require('mob');
var player = require('player');

var mobFactory = {};

mobFactory.preload = function(){
    mobFactory.mobs = new Array();
    var defaultSprite = game.add.graphics();
    defaultSprite.beginFill(0x444444);
    defaultSprite.drawRect(0,0,50,50);
    mobFactory.defaultMobType = new mobType(function(){}, defaultSprite.generateTexture());
    defaultSprite.destroy();
}

mobFactory.update = function(){
    for(var mob in mobFactory.mobs){
        mob.update;
    }
    if(game.input.mousePointer.isDown){
        this.spawnMob(player.entity.x+250, player.entity.y+250, mobFactory.defaultMobType, 20);
    }
}

mobFactory.create = function () {
    game.enemyCollisionGroup = game.physics.p2.createCollisionGroup();
}


mobFactory.spawnMob = function(locationX, locationY, mobType, level){
    var mob = {};
    mob = stats.random_mob(level);
    mob.entity = game.add.sprite(locationX, locationY, mobType.texture);
    game.physics.p2.enable(mob.entity);
    mob.update = mobType.ai;
    mob.entity.body.setCollisionGroup(game.enemyCollisionGroup);
    console.log(game.enemyCollisionGroup);
    mobFactory.mobs.push(mob);
    /* Returns the mob in case you want to do something special with it */
    return mob;

}

module.exports = mobFactory;