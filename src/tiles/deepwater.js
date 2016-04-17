var Tile = require('../tile');

class Deepwater extends Tile{
    render(){
        this.graphics.beginFill(0x468966);
        game.physics.p2.enable(this.graphics);
        this.graphics.body.static = true;
    }
}

module.exports = Deepwater;