var game = {};

var items = require('../static/items.json');
var random = require('random');

game.random_weapon = function (level) {
    var item = game.random_item(level);
    item.name = items.SEEDITEMWEAPONALL[random.newIntBetween(0, items.SEEDITEMWEAPONALL.length)];
    return item;
}

game.random_armour = function (level) {
    var item = game.random_item(level);
    item.name = items.SEEDITEMARMOR[random.newIntBetween(0, items.SEEDITEMARMOR.length)];
    return item;
}

game.random_shield = function (level) {
    var item = game.random_item(level);
    item.name = items.SEEDITEMARMORSHIELD[random.newIntBetween(0, items.SEEDITEMARMORSHIELD.length)];
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
    item.speed = split[1] * points;
    item.range = split[2] * points;
    item.crit_chance = split[3] * points;

    function mod_calc(s){
        var hl = (level / 2);
        return  Math.round((s*level));
    }

    var split = random.newPercentageSplit(10);

    item.mod_health = mod_calc(split[0]);
    item.mod_speed = mod_calc(split[1]);
    item.mod_strength = mod_calc(split[2]);
    item.mod_stamina = mod_calc(split[3]);
    item.mod_intelligence = mod_calc(split[4]);
    item.mod_charisma = mod_calc(split[5]);
    item.mod_wisdom = mod_calc(split[6]);
    item.mod_willpower = mod_calc(split[7]);
    item.mod_perception = mod_calc(split[8]);
    item.mod_luck = mod_calc(split[9]);


    return item
};

game.new_item = function () {
    var new_item = {};
    new_item.name = '';

    //weapon
    new_item.damage = 0;
    new_item.speed = 0;
    new_item.range = 0;
    new_item.crit_chance = 0;

    // modifiers
    new_item.mod_health = 0;
    new_item.mod_speed = 0;
    new_item.mod_strength = 0;
    new_item.mod_stamina = 0;
    new_item.mod_intelligence = 0;
    new_item.mod_charisma = 0;
    new_item.mod_wisdom = 0;
    new_item.mod_willpower = 0;
    new_item.mod_perception = 0;
    new_item.mod_luck = 0;



    return new_item;
};

module.exports = game;