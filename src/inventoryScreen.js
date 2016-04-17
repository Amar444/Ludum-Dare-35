
var inventoryScreen = {};

inventoryScreen.preload = function(){

};
var itemSize = 32;
var group
var active = false
inventoryScreen.create = function() {
    game.input.keyboard.addKey(Phaser.Keyboard.I).onDown.add(function () {
        if(active == false){

            group = game.add.group();
            inventoryScreen.createInventory()
        }else{
            group.destroy();

        }
        active = !active;
    }, this);
}
inventoryScreen.createInventory = function() {
    var item;
    // Print grid
    var start = {x: itemSize*7, y:itemSize*5,w:5,h:5};
    var itemslots = {x: start.x-(2*itemSize), y: start.y,border:30, p:10,gx:7};

    var sprite = game.add.graphics(0, 0);
    sprite.beginFill(0x222222);
    sprite.drawRect(0, 0, itemSize*itemslots.gx,itemSize*itemslots.gx);
    item = group.create(game.world.centerX+1, game.world.centerY, sprite.generateTexture());
    sprite.destroy();
    item.fixedToCamera = true;

    item.cameraOffset.setTo(start.x, start.y);

    var types = {
        "Weapon": "weapon",
        "Armour": "armour",
        "Hat": "hat",
        "Shield": "shield"
    };

    var j = 0;
    var item_left_size = (itemslots.border + itemSize +10);
    for(var type in types) {
        var start_pos = itemslots.y + (item_left_size * j);




        var sprite = game.add.graphics(0, 0);
        sprite.beginFill(0x222222);
        sprite.drawRect(0, 0, itemSize + itemslots.border, itemSize + itemslots.border);
        sprite.beginFill(0x555555);
        sprite.drawRect(itemslots.border/2, itemslots.border/2, itemSize, itemSize);
        item = group.create(itemslots.x,start_pos, sprite.generateTexture());
        sprite.destroy();
        item.fixedToCamera = true;
        item.cameraOffset.setTo(itemslots.x,start_pos);


        var sprite = game.add.text(0,0, type, {font: "12px Arial", fill: "#ffffff"});
        var t =group.create(itemslots.x+10,start_pos+1, sprite.generateTexture());
        sprite.destroy()
        t.fixedToCamera = true;
        t.cameraOffset.setTo(itemslots.x+10,start_pos+1);
        j++;
    }

    for (var i = 0; i < 20; i++)
    {
        // Directly create sprites on the left group
        var sprite = game.add.graphics(0, 0);
        sprite.beginFill(0x222222);
        sprite.drawCircle(0, 0, itemSize);
        sprite.beginFill(0x1463ab);
        sprite.drawCircle(0, 0, itemSize-5);
        var item = group.create(0,0, sprite.generateTexture());

        item.fixedToCamera = true;
        var x = start.x+(Math.floor(i / itemslots.gx) *itemSize);
        var y = start.y+((i % itemslots.gx) *itemSize);
        item.cameraOffset.setTo(x,y);
        sprite.destroy();


        // Enable input detection, then it's possible be dragged.
        item.inputEnabled = true;

        // Make this item draggable.
        item.input.enableDrag();


        // item.input.enableSnap(itemSize, itemSize, false, true);

        // Limit drop location to only the 2 columns.
        (function (const_i){
            item.events.onDragStop.add(function (item) {
                console.log(const_i,item);
                var pos = item.cameraOffset;
                if(pos.x+itemSize > itemslots.x && pos.x+itemSize < (itemslots.x + item_left_size)){
                    if(pos.y > itemslots.y && pos.y < (itemslots.y + 4*item_left_size)){
                        var x = itemslots.x + itemslots.border/2;
                        var y = (Math.floor(pos.y / item_left_size) * item_left_size) + itemslots.border;

                        console.log(x,y);
                        item.cameraOffset.setTo(x, y);
                        return;

                    }

                }
                // reset
                var x = start.x+(Math.floor(const_i / itemslots.gx) *itemSize);
                var y = start.y+((const_i % itemslots.gx) *itemSize);
                console.log(x,y);
                item.cameraOffset.setTo(x,y);

            });

        })(i);

    }
};



inventoryScreen.render = function() {
    game.debug.text('Group Left.', 100, 560);
    game.debug.text('Group Right.', 280, 560);
};

inventoryScreen.update = function() {

};

module.exports = inventoryScreen;