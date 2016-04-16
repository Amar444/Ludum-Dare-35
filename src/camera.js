var game = window.game;

var camera = {};

camera.render = function(){
    var zone = game.camera.deadzone;
    //game.context.fillStyle = 'rgba(255,0,0,0.6)';
    //game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
    game.debug.cameraInfo(game.camera, 32, 32);
}

module.exports = camera;