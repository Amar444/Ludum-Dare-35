var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'undefined', { preload: preload, create: create, update: update, render: render });
window.game = game;

var player = require('player');
var world = require('world');
var camera = require('camera');

function preload() {
	world.preload();
	player.preload()
}

function create() {
	world.preCreate();
	player.create()
	world.postCreate();
}

function update() {
	player.update()
}

function render() {
	player.render();
	camera.render();
}

module.exports = game;

