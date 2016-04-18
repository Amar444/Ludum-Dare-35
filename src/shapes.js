var shapes = {};

shapes.item_weapon = function (sprite, size){
    //blade
    sprite.drawRect(size*0.4, 0, size*0.2,size);

    // crossguard
    sprite.drawRect(size*0.3, size*0.6, size*0.4,size*0.2);

}

shapes.item_armour = function (sprite, size){
    // shirt
    sprite.drawRect(size*0.2, size*0.1, size*0.6,size*0.8);
    var points = [];
    points.push(new Phaser.Point(size*0.2,size*0.1));
    points.push(new Phaser.Point(size*0.0,size*0.4));
    points.push(new Phaser.Point(size*0.2,size*0.4));
    sprite.drawTriangle(points);

    var points = [];
    points.push(new Phaser.Point(size*0.8,size*0.1));
    points.push(new Phaser.Point(size*1,size*0.4));
    points.push(new Phaser.Point(size*0.8,size*0.4));
    sprite.drawTriangle(points);

}

shapes.item_hat = function (sprite, size){
    sprite.drawRect(size*0.2, size*0.1, size*0.6, size*0.6);
    sprite.drawRect(size*0, size*0.6, size*1, size*0.2);

}


shapes.item_shield = function (sprite, size,color){
    sprite.drawCircle(size/2, size/2, size);
    sprite.drawRect(size*0.45, size*0, size*0.1,size*1);
    sprite.drawRect(size*0, size*0.45, size*1,size*0.1);

}



module.exports = shapes;