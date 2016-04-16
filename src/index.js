window.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'undefined', { preload: preload, create: create, update: update, render: render });

var player = require('player');

var cursors;

function preload() {
	game.load.image('background','assets/tests/debug-grid-1920x1920.png');
	player.preload()
}

function create() {
	player.create();
	createWorld();
}

function update() {
	player.update()
}

function render() {
	player.render();
}

function createWorld() {
	game.add.tileSprite(0, 0, 1920, 1920, 'background');
	game.world.setBounds(0, 0, 1920, 1920);
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.camera.follow(player);
	game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);
}

