var game = window.game;
var TileManager = require('tileManager')
var random = require('random');
var world = require('world');
var specs = require('specs');
var environment = {};

environment.entities = [];

environment.create = function(chunk_x, chunk_y){
    var tiles = TileManager.getTilesInChunk(chunk_x, chunk_y);
    for(var x in tiles){
        var tile = tiles[x];
        switch (true){
            case(environment.plantTree(tile)):
                break;
        }
    }

}

environment.plantTree = function(tile){
    if(tile.constructor.name == "Grass" && random.newFloatBetween(0, 1) < 0.005){
        var bounds = new Phaser.Rectangle(tile.x * specs.size, tile.y * specs.size, specs.size * 3, specs.size * 3);
        var graphics = game.add.graphics(bounds.y, bounds.x);
        graphics.beginFill(0xff0000);
        graphics.drawCircle((specs.size / 2) * - 1, (specs.size / 2) * - 1, bounds.width, bounds.height);
        return true;
    }
    return false;
}

module.exports = environment;