var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'undefined', { preload: preload, create: create, update: update, render: render });
window.game = game;

var player = require('player');
var world = require('world');
var camera = require('camera');
var item = require('item');
var projectiles = require('projectile');

function preload() {
	world.preload();
	player.preload();
	projectiles.preload();
}

function create() {
	world.preCreate();
	player.create();
	world.postCreate();
	projectile = projectiles.create(100,100,100);
	for(var i = 0; i < 10;i++){
		console.log(item.random_weapon(10));
	}
}

function update() {
	player.update();
}

function render() {
	player.render();
	camera.render();
}

module.exports = game;
