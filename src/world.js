var game = window.game;
var player = require('player');
var random = require('random');
var simplexNoise = require('perlin');

var TileManager = require('tileManager');
var specs = require('specs')
var environment = require('environment');
var bmd;
var world = {};
var simplex = {};
var mobLevel = 1;

var maps = [];

world.preload = function(){

};

world.emptyMap = function() {
    return maps === undefined || maps.length === 0;
};

world.preCreate = function(){
    random.generateSeed();
    game.world.setBounds(0, 0, 10000, 10000);
    bmd = game.add.bitmapData(10000, 10000);
    bmd.addToWorld();
    world.bmd = bmd;
    game.physics.startSystem(Phaser.Physics.P2JS);

    //INIT FOR COLLISION EVENTS
    game.physics.p2.setImpactEvents(true);
    game.enemyCollisionGroup = game.physics.p2.createCollisionGroup();
    game.projectileCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    world.tileGroup = game.add.group();
    world.startingPointGroup = game.add.group();
    world.createStartingPoint();
    game.camera.follow(player.entity);
    game.camera.deadzone = new Phaser.Rectangle(50, 50, 600, 400);
    simplex = simplexNoise.create();
};

world.postCreate = function() {
    this.updateMap();
};

world.createMap = function(chunk_y, chunk_x) {
    random.setSeed(chunk_x, chunk_y);
    for (var y = chunk_y * specs.chunk; (y < specs.chunk + (chunk_y * specs.chunk) ); y++) {
        for (var x = chunk_x * specs.chunk; (x < specs.chunk + (chunk_x * specs.chunk)) ; x++) {
            TileManager.create(x, y, chunk_y, chunk_x, simplex.noise(x, y), world);
        }
    }
    game.world.sendToBack(world.tileGroup);
<<<<<<< HEAD
};

=======
    environment.create(chunk_y, chunk_x);
>>>>>>> 82eb3b8c2c8da427b7a42e29b34c08e586e548c2

}
world.updateMap = function() {
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

    for(var x in accepted_maps) {
        var acceptedMapCoordinates = accepted_maps[x].split(".");
        var found = false;
        var accepted = true;
        for(var y in maps) {
            found = true;
            var mapCoordinates = maps[y].split(".");
            if (acceptedMapCoordinates[0] == mapCoordinates[0] && acceptedMapCoordinates[1] == mapCoordinates[1]) {
                accepted = false;
            }
        }

        if(accepted) {
            maps.push(acceptedMapCoordinates[0] + "." + acceptedMapCoordinates[1]);
            world.createMap(acceptedMapCoordinates[0], acceptedMapCoordinates[1]);
        }
    }
    for(var y in maps) {
        var notFoundMapCoordinates = maps[y].split(".");
        var found = false;
        for (var x in accepted_maps) {
            var acceptedMapCoordinates = accepted_maps[x].split(".");
            if (acceptedMapCoordinates[0] == notFoundMapCoordinates[0] && acceptedMapCoordinates[1] == notFoundMapCoordinates[1]) {
                found = true
                break;
            }
        }
        if(!found){
            var chunkTiles = TileManager.getTilesInChunk(notFoundMapCoordinates[0], notFoundMapCoordinates[1]);
            for (x in chunkTiles) {
                chunkTiles[x].graphics.destroy();
            }
            maps.splice(y, 1);
        }
    }

};

world.getTilesAroundPlayer = function(r) {  //radius
    var p_x = Math.floor(player.entity.x / specs.size); //tile x
    var p_y = Math.floor(player.entity.y / specs.size); //tile y
    var tiles = {
        pX: p_x,
        pY: p_y,
        grid: []
    };

    for (var i = 0; i < r*2 + 1; i++) {
        tiles.grid[i] = new Array(r*2 + 1);
    }

    for (var i = 0; i < r*2 + 1; i++) {
        for (var j = 0; j < r*2 + 1; j++) {
            var x = p_x - r + j;
            var y = p_y - r + i;
            var solid = TileManager.getType(simplex.noise(x, y)).solid;
            if (solid) {
                //obstructable
                tiles.grid[i][j] = 1;
            } else {
                //clear
                tiles.grid[i][j] = 0;
            }
        }
    }
    return tiles;
};

world.update = function() {
    world.calculateMobLevel();
};

world.getTileSize = function() {
    return specs.size;
};

world.createStartingPoint = function() {
    var width = 150;
    var height = 150;

    var startingPoint = game.add.graphics(game.world.centerX - (width/2), game.world.centerY - (height/2));
    startingPoint.beginFill(0xC2AB4F);
    startingPoint.drawRect(0, 0, width, height);

    world.startingPointGroup.add(startingPoint);
};

world.calculateMobLevel = function(){
    //Calculate it!
    mobLevel = 1;
};

world.getMobLevel = function(){
    return mobLevel;
};


module.exports = world;
