var mobType = function(ai, texture) {
    this.texture = texture;
    this.ai = ai;
    this.pathfindRange = 10;

    this.move = function(dx, dy) {
        var nspeed = 200;
        this.entity.body.setZeroVelocity();

        if (dx != 0 && dy != 0) {
            nspeed = nspeed/Math.sqrt(2);
        }

        this.entity.body.moveDown(nspeed * dy);
        this.entity.body.moveRight(nspeed * dx);
    };
};


module.exports = mobType;
