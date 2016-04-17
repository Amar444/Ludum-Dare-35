
var specs = require('specs')

class Tile {

    static create(x, y, simplex, world){
        var tile;
        switch(true){
            case(simplex < -0.4):
                tile = new Deepwater(x, y, simplex, world);
                break;
            case(simplex < -0.3):
                tile = new Water(x, y, simplex, world);
                break;
            case(simplex < 0.4):
                tile = new Grass(x, y, simplex, world);
                break;
            case(simplex < 0.5):
                tile = new Mud(x, y, simplex, world);
                break;
            default:
                tile = new Stone(x, y, simplex, world);
                break;
        }

        return tile;
    }

    constructor(x, y, simplex, world) {
        this.x = x;
        this.y = y;
        this.simplex = simplex;
        this.world = world;
    }

    preRender() {
        var bounds = new Phaser.Rectangle(this.y * specs.size, this.x * specs.size, specs.size, specs.size);
        var graphics = game.add.graphics(bounds.y, bounds.x);
        graphics = this.render(graphics);
        graphics.z = 0;
        graphics.drawRect((specs.size / 2) * - 1, (specs.size / 2) * - 1, bounds.width, bounds.height);
        this.world.tileGroup.add(graphics);
        return graphics;
    }
}

class Water extends Tile{
    render(graphics){
        graphics.beginFill(0x40a4df);
        return graphics;
    }
}

class Grass extends Tile{
    render(graphics) {
        graphics.beginFill(0x4DBD33);
        return graphics;
    }
}

class Mud extends Tile{
    render(graphics){
        graphics.beginFill(0x6F4242);
        return graphics;
    }
}

class Stone extends Tile{
    render(graphics){
        graphics.beginFill(0x5C4033);
        game.physics.p2.enable(graphics);
        graphics.body.static = true;
        return graphics;
    }
}

class Deepwater extends Tile{
    render(graphics){
        graphics.beginFill(0x2082bc);
        game.physics.p2.enable(graphics);
        graphics.body.static = true;
        return graphics;
    }
}

module.exports = Tile;