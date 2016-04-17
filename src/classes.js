var classes = {};

classes.get_random_class = function (include_hulk){
    var types = ["Melee","Magic","Range"];
  if(include_hulk == true){
      //types.push("Hulk")
  }
    return types[Math.floor(Math.random()* types.length)];

};

classes.calculate_modifier = function (character, stats){
    // Fighter
    // Wizard
    // Rogue
    // Ranger
    // Hulk
    if(character.type == "Melee"){
        stats.strength += 10
    }else if(character.type == "Magic"){
        stats.wisdom  += 10
    }else if(character.type == "Range"){
        stats.dexterity += 10
    }else if(character.type == "Hulk"){
        // Hulk is useless with a weapon
        if(character.weapon != -1){
            stats.strength += 30
        }else{
            // with weapon
            stats.strength = 5
        }
    }else{
        console.error("Unknown character type: ", character.type)
    }
    
    if(character.getWeapon() != null){
        if(character.getWeapon().affinity != character.type){
            stats.strength -= 5;
            stats.wisdom -= 5;
            stats.dexterity -= 5;
        }
    }else{
        stats.strength -= 10;
        stats.wisdom -= 10;
        stats.dexterity -= 10;
    }
    if(character.getArmour() != null){
        if(character.getArmour().affinity != character.type){
            stats.speed -= 5;
            stats.armour -= 3;
        }
    }else{
        // no armour
        stats.speed += 5
    }

    if(character.getShield() != null){
        if(character.getShield().affinity != character.type){
            stats.strength += 2;
            stats.armour -= 2;
        }
    }else{
        stats.strength += 5;
        stats.armour -= 5;
    }
    

    return stats;

};


module.exports = classes;