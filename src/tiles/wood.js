var Tile = require('../tile');

class Wood extends Tile{
    render(){
        this.graphics.beginFill(0x663300);
    }
}
module.exports = Wood;
