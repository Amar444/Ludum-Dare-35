var particles = {};
var emitter;

particles.preload = function () {
    // game.load.image('diamond', 'images/diamond.png');
    game.load.image('smoke', 'images/smoke-puff.png');
};

particles.create = function () {
    game.stage.backgroundColor = 0x337799;

    emitter = game.add.emitter(0, 0, 0);

    emitter.makeParticles('smoke');
    emitter.gravity = 0;
};


particles.explosion = function(x,y){
    emitter.x = x;
    emitter.y = y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst

    emitter.setScale(0.01, 0.1, 0.01, 0.1, 500, Phaser.Easing.Quintic.Out);
    emitter.start(true, 1000, null, 10);
}

module.exports = particles;