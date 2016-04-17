var game = window.game;
var itemLibrary = require('item');
var shapes = require("shapes");
var player = require("player");

var itemFactory = {};
var itemSize = 40;
var dropchance = 30;
var group;

itemFactory.dropRandomItem = function(level, x, y){
    var randomNumber = Math.random();

    //Chance a weapon drops
    if(randomNumber >= 0 && randomNumber < (dropchance/100) ){
        var item = itemFactory.createRandomItem(level);
        itemFactory.drawItem(item, x, y);
    }
};

itemFactory.createRandomItem = function(level){
    var item;
    var randomNumber = Math.random();

    if(randomNumber >= 0 && randomNumber < 0.20 ){
        //Weapon
        item = itemLibrary.random_weapon(level);
    } else if (randomNumber >= 0.20 && randomNumber < 0.45 ) {
        //Armour
        item = itemLibrary.random_armour(level);
    } else if (randomNumber >= 0.45 && randomNumber < 0.70 ){
        //Shield
        item = itemLibrary.random_shield(level);
    } else {
        //Hat
        item = itemLibrary.random_hat(level);
    }

    return item;
};

itemFactory.drawItem = function(item, x, y){
    group = game.add.group();
    var sprite = game.add.graphics(x, y);
    sprite.beginFill(0x444444);
    sprite.drawRect(0, 0, itemSize,itemSize);

    if(item.type == "weapon"){
        sprite.beginFill(0xffff00);
        shapes.item_weapon(sprite, itemSize);
    }else if(item.type == "armour"){
        sprite.beginFill(0x00ff00);
        shapes.item_armour(sprite,itemSize);
    }else if(item.type == "hat"){
        sprite.beginFill(0x0000ff);
        shapes.item_hat(sprite,itemSize);
    }else if(item.type == "shield"){
        sprite.beginFill(0xffff00);
        shapes.item_shield(sprite,itemSize,0xff0000);
    }else {
        sprite.beginFill(0x222222);
    }

    var itemGroup = group.create(0,0, sprite.generateTexture());
};

module.exports = itemFactory;
