var game = window.game;
var character = require('character');
var sound = require('sound');
var inventory = require('inventoryScreen');

var hud = {};
var healthBar;
var barWidth = 200;
var healthText;
var characterTypeDisplay;
var muteButton;
var inventoryButton;

hud.preload = function(){
    game.load.image('speakerSound', 'images/sound-on.png');
    game.load.image('speakerMute', 'images/sound-mute.png');
    game.load.image('knapsack', 'images/knapsack.png');
};

hud.create = function() {
    hud.createHealthBar();
    hud.createCharacterTypeDisplay();
    hud.createMuteButton();
    hud.createInventoryButton();
};

hud.render = function() {
    hud.updateHealthBar();
    hud.updateCharacterType();
};

hud.update = function() {
};

//INVENTORYBUTTON
hud.createInventoryButton = function(){
    //make group
    hud.inventoryButtonGroup = game.add.group();
    hud.inventoryButtonGroup.fixedToCamera = true;

    //make muteButtonGroup
    inventoryButton = game.add.button(game.width - 60, game.height - 60, 'knapsack', toggleInventory, this);

    //Add to group
    hud.inventoryButtonGroup.add(inventoryButton);
};
function toggleInventory(){
    inventory.toggle_inventory();
}

//MUTEBUTTON
hud.createMuteButton = function() {
    //make group
    hud.muteButtonGroup = game.add.group();
    hud.muteButtonGroup.fixedToCamera = true;

    //make muteButtonGroup
    muteButton = game.add.button(game.width - 60, 0, 'speakerMute', toggleSound, this);

    //Add to group
    hud.muteButtonGroup.add(muteButton);
};
hud.updateMuteButton = function(){
    if(sound.sound_enabled){
        //button image speakerSound
        button.loadTexture('speakerSound');
    }else {
        //button image speakerMute
        button.loadTexture('speakerMute');
    }
};
function toggleSound () {
    sound.toggle_mute();
    hud.updateMuteButton();
}


//CHARACTERTYPE
hud.createCharacterTypeDisplay = function(){
    //make group
    hud.characterTypeGroup = game.add.group();
    hud.characterTypeGroup.fixedToCamera = true;

    //make textfield
    characterTypeDisplay = game.add.text(10, 30, character.getCurrentUser().type , { fontSize: '20px', fill: '#FFF' });

    //add to group
    hud.characterTypeGroup.add(characterTypeDisplay);
};
hud.updateCharacterType = function() {
    characterTypeDisplay.text = character.getCurrentUser().type;
};

//HEALTHBAR
hud.createHealthBar = function(){
    //make group
    hud.healthBarGroup = game.add.group();
    hud.healthBarGroup.fixedToCamera = true;

    //make healthbar
    var backgroundBar = game.add.graphics(10, 10);
    healthBar = game.add.graphics(10, 10);
    healthText = game.add.text(15, 11, '', { fontSize: '16px', fill: '#FFF' });

    backgroundBar.beginFill(0x000000);          //fill color
    backgroundBar.lineStyle(2, 0x000000, 1);    //border color
    backgroundBar.drawRect(0, 0, barWidth, 20);

    healthBar.beginFill(0xFF0000);          //fill color
    healthBar.lineStyle(1, 0x000000, 1);    //border color
    healthBar.drawRect(0, 0, hud.getBarPercentage(), 20);

    healthBar.width; //if removed healthbar gets fucked up

    //add healthbar to group
    hud.healthBarGroup.add(backgroundBar);
    hud.healthBarGroup.add(healthBar);
    hud.healthBarGroup.add(healthText);
};
hud.updateHealthBar = function(){
    if(hud.getUserStats().health >= 0){
        healthText.text = hud.getUserStats().health + "/" + hud.getUserStats().maxHealth + " hp";
        healthBar.width = hud.getBarPercentage();
    }
};
hud.getHealthPercentage = function(){
    return (hud.getUserStats().health * 100) / hud.getUserStats().maxHealth;
};
hud.getBarPercentage = function(){
    return(hud.getHealthPercentage() * barWidth) / 100;
};
hud.getUserStats = function(){
    return character.getCurrentUser().getStats();
};

module.exports = hud;
