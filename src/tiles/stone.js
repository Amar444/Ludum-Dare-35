var Tile = require('../tile');

class Stone extends Tile{
    render(){
        this.graphics.beginFill(0x8E2800);
        game.physics.p2.enable(this.graphics);
        this.graphics.body.static = true;
        this.graphics.body.setCollisionGroup(game.worldCollisionGroup);
        this.graphics.body.collides(game.allCollisionGroups);
    }
}

module.exports = Stone;