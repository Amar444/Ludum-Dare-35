var mobType = function(ai, texture, onContactCollisionHandler) {
    this.texture = texture;
    this.ai = ai;
    this.pathfindRange = 10;
    this.collisionHandler = onContactCollisionHandler;

    this.move = function(dx, dy) {
        if(this.entity.body == null){return}
        var nspeed = 100;
        this.entity.body.setZeroVelocity();

        if (dx != 0 && dy != 0) {
            nspeed = nspeed/Math.sqrt(2);
        }

        this.entity.body.moveDown(nspeed * dy);
        this.entity.body.moveRight(nspeed * dx);
    };
};


module.exports = mobType;
