var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'undefined', { preload: preload, create: create, update: update, render: render });
window.game = game;

var player = require('player');
var world = require('world');
var camera = require('camera');
var item = require('item');
var projectile = require('projectile');
var projectileFactory = require('projectileFactory');
var mobFactory = require('mobFactory');
var inventoryScreen = require('inventoryScreen');

var sound = require('sound');
var character = require('character');


function preload() {
	game.time.advancedTiming = true;
	world.preload();
	player.preload();
	mobFactory.preload();
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
	mobFactory.create();
	projectileFactory.create();

	camera.create();
	world.postCreate();
	game.time.events.loop(Phaser.Timer.SECOND, tick, this);
	inventoryScreen.create();
}

var i = 0;
function update() {
	player.update();
	mobFactory.update();
}

function render() {
	camera.render();
	player.render();
}

function tick() {
	world.updateMap();
}

module.exports = game;
