var specs = require('specs')
var Deepwater = require('tiles/deepwater');
var Water = require('tiles/water');
var Grass = require('tiles/grass');
var Mud = require('tiles/mud');
var Stone = require('tiles/stone');
var Tile = require('tile')

class TileManager {

    constructor(){
        this.tiles = [];
    }

    createWithSimplex(x, y, chunk_y, chunk_x, simplex, world){
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
        if(typeof tile == "Grass"){

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

    create (chunk_y, chunk_x, tile){
        this.tiles[chunk_y][chunk_x].push(tile);
        tile.preRender();
        return tile;
    }
    getType(simplex) {
        if(simplex < -0.4)
            return true; //solid
        else if(simplex < -0.3)
            return false; //not solid
        else if(simplex < 0.4)
            return false; //not solid
        else if(simplex < 0.5)
            return false; //not solid
        else
            return true; //solid
        
    }

    getTilesInChunk(chunk_y, chunk_x){
        var foundTiles = [];
        return this.tiles[chunk_y][chunk_x];
    }

    remove(id){
        this.tiles.splice(id, 1);
    }
}


var tileManager = new TileManager();

module.exports = tileManager;