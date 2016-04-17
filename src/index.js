var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'undefined', { preload: preload, create: create, update: update, render: render });
window.game = game;

var player = require('player');
var world = require('world');
var camera = require('camera');
var item = require('item');
var projectile = require('projectile');
var particles = require('particles');
var projectileFactory = require('projectileFactory');
var mobFactory = require('mobFactory');
var inventoryScreen = require('inventoryScreen');

var sound = require('sound');
var character = require('character');
var hud = require('hud');


function preload() {

	game.time.advancedTiming = true;
	world.preload();
	player.preload();
	mobFactory.preload();
	projectile.preload();
	projectileFactory.preload();
	sound.preload();
	hud.preload();
	particles.preload()

}

function create() {
	world.preCreate();
	sound.create();
	player.create();
	mobFactory.create();
	projectileFactory.create();
	particles.create();
	camera.create();
	hud.create();
	world.postCreate();

	game.time.events.loop(Phaser.Timer.SECOND, tick, this);
	inventoryScreen.create();
	mobFactory.spawnMob(player.entity.x - 50, player.entity.y + 50, mobFactory.defaultRangedMob, 50);
	mobFactory.spawnMob(player.entity.x + 50, player.entity.y - 50, mobFactory.defaultMobType, 50);

	mobFactory.spawnMob(22765, 22725, mobFactory.defaultRangedMob, 50);
	mobFactory.spawnMob(22765, 22765, mobFactory.defaultMobType, 50);


}

var i = 0;
function update() {
	world.update();
	player.update();
	mobFactory.update();
}

function render() {
	camera.render();
	player.render();
	hud.render();
}

function tick() {
	world.updateMap();
}

module.exports = game;
