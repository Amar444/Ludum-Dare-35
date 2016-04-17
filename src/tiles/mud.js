var Tile = require('../tile');

class Mud extends Tile{
    render(){
        this.graphics.beginFill(0x6F4242);
    }
}
module.exports = Mud;
