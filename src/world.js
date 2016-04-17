var game = window.game;
var player = require('player');
var random = require('random');
var simplexNoise = require('perlin');

var world = {};
var simplex = {};
var specs = {
    size: 30,
    chunk: 15
}

var maps = [];

world.preload = function(){

}

world.preCreate = function(){
    game.world.setBounds(0, 0, 1920, 1920);
    game.physics.startSystem(Phaser.Physics.P2JS);
    world.tileGroup = game.add.group();
    world.startingPointGroup = game.add.group();
    world.createStartingPoint();
    game.camera.follow(player.entity);
    game.camera.deadzone = new Phaser.Rectangle(50, 50, 600, 400);
    simplex = simplexNoise.create();
}

world.postCreate = function() {
    this.updateMap();
}

world.createMap = function(tile_y, tile_x) {
    for (var y = tile_y * specs.chunk; (y < specs.chunk + (tile_y * specs.chunk) ); y++) {
        for (var x = tile_x * specs.chunk; (x < specs.chunk + (tile_x * specs.chunk)) ; x++) {
            //Tile.create()
            var bounds = new Phaser.Rectangle(y * specs.size, x * specs.size, specs.size, specs.size);
            var graphics = game.add.graphics(bounds.y, bounds.x);
            if (simplex.noise(x, y) > 0){
                graphics.beginFill(0x00ADA7);
                game.physics.p2.enable(graphics, true);
                graphics.body.static = true;
            } else{
                graphics.beginFill(0xD9CC3C);
            }
            graphics.drawRect((specs.size / 2) * - 1, (specs.size / 2) * - 1, bounds.width, bounds.height);
            graphics.z = 0;

            world.tileGroup.add(graphics);
        }
    }
    game.world.sendToBack(world.tileGroup)
}

world.updateMap = function(){
    var coordinates = player.entity;
    var player_chunk_y = Math.floor(coordinates.y / specs.size / specs.chunk);
    var player_chunk_x = Math.floor(coordinates.x / specs.size / specs.chunk);
    var accepted_maps = [];

    //check surrouding neighbours
    for(var i = player_chunk_x-1; i <= player_chunk_x+1; i++) {
        for(var j = player_chunk_y-1; j <= player_chunk_y+1; j++) {
            //check if already made
            accepted_maps.push(j  + "." +  i);

        }
    }

    for(var x in accepted_maps){
        var acceptedMapCoordinates = accepted_maps[x].split(".");

        var accepted = true;
        for(var y in maps) {
            var mapCoordinates = maps[y].split(".");
            if (acceptedMapCoordinates[0] == mapCoordinates[0] && acceptedMapCoordinates[1] == mapCoordinates[1]) {
                accepted = false;
            }
        }

        if(accepted) {
            maps.push(acceptedMapCoordinates[0] + "." + acceptedMapCoordinates[1]);
            setTimeout(function(acceptedMapCoordinates){
                world.createMap(acceptedMapCoordinates[0], acceptedMapCoordinates[1]);
            }, 0, acceptedMapCoordinates)

        }
    }
}

world.update = function() {

}

world.createStartingPoint = function() {
    var width = 200;
    var height = 200;

    var startingPoint = game.add.graphics(game.world.centerX - (width/2), game.world.centerY - (height/2));
    startingPoint.beginFill(0xC2AB4F);
    startingPoint.drawRect(0, 0, width, height);

    world.startingPointGroup.add(startingPoint);
}


module.exports = world;
