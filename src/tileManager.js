var specs = require('specs')

class TileManager {

    constructor(){
        this.tiles = [];
    }

    create(x, y, chunk_y, chunk_x, simplex, world){
        var tile;
        switch(true){
            case(simplex < -0.4):
                tile = new Deepwater(x, y, chunk_y, chunk_x, simplex, world);
                break;
            case(simplex < -0.3):
                tile = new Water(x, y, chunk_y, chunk_x, simplex, world);
                break;
            case(simplex < 0.4):
                tile = new Grass(x, y, chunk_y, chunk_x, simplex, world);
                break;
            case(simplex < 0.5):
                tile = new Mud(x, y, chunk_y, chunk_x, simplex, world);
                break;
            default:
                tile = new Stone(x, y, chunk_y, chunk_x, simplex, world);
                break;
        }
        if(this.tiles[chunk_y] == undefined){
            this.tiles[chunk_y] = [];
        }
        if(this.tiles[chunk_y][chunk_x] == undefined){
            this.tiles[chunk_y][chunk_x] = [];
        }
        this.tiles[chunk_y][chunk_x].push(tile);
        tile.preRender();
        return tile;
    }

    getType(simplex) {

        switch(true) {
            case(simplex < -0.4):
                return true; //solid
                break;
            case(simplex < -0.3):
                return false; //not solid
                break;
            case(simplex < 0.4):
                return false; //not solid
                break;
            case(simplex < 0.5):
                return false; //not solid
                break;
            default:
                return true; //solid
                break;
        }
    }


    getTilesInChunk(chunk_y, chunk_x){
        var foundTiles = [];
        return this.tiles[chunk_y][chunk_x];
    }

    remove(id){
        this.tiles.splice(id, 1);
    }
}

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

class Water extends Tile{
    render(){
        this.graphics.beginFill(0x40a4df);
    }
}

class Grass extends Tile{
    render() {
        this.graphics.beginFill(0x4DBD33);
    }
}

class Mud extends Tile{
    render(){
        this.graphics.beginFill(0x6F4242);
    }
}

class Stone extends Tile{
    render(){
        this.graphics.beginFill(0x5C4033);
        game.physics.p2.enable(this.graphics);
        this.graphics.body.static = true;
    }
}

class Deepwater extends Tile{
    render(){
        this.graphics.beginFill(0x2082bc);
        game.physics.p2.enable(this.graphics);
        this.graphics.body.static = true;
    }
}
var tileManager = new TileManager();

module.exports = tileManager;