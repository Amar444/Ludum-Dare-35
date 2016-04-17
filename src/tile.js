var game = window.game;
var specs = require('specs');
class Tile {
    constructor(x, y, chunk_y, chunk_x, simplex, world) {
        this.x = x;
        this.y = y;
        this.chunk_y = chunk_y;
        this.chunk_x = chunk_x;
        this.simplex = simplex;
        this.world = world;
    }

    preRender() {
        var bounds = new Phaser.Rectangle(this.y * specs.size, this.x * specs.size, specs.size, specs.size);
        this.graphics = game.add.graphics(bounds.y, bounds.x);
        this.render();
        this.graphics.z = 0;
        this.graphics.drawRect((specs.size / 2) * - 1, (specs.size / 2) * - 1, bounds.width, bounds.height);
        this.world.tileGroup.add(this.graphics);
        
    }
}

module.exports = Tile;
