var particles = {};
var emitter;
var emitter_splatter;

particles.preload = function () {
    // game.load.image('diamond', 'images/diamond.png');
    game.load.image('smoke', 'images/smoke-puff.png');
    game.load.image('splatter', 'images/splatter.png');
};

particles.create = function () {
    emitter = game.add.emitter(0, 0, 0);
    emitter.makeParticles('smoke');
    emitter.gravity = 0;
    emitter_splatter = game.add.emitter(0, 0, 0);
    emitter_splatter.makeParticles('splatter');
    emitter_splatter.gravity = 0;
};


particles.explosion = function(x,y){
    emitter.x = x;
    emitter.y = y;


    emitter.makeParticles('smoke');
    emitter.setScale(0.01, 1, 0.01, 1, 500, Phaser.Easing.Quintic.Out);
    emitter.start(true, 1000, null, 10);
}


particles.splatter = function(x,y){
    emitter_splatter.x = x;
    emitter_splatter.y = y;


    emitter_splatter.setScale(0.01, 0.3, 0.01, 0.3, 500, Phaser.Easing.Quintic.Out);
    emitter_splatter.start(true, 500, null, 3);
}

module.exports = particles;