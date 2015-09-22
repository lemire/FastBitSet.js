 "use strict";

var FastBitSet = require("../FastBitSet.js");


function testSet() {
    console.log("Testing set/get/clear");
    var mb = new FastBitSet();
    var N = 1024;
    for(var i = 0  ; i < N ; i ++) {
        mb.add(i);
        if(!mb.has(i)) throw "set did not register";
        if(mb.size() != i+1) throw ("cardinality bug "+ i +" "+ mb.size());
        for(var j = 0 ; j <= i; j++) {
            if(!mb.has(j)) throw "bad get";
        }
        for(var j = i+1 ; j < N; j++) {
            if(mb.has(j)) throw "bad get";
        }
    }
    for(var i = N - 1  ; i >= 0  ; i --) {
        mb.remove(i);
        if(mb.has(i)) throw "clear did not register";
        if(mb.size() != i) throw ("cardinality bug "+ i +" "+ mb.size());
        for(var j = 0 ; j < i; j++) {
            if(!mb.has(j)) throw "bad get";
        }
        for(var j = i ; j < N; j++) {
            if(mb.has(j)) throw "bad get";
        }
    }
}

function testInit() {
    console.log("Testing init");
    var ai = [1,2,4,5,10];
    var mb = new FastBitSet(ai);
    if(mb.size() != ai.length) throw "bad init";
}
function arraysEquals(a, b) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

function testValues() {
    console.log("Testing values");
    var ai = [1,2,4,5,10];
    var mb = new FastBitSet(ai);
    var a = mb.array()
            if(!arraysEquals(a, ai)) throw "bad values";
    for (var i = 0; i < a.length; i ++) {
        if(!mb.has(a[i])) throw "bad enumeration";
    }
}


function testClone() {
    console.log("Testing clone");
    var ai = [1,2,4,5,10];
    var mb = new FastBitSet(ai);
    var mb2 = mb.clone();
    var a = mb2.array()
            if(!arraysEquals(a, ai)) throw "bad values";
    if(!mb.equals(mb2)) throw "bad clone";
}
function testString() {
    console.log("Testing string conversion");
    var mb = new FastBitSet([1,2,100,10000]);
    console.log(""+mb);
}

function testIntersection() {
    console.log("Testing intersection");
    var a1 = [1,2,4,5,10];
    var a2 = [1,2,4,5,10,100,1000];
    var mb1 = new FastBitSet(a1);
    var mb2 = new FastBitSet(a2);
    var pinter = mb1.intersection_size(mb2);
    mb1.intersection(mb2);
    if(pinter != mb1.size()) throw "bad size"
        var a = mb1.array();
    if(!arraysEquals(a, a1)) throw "bad values";
    var pinter = mb2.intersection_size(mb1);
    mb2.intersection(mb1);
    if(pinter != mb2.size()) throw "bad size"
        if(!mb1.equals(mb2)) throw "bad intersect";
}

function testDifference() {
    console.log("Testing difference");
    var a1 = [1,2,4,5,10];
    var a2 = [1,2,4,5,10,100,1000];
    var mb1 = new FastBitSet(a1);
    var mb2 = new FastBitSet(a2);
    mb1.difference(mb2);
    if(!mb1.isEmpty()) throw "bad diff";
    mb1 = new FastBitSet(a1);
    mb2.difference(mb1);
    if(mb2.size() != 2) throw "bad diff";
}

function testUnion() {
    console.log("Testing union");
    var a1 = [1,2,4,5,10];
    var a2 = [1,2,4,5,10,100,1000];
    var mb1 = new FastBitSet(a1);
    var mb2 = new FastBitSet(a2);
    var punion = mb1.union_size(mb2);
    mb1.union(mb2);
    if(punion != mb1.size()) throw "bad size";
    if(!mb1.equals(mb2)) throw "bad diff";
    mb1 = new FastBitSet(a1);
    var punion = mb2.union_size(mb1);
    mb2.union(mb1);
    if(punion != mb2.size()) throw "bad size";
    var a = mb2.array();
    if(!arraysEquals(a, a2)) throw "bad values";
}

var main = function() {
    testSet();
    testInit();
    testValues();
    testClone();
    testDifference();
    testIntersection();
    testUnion();
    testString();
    console.log("Hopefully, your code is ok.");
}

if (require.main === module) {
    main();
}
