

var tile = {};

tile.create = function(x, y, simplex, specs, world){
    var bounds = new Phaser.Rectangle(y * specs.size, x * specs.size, specs.size, specs.size);
    var graphics = game.add.graphics(bounds.y, bounds.x);
    var tile;

    if(simplex < -0.3){
        tile = tiles.water;
    } else if(simplex > 0.5) {
        tile = tiles.stone;
    } else if(simplex > 0.4 && simplex < 0.5){
        tile = tiles.mud;
    } else {
        tile = tiles.grass;
    }
    tile.render(graphics);

    graphics.drawRect((specs.size / 2) * - 1, (specs.size / 2) * - 1, bounds.width, bounds.height);
    graphics.z = 0;

    world.tileGroup.add(graphics);

    return graphics;
}

var tiles = {
    water: {
        render: function(graphics){
            graphics.beginFill(0x40a4df);
            game.physics.p2.enable(graphics);
            graphics.body.static = true;
        }
    },
    grass: {
        render: function(graphics) {
            graphics.beginFill(0x4DBD33);
        }
    },
    stone: {
        render: function(graphics){
            graphics.beginFill(0x5C4033);
            game.physics.p2.enable(graphics);
            graphics.body.static = true;
        }
    },
    mud: {
        render: function(graphics){
            graphics.beginFill(0x6F4242);
        }
    }
}
module.exports = tile