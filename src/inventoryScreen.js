
var inventoryScreen = {};
var shapes = require("shapes");
var character = require("character");
inventoryScreen.preload = function(){

};
var itemSize = 32;
var start = {x: itemSize*7, y:itemSize*5,w:5,h:5};
var itemslots = {x: start.x-(2*itemSize), y: start.y,border:30, p:10,gx:7};

var group
inventoryScreen.active = false;
inventoryScreen.create = function() {
    game.input.keyboard.addKey(Phaser.Keyboard.I).onDown.add(function () {
        if(inventoryScreen.active == false){

            group = game.add.group();
            inventoryScreen.createInventory()
            inventoryScreen.showStats()
        }else{
            group.destroy();

        }
        inventoryScreen.active = !inventoryScreen.active;
    }, this);
}
inventoryScreen.createInventory = function() {
    var user = character.getCurrentUser();
    var item;
    // Print grid

    // Background square
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
    // LOOP for the different equipment slots
    for(var type in types) {
        var start_pos = itemslots.y + (item_left_size * j);



        // Block
        var sprite = game.add.graphics(0, 0);
        sprite.beginFill(0x222222);
        sprite.drawRect(0, 0, itemSize + itemslots.border, itemSize + itemslots.border);
        sprite.beginFill(0x555555);
        item = group.create(itemslots.x,start_pos, sprite.generateTexture());
        sprite.destroy();
        item.fixedToCamera = true;
        item.cameraOffset.setTo(itemslots.x,start_pos);

        var sprite = game.add.graphics(0, 0);

        sprite.beginFill(0x444444);
        sprite.drawRect(0, 0, itemSize, itemSize);

        sprite.beginFill(0x777777);
        if(types[type] == "weapon"){
            shapes.item_weapon(sprite, itemSize)
        }else if(types[type] == "armour"){
            shapes.item_armour(sprite,itemSize)
        }else if(types[type] == "hat"){
            shapes.item_hat(sprite,itemSize);
        }else if(types[type] == "shield"){
            shapes.item_shield(sprite,itemSize,0x666666)
        }
        item = group.create(itemslots.x,start_pos, sprite.generateTexture());
        sprite.destroy();
        item.fixedToCamera = true;
        item.cameraOffset.setTo(itemslots.x+itemslots.border/2,start_pos+itemslots.border/2);

        // Text in block
        var sprite = game.add.text(0,0, type, {font: "12px Arial", fill: "#ffffff"});
        var t =group.create(itemslots.x+10,start_pos, sprite.generateTexture());
        sprite.destroy()
        t.fixedToCamera = true;
        t.cameraOffset.setTo(itemslots.x+10,start_pos);
        j++;
    }

    for (var i in user.inventory)
    {
        // Directly create sprites on the left group
        var sprite = game.add.graphics(0, 0);
        sprite.beginFill(0x444444);
        sprite.drawRect(0, 0, itemSize,itemSize);

        if(user.inventory[i].type == "weapon"){
            sprite.beginFill(0xffff00);
            shapes.item_weapon(sprite, itemSize)
        }else if(user.inventory[i].type == "armour"){
            sprite.beginFill(0x00ff00);
            shapes.item_armour(sprite,itemSize)
        }else if(user.inventory[i].type == "hat"){
            sprite.beginFill(0x0000ff);
            shapes.item_hat(sprite,itemSize);
        }else if(user.inventory[i].type == "shield"){
            sprite.beginFill(0xffff00);
            shapes.item_shield(sprite,itemSize,0xff0000)
        }else {
            sprite.beginFill(0x222222);
        }


        var item = group.create(0,0, sprite.generateTexture());

        item.fixedToCamera = true;
        var was_found = false;
        var j = 0
        for(var type in types) {
            var type_name = types[type];
            if(user[type_name] == i) {
                var start_pos = itemslots.y + (item_left_size * j);
                var x = itemslots.x+itemslots.border/2
                var y = start_pos+itemslots.border/2;
                item.cameraOffset.setTo(x,y);
                was_found = true;
            }
            j++;
        }
        if(was_found == false){
            var x = start.x+(Math.floor(i / itemslots.gx) *itemSize);
            var y = start.y+((i % itemslots.gx) *itemSize);
            item.cameraOffset.setTo(x,y);
        }

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
                var count = 0;
                for(var type in types) {
                    if(user.inventory[parseInt(const_i)].type == types[type]){
                        if (pos.x + itemSize > itemslots.x && pos.x + itemSize < (itemslots.x + item_left_size)) {
                            if (pos.y > (itemslots.y + (count * item_left_size)) && pos.y < (itemslots.y + ((count+1) * item_left_size))) {
                                var x = itemslots.x + itemslots.border / 2;
                                var y = (count * item_left_size) +itemslots.y + itemslots.border/2;


                                user[types[type]] = parseInt(const_i)
                                item.cameraOffset.setTo(x, y);
                                inventoryScreen.showStats()
                                return;


                            }

                        }
                        user[types[type]] = -1;
                        inventoryScreen.showStats()
                    }
                    count++;
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

inventoryScreen.showStats = function (){
    var user = character.getCurrentUser();
    var item;
    var startx = start.x+ 20 + (itemSize*itemslots.gx);
    var starty = start.y;
    // Print grid

    // Background square
    var sprite = game.add.graphics(0, 0);
    sprite.beginFill(0x222222);
    sprite.drawRect(0, 0, itemSize*itemslots.gx,itemSize*itemslots.gx);
    item = group.create(game.world.centerX+1, game.world.centerY, sprite.generateTexture());
    sprite.destroy();
    item.fixedToCamera = true;

    item.cameraOffset.setTo(start.x+ 20 + (itemSize*itemslots.gx), start.y);
    function printText(title,text,id){
        var sprite = game.add.text(0,0, title + ": "+text, {font: "12px Arial", fill: "#ffffff"});
        var t =group.create(0,0, sprite.generateTexture());
        sprite.destroy()
        t.fixedToCamera = true;
        t.cameraOffset.setTo(startx+10,starty+10 + (id*12));
    }

    var line = 0;
    // printText("Name",user.name,line++);
    printText("Class",user.type,line++);
    var stats = user.getStats();
    for(var t in stats){
        printText(t,stats[t],line++);
    }



};



inventoryScreen.render = function() {
    game.debug.text('Group Left.', 100, 560);
    game.debug.text('Group Right.', 280, 560);
};

inventoryScreen.update = function() {

};

module.exports = inventoryScreen;