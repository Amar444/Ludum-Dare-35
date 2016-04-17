var game = {};

var items = require('../static/items.json');
var random = require('random');
var classes = require('classes');

game.random_weapon = function (level) {
    var item = game.random_item(level);
    item.type = 'weapon';
    item.name = items.SEEDITEMWEAPONALL[random.newIntBetween(0, items.SEEDITEMWEAPONALL.length)];
    return item;
}

game.random_armour = function (level) {
    var item = game.random_item(level);
    item.type = 'armour';
    item.name = items.SEEDITEMARMOR[random.newIntBetween(0, items.SEEDITEMARMOR.length)];
    return item;
}

game.random_shield = function (level) {
    var item = game.random_item(level);
    item.type = 'shield';
    item.name = items.SEEDITEMARMORSHIELD[random.newIntBetween(0, items.SEEDITEMARMORSHIELD.length)];
    return item;
}
game.random_hat = function (level) {
    var item = game.random_item(level);
    item.type = 'hat';
    item.name = items.SEEDITEMABSTRACT[random.newIntBetween(0, items.SEEDITEMABSTRACT.length)];
    return item;
}

game.random_item = function (level) {
    if(!isFinite(level) || level <= 0 || level > 10000){
        console.error("invalid level: ", level)
        throw "Level is invalid "
    }
    var points = random.newIntBetween(level * 10, level * 12);
    var item = game.new_item();
    var split = random.newPercentageSplit(4);
    item.damage = split[0] * points;
    item.affinity = classes.get_random_class(false);
    item.speed = split[1] * points;
    item.range = split[2] * points;
    item.crit_chance = split[3] * points;

    function mod_calc(s){
        var hl = (level / 2);
        return  Math.round((s*level));
    }

    var split = random.newPercentageSplit(11);

    item.mod_health = mod_calc(split[0]);
    item.mod_maxHealth = mod_calc(split[0]);
    item.mod_speed = mod_calc(split[1]);
    item.mod_strength = mod_calc(split[2]);
    item.mod_wisdom = mod_calc(split[3]);
    item.mod_dexterity = mod_calc(split[4])
    item.mod_armour = mod_calc(split[5]);


    return item
};

game.new_item = function () {
    var new_item = {};
    new_item.name = '';
    new_item.type = 'unknown';

    //weapon
    new_item.damage = 0;
    new_item.speed = 0;
    new_item.range = 0;
    new_item.crit_chance = 0;

    // modifiers
    new_item.mod_health = 0;
    new_item.mod_speed = 0;
    new_item.mod_strength = 0;
    new_item.mod_wisdom = 0;
    new_item.mod_dexterity = 0;
    new_item.mod_armour = 0;



    return new_item;
};

module.exports = game;