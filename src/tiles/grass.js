var Tile = require('../tile');

class Grass extends Tile{
    render() {
        this.graphics.beginFill(0x4DBD33);
    }
}

module.exports = Grass;