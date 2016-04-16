var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'undefined', { preload: preload, create: create, update: update, render: render });
window.game = game;

var player = require('player');
var world = require('world');
var camera = require('camera');
var sound = require('sound');
var character = require('character');

function preload() {
	world.preload();
	player.preload();
	sound.preload();
}

function create() {
	for(var i = 0; i < 10;i++){
		console.log(character.random_mob(10));
	}
	world.create();
	sound.create();
	player.create();
	camera.create();

	game.time.events.loop(Phaser.Timer.SECOND, world.updateMap, this);
}

function update() {
	player.update();
}

function render() {
	camera.render();
	player.render();
}

module.exports = game;
