var user_class = {};

var item = require('item');


user_class.random_mob = function (level){
    if(!isFinite(level) || level <= 0 || level > 10000){
        console.error("invalid level: ", level)
        throw "Level is invalid "
    }
    var u = user_class.new_user();
    var w = item.random_weapon(level);
    var a = item.random_armour(level);
    var s = item.random_shield(level);

    u.weapon = u.inventory.push(w) - 1;
    u.armour = u.inventory.push(a) - 1;
    u.shield = u.inventory.push(s) - 1;
    return u;

    
}
user_class.new_user = function (){
    var user = {};

    user.name = [];
    user.inventory = [];
    // from inventory
    user.weapon = -1;
    user.shield = -1;
    user.armour = -1;
    user.hat = -1;



    user.getStats = function () {
        var stats = {
            health: 10,
            speed: 10,
            strength: 10,
            stamina: 10,
            intelligence: 10,
            charisma: 10,
            wisdom: 10,
            willpower: 10,
            perception: 10,
            luck: 10
        }
        for(var k in stats){
            ["weapon","shield","armour","hat"].map(function (item){
                if(user[item] != -1){
                    var i = user.inventory[user[item]];
                    if(isFinite(i["mod_"+k])){
                        stats[k] += i["mod_"+k];
                    }else{
                        console.error("Missing weapon?")
                    }
                }
            })

        }
        return stats;


    }

    return user;
};


module.exports = user_class;