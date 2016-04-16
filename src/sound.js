var sound = {};
var mods = [];
var current = 0;

var vumeter = [];
var channels = [];
var mute_key ;
var music_player;
var fx;


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
    game.load.audio('sfx', 'effects/fx_mixdown.ogg');

};
sound.next_number = function (){
    current == mods.length - 1 ? current = 0 : current++;

    music_player.stop();
    music_player.clearsong();

    music_player.buffer = game.cache.getBinary(mods[current]);
    music_player.parse();
}

sound.create = function() {
    // Sound effects
    fx = game.add.audio('sfx');
    fx.allowMultiple = true;
    fx.addMarker('alien death', 1, 1.0);
    fx.addMarker('boss hit', 3, 0.5);
    fx.addMarker('escape', 4, 3.2);
    fx.addMarker('meow', 8, 0.5);
    fx.addMarker('numkey', 9, 0.1);
    fx.addMarker('ping', 10, 1.0);
    fx.addMarker('death', 12, 4.2);
    fx.addMarker('shot', 17, 1.0);
    fx.addMarker('squit', 19, 0.3);


    // Music
    music_player = new Protracker();
    var first = true
    music_player.onReady = function() {
        if(first){
            first = false
        }else{
            music_player.play();
        }
    };
    music_player.buffer = game.cache.getBinary(mods[current]);

    music_player.parse();
    game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add(function (){
        sound.toggle_sound()
    }, this);

    game.input.keyboard.addKey(Phaser.Keyboard.N).onDown.add(function (){
        sound.next_number()
    }, this);

    game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(function (){
        sound.play_effect("shot")
    }, this);
    game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(function (){
        sound.play_effect("boss hit")
    }, this);
};

//Options:  alien death,boss hit,escape,meow,numkey,ping,death,shot,squit
sound.play_effect = function (name) {
    fx.play(name);
};


sound.toggle_sound = function () {
    if(music_player.playing){
        music_player.pause();
    }else{
        music_player.play();
    }
}

module.exports =  sound;
