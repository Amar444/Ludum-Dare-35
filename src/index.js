var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'undefined', { preload: preload, create: create, update: update, render: render });
window.game = game;

var player = require('player');
var world = require('world');
var camera = require('camera');
var item = require('item');
var projectile = require('projectile');
var projectileFactory = require('projectileFactory');

var sound = require('sound');
var character = require('character');


function preload() {
	world.preload();
	player.preload();
	projectile.preload();
	projectileFactory.preload();
	sound.preload();
}

function create() {
	for(var i = 0; i < 10;i++){
		console.log(character.random_mob(10));
	}
	world.preCreate();
	sound.create();
	player.create();
	projectileFactory.create();
	camera.create();
	world.postCreate();
	game.time.events.loop(Phaser.Timer.SECOND * 0.5, tick, this);
}

var i = 0;
function update() {
	player.update();
	if (!world.emptyMap() && i < 1) {
		var chunks = world.getChunks();
		console.log(chunks);
		i++;
	}
}

function render() {
	camera.render();
	player.render();
}

function tick() {
	world.updateMap();
}

module.exports = game;
