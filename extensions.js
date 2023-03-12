Array.prototype.randomSample = function () {
    return this[Math.floor((Math.random()*this.length))];
}

String.prototype.randomSample = function (splitChr = "") {
    return this.split(splitChr).randomSample();
}

Number.prototype.toChr = function(sampleSet = null){
    var num = Math.round(this);
    const chrSet = sampleSet || "abcdefghijklmnopqrstuvwxz".split("");
    return chrSet[num % chrSet.length];
}