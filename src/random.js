var random = {};
var seed = 1815;

random.newSeed = function (new_seed){
    seed = new_seed;

}


random.newFloat = function () {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

random.newIntBetween = function (min, max) {
    return Math.round(random.newFloatBetween(min, max))
}

random.newFloatBetween = function (min, max) {
    var r = random.newFloat()
    return min + ((max - min) * r);
}

random.newPercentageSplit = function (number){
    var list = [];
    var count = 0;
    for(var i =0;i < number; i++){
        var n = random.newFloat() * 1000
        count += n;
        list.push(n);
    }
    var out = [];
    for(var i =0;i < number; i++){
        out.push((list[i] / count));
    }
    return out;


}


module.exports =  random;