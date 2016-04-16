var game = window.game;
var player = require('player');
var random = require('random');

var world = {}
var specs = {
    size: 30,
    chunk: 15
}
var maps = [];

world.preload = function(){
}


world.create = function(){
    game.world.setBounds(0, 0, 1920, 1920);
    game.physics.startSystem(Phaser.Physics.P2JS);
    world.tileGroup = game.add.group();
    world.tileGroup.zIndex = 0;
    game.camera.follow(player.entity);
    game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);
}

world.createMap = function(tile_y, tile_x) {
    for (var y = tile_y * specs.chunk; (y < specs.chunk + (tile_y * specs.chunk) ); y++) {
        for (var x = tile_x * specs.chunk; (x < specs.chunk + (tile_x * specs.chunk)) ; x++) {
            var bounds = new Phaser.Rectangle(y * specs.size, x * specs.size, specs.size, specs.size);
            var graphics = game.add.graphics(bounds.y, bounds.x);
            if (random.newIntBetween(0, 1) > 0.5)
                graphics.beginFill(0xD9CC3C);
            else
                graphics.beginFill(0x00ADA7);
            graphics.drawRect(0, 0, bounds.width, bounds.height);
            graphics.z = 0;
            world.tileGroup.add(graphics);
            //console.log(graphics);
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
    //this.game.world.setBounds(windowWidth + player.position.x, windowHeight + player.position.y, windowWidth*2, windowHeight*2);
    //Move the tilesprite (fixed to camera) depending on the player's positiontile
    //Sprite.tilePosition.y = -camera.view.y;
}


module.exports = world;