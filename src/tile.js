var specs = require('specs')

class Tile {
    constructor(x, y, simplex, world) {
        this.x = x;
        this.y = y;
        this.simplex = simplex;

        if(this.simplex < -0.3){
            this.type = new water();
        } else if(this.simplex > 0.5) {
            this.type = new stone();
        } else if(this.simplex > 0.4 && this.simplex < 0.5){
            this.type = new mud();
        } else {
            this.type = new grass();
        }
        this.world = world;

    }

    render() {
        var bounds = new Phaser.Rectangle(this.y * specs.size, this.x * specs.size, specs.size, specs.size);
        var graphics = game.add.graphics(bounds.y, bounds.x);

        graphics.drawRect((specs.size / 2) * - 1, (specs.size / 2) * - 1, bounds.width, bounds.height);
        graphics.z = 0;

        graphics = this.type.render(graphics);

        this.world.tileGroup.add(graphics);

        return graphics;
    }
}

class water{
    render(graphics){
        graphics.beginFill(0x40a4df);
        game.physics.p2.enable(graphics);
        graphics.body.static = true;
        return graphics;
    }
}

class grass{
    render(graphics) {
        graphics.beginFill(0x4DBD33);
        return graphics;
    }
}

class mud{
    render(graphics){
        graphics.beginFill(0x6F4242);
        return graphics;
    }

}

class stone{
    render(graphics){
        graphics.beginFill(0x5C4033);
        game.physics.p2.enable(graphics);
        graphics.body.static = true;
        return graphics;
    }
}

module.exports = Tile;