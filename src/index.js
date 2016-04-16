var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'undefined', { preload: preload, create: create, update: update, render: render });
window.game = game;

var player = require('player');
var world = require('world');
var camera = require('camera');
var item = require('item');
var projectiles = require('projectile');
var character = require('character');


function preload() {
	world.preload();
	player.preload();
	projectiles.preload();
}

function create() {

	for(var i = 0; i < 10;i++){
		console.log(character.random_mob(10));
	}
	world.create();
	player.create();
	camera.create(player);
	projectiles.create();
}

function update() {
	player.update();
	projectiles.update();
}

function render() {
	player.render();
	camera.render(player);
}

module.exports = game;
