var game = window.game;
var player = require('player');
var random = require('random');

var world = {}
var specs = {
    size: 30,
    chunk: 30
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

world.createMap = function(chunk_y, chunk_x) {
    random.setSeed(chunk_x, chunk_y);
    for (var y = chunk_y * specs.chunk; (y < specs.chunk + (chunk_y * specs.chunk) ); y++) {
        for (var x = chunk_x * specs.chunk; (x < specs.chunk + (chunk_x * specs.chunk)) ; x++) {
            var bounds = new Phaser.Rectangle(y * specs.size, x * specs.size, specs.size, specs.size);
            var graphics = game.add.graphics(bounds.y, bounds.x);
            if (random.newIntBetween(0, 1) > 0.5)
                graphics.beginFill(0xD9CC3C);
            else
                graphics.beginFill(0x00ADA7);
            graphics.drawRect(0, 0, bounds.width, bounds.height);
            graphics.z = 0;
            world.tileGroup.add(graphics);
        }
    }
    game.world.sendToBack(world.tileGroup);
}

world.updateMap = function(){
    var coordinates = player.entity;
    var player_chunk_y = Math.floor(coordinates.y / specs.size / specs.chunk);
    var player_chunk_x = Math.floor(coordinates.x / specs.size / specs.chunk);
    var accepted = true;

    for(var x in maps){
        var mapCoordinates = maps[x].split(".");

        if(player_chunk_y == mapCoordinates[0] && player_chunk_x == mapCoordinates[1]){
            accepted = false;
            break;
        }
    }

    if(accepted){
        maps.push(player_chunk_y + "." + player_chunk_x);
        setTimeout(function(){
            world.createMap(player_chunk_y, player_chunk_x);
        }, 0);
    }
}

world.getChunks = function() {
    var player_chunk_y = Math.floor(player.entity.y / specs.size / specs.chunk);
    var player_chunk_x = Math.floor(player.entity.x / specs.size / specs.chunk);
    var coords = [];
    var chunks = {
        offsetX: 0,
        offsetY: 0,
        grid: []
    };
    for(var i=0; i<3*specs.chunk; i++) {
        chunks.grid[i] = new Array(specs.chunk * 3);
    }

    for (var y = player_chunk_x - 1; y < player_chunk_x + 2; y++) {
        for (var x = player_chunk_y - 1; x < player_chunk_y + 2; x++) {
            if (maps.indexOf(y + "." + x) >= 0) {
                coords.push({x: x, y: y});
            } else {
                coords.push({x: 0.5, y: 0.5});
            }
        }
    }
    var i = 0;
    var cnt = 0;
    for (var i in coords) {
        var coord = coords[i];
        random.setSeed(coord.x, coord.y);
        var xoff = (i % 3) * specs.chunk;
        var yoff = Math.floor(i/3) * specs.chunk;

        if (coord.x > 0 && coord.x < 1) {
            for (var y = 0; y < specs.chunk; y++) {
                for (var x = 0; x < specs.chunk; x++) {
                    chunks.grid[y + yoff][x + xoff] = 1;
                }
            }
            continue;
        }

        for (var y = 0; y < specs.chunk; y++) {
            for (var x = 0; x < specs.chunk; x++) {
                if (random.newIntBetween(0, 1) > 0.5)
                    chunks.grid[y + yoff][x + xoff] = 0;
                else
                    chunks.grid[y + yoff][x + xoff] = 1;
            }
        }
        ++i;
    }
}

world.update = function() {
    this.updateMap();
    //this.game.world.setBounds(windowWidth + player.position.x, windowHeight + player.position.y, windowWidth*2, windowHeight*2);
    //Move the tilesprite (fixed to camera) depending on the player's positiontile
    //Sprite.tilePosition.y = -camera.view.y;
}


module.exports = world;