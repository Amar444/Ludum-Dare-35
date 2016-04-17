var Tile = require('../tile');

class Stone extends Tile{
    render(){
        this.graphics.beginFill(0x5C4033);
        game.physics.p2.enable(this.graphics);
        this.graphics.body.static = true;
    }
}

module.exports = Stone;