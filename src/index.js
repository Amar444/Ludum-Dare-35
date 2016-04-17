var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'undefined', { preload: preload, create: create, update: update, render: render });
window.game = game;

var player = require('player');
var world = require('world');
var camera = require('camera');
var item = require('item');
var projectile = require('projectile');
var projectileFactory = require('projectileFactory');
var mobFactory = require('mobFactory');

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
	world.preCreate();
	sound.create();
	player.create();
	mobFactory.create();
	projectileFactory.create();

	camera.create();
	world.postCreate();

	game.time.events.loop(Phaser.Timer.SECOND, tick, this);
	mobFactory.spawnMob(5100, 5000, mobFactory.defaultMobType, 10);
}

function init() {

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
