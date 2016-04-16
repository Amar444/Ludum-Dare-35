var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'undefined', { preload: preload, create: create, update: update, render: render });
window.game = game;

var player = require('player');
var world = require('world');
var camera = require('camera');

function preload() {
	world.preload();
	player.preload();
}

function create() {
	world.create();
	player.create();
	camera.create(player);
}

function update() {
	player.update();
}

function render() {
	player.render();
	camera.render(player);
}

module.exports = game;