var sound = {};
var mods = [];
var current = 0;

var vumeter = [];
var channels = [];
var mute_key ;
var music_player;


sound.modLoaded = function (key, data) {
    mods.push(key);

    var buffer = new Uint8Array(data);
    return buffer;

};

sound.preload = function(){
    game.load.script('protracker', '_plugins/ProTracker.js');
    game.load.binary('shampoo', 'protracker/shampoo.mod', sound.modLoaded, this);
    game.load.binary('macrocosm', 'protracker/macrocosm.mod', sound.modLoaded, this);
    game.load.binary('impulse', 'protracker/act_of_impulse.mod', sound.modLoaded, this);
    game.load.binary('enigma', 'protracker/enigma.mod', sound.modLoaded, this);
    game.load.binary('elysium', 'protracker/elysium.mod', sound.modLoaded, this);
    game.load.binary('stardust', 'protracker/sd-ingame1.mod', sound.modLoaded, this);
    game.load.binary('globaltrash', 'protracker/global_trash_3_v2.mod', sound.modLoaded, this);

};
sound.next_number = function (){
    current == mods.length - 1 ? current = 0 : current++;

    music_player.stop();
    music_player.clearsong();

    music_player.buffer = game.cache.getBinary(mods[current]);
    music_player.parse();
}

sound.create = function() {
    music_player = new Protracker();

    music_player.onReady = function() {
        // music_player.play();
    };
    music_player.buffer = game.cache.getBinary(mods[current]);

    music_player.parse();
    game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add(function (){
        sound.toggle_sound()
    }, this);

    game.input.keyboard.addKey(Phaser.Keyboard.N).onDown.add(function (){
        sound.next_number()
    }, this);
};

sound.toggle_sound = function () {
    if(music_player.playing){
        music_player.pause();
    }else{
        music_player.play();
    }
}

//module.play() has to be called from a callback

module.exports =  sound;
