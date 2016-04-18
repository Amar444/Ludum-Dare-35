var particles = {};
var emitter;
var emitter_splatter;

particles.preload = function () {
};

particles.create = function () {
    var sprite = game.add.graphics(0, 0);
    sprite.beginFill(0x444444);
    sprite.drawCircle(0, 0, 30);

    emitter = game.add.emitter(0, 0, 0);
    emitter.makeParticles(sprite.generateTexture());
    emitter.gravity = 0;

    emitter_splatter = game.add.emitter(0, 0, 0);

    sprite = game.add.graphics(0, 0);
    sprite.beginFill(0xFF0000);
    sprite.drawRect(0, 0, 25, 25);
    emitter_splatter.makeParticles(sprite.generateTexture());
    emitter_splatter.gravity = 0;
};

particles.explosion = function(x,y){
    emitter.x = x;
    emitter.y = y;

    emitter.setScale(0.01, 1, 0.01, 1, 500, Phaser.Easing.Quintic.Out);
    emitter.start(true, 500, null, 10);
}


particles.splatter = function(x,y){
    emitter_splatter.x = x;
    emitter_splatter.y = y;


    emitter_splatter.setScale(0.01, 0.3, 0.01, 0.3, 500, Phaser.Easing.Quintic.Out);
    emitter_splatter.start(true, 750, null, 10);
}

module.exports = particles;