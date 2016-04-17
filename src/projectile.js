var game = window.game;

projectile.PROJECTILE_COOLDOWN = 200;
projectile.PROJECTILE_SPEED = 600;
projectile.PROJECTILE_DAMAGE = 0;

function projectile(velocity, damageValue, cooldownTime, texture, collideGroups, collisionHandler){
    this.cooldown = false;
    this.velocity = velocity != undefined ? velocity : projectile.PROJECTILE_SPEED;
    this.damageValue = damageValue != undefined ? damageValue : projectile.PROJECTILE_DAMAGE;
    this.cooldownTime = cooldownTime != undefined ? cooldownTime : projectile.PROJECTILE_COOLDOWN;
    this.texture = texture != undefined ? texture : projectile.DEFAULT_TEXTURE;
    this.collideGroups = collideGroups;
    this.collisionHandler = collisionHandler;
}

projectile.preload = function(){
    var defaultSprite = game.add.graphics();
    defaultSprite.beginFill(0x000000);
    defaultSprite.drawCircle(0,0, 7);
    defaultSprite.beginFill(0xEDBE00);
    defaultSprite.drawCircle(0,0, 5);
    this.DEFAULT_TEXTURE = defaultSprite.generateTexture();
    defaultSprite.destroy();
};

module.exports = projectile;