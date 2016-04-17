var Tile = require('../tile');

class Water extends Tile{
    render(){
        this.graphics.beginFill(0xFFE881);
    }
}
module.exports = Water;