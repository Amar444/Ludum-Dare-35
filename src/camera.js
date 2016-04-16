var game = window.game;
var player = require('player');

var camera = {};
var x = 0, y = 0;
var tween = 0.07;

camera.create = function() {
    x = game.camera.x = player.entity.x;
    y = game.camera.y = player.entity.y;
}

camera.render = function() {
    x += (player.entity.x - x) * tween;
    y += (player.entity.y - y) * tween;

    game.camera.x = x - game.camera.width/2;
    game.camera.y = y - game.camera.height/2;
}

module.exports = camera;