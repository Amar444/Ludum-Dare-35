var Tile = require('../tile');

class Grass extends Tile{
    render() {
        this.graphics.beginFill(0xFFB03B);
    }
}

module.exports = Grass;