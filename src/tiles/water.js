var Tile = require('../tile');

class Water extends Tile{
    render(){
        this.graphics.beginFill(0x40a4df);
    }
}
module.exports = Water;