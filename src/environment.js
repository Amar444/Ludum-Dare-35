var game = window.game;
var TileManager = require('tileManager')
var random = require('random');
var world = require('world');
var specs = require('specs');
var Wood = require('tiles/wood');
var player = require('player');
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
        var bounds = new Phaser.Rectangle(tile.x * specs.size, tile.y * specs.size, specs.size, specs.size);
        var graphics = game.add.graphics(bounds.x, bounds.y);
        graphics.beginFill(0x006400);
        graphics.drawCircle((specs.size / 5) * - 1, (specs.size / 5) * - 1, bounds.width * 3, bounds.height * 3)
        game.physics.p2.enable(graphics);
        graphics.body.static = true;
        environment.entities.push(graphics);
        return true;
    }
    return false;
}
/*
 world.createStartingPoint = function() {
 var width = 150;
 var height = 150;

 var startingPoint = game.add.graphics(game.world.centerX - (width/2), game.world.centerY - (height/2));
 startingPoint.beginFill(0xC2AB4F);
 startingPoint.drawRect(0, 0, width, height);

 world.startingPointGroup.add(startingPoint);
 }
 */
environment.createStartingPoint = function() {
    var size = 6;
    environment.startingPointGroup = game.add.group();
    var foundTiles = TileManager.getTilesInChunk(
        Math.floor(player.entity.y / specs.size / specs.chunk),
        Math.floor(player.entity.x / specs.size / specs.chunk));

    for(var i in foundTiles){
        var foundTile = foundTiles[i];
        foundTile.graphics.destroy();
        var wood = new Wood(foundTile.x, foundTile.y, foundTile.chunk_y, foundTile.chunk_x, 0, world);
        TileManager.create(foundTile.chunk_y, foundTile.chunk_x, wood);
    }
    environment.entities.push()
}

module.exports = environment;