var game = window.game;
var character = require('character');

var hud = {};
var healthBar;
var barWidth = 200;
var healthText;

hud.preload = function(){
};

hud.create = function() {
    hud.healthBarGroup = game.add.group();
    hud.healthBarGroup.fixedToCamera = true;
    hud.createHealthBar();
};

hud.render = function() {
    hud.updateHealthBar();
};

hud.update = function() {
};



hud.createHealthBar = function(){
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
