var game = {};

var items = require('../static/items.json');
var random = require('random');

game.random_weapon = function (level) {
    var points = random.newIntBetween(level * 10, level * 12);
    var item = game.new_item();


    var split = random.newPercentageSplit(4);
    item.damage = split[0] * points;
    item.speed = split[1] * points;
    item.range = split[2] * points;
    item.crit_chance = split[3] * points;

    // var split = random.newPercentageSplit(10);
    // new_item.player_health = 0;
    // new_item.player_speed = 0;
    // new_item.player_strength = 0;
    // new_item.player_stamina = 0;
    // new_item.player_intelligence = 0;
    // new_item.player_charisma = 0;
    // new_item.player_wisdom = 0;
    // new_item.player_willpower = 0;
    // new_item.player_perception = 0;
    // new_item.player_luck = 0;


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
    new_item.player_health = 0;
    new_item.player_speed = 0;
    new_item.player_strength = 0;
    new_item.player_stamina = 0;
    new_item.player_intelligence = 0;
    new_item.player_charisma = 0;
    new_item.player_wisdom = 0;
    new_item.player_willpower = 0;
    new_item.player_perception = 0;
    new_item.player_luck = 0;


    return new_item;
};

module.exports = game;