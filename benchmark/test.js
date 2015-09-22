"use strict";

var FastBitSet = require("../FastBitSet.js");
var BitSet = require("bitset.js");
var Benchmark = require('benchmark');

function CreateBench() {
    console.log("starting bitmap creation benchmark");
    var b = new FastBitSet();
    var bs = new BitSet();
    for(var i = 0 ; i < 1024  ; i++) {
        b.add(3*i+5);
        bs = bs.set(3*i+5,true);
    }
    if(bs.cardinality() != b.size() ) throw "something is off";
    var suite = new Benchmark.Suite();
    // add tests
    var ms = suite.add('FastBitSet', function() {
        var b = new FastBitSet();
        for(var i = 0 ; i < 1024  ; i++) {
            b.add(3*i+5);
        }
        return b;
    }  )
    .add('BitSet', function() {
        var bs = new BitSet();
        for(var i = 0 ; i < 1024  ; i++) {
            bs = bs.set(3*i+5,true);
        }
        return bs;
    })
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
.run({ 'async': false });
}


function CardBench() {
    console.log("starting cardinality benchmark");
    var b = new FastBitSet();
    var bs = new BitSet();
    for(var i = 0 ; i < 1024  ; i++) {
        b.add(3*i+5);
        bs = bs.set(3*i+5,true);
    }
    if(bs.cardinality() != b.size() ) throw "something is off";
    var suite = new Benchmark.Suite();
    // add tests
    var ms = suite.add('FastBitSet', function() {
        return b.size();
    }  )
    .add('BitSet', function() {
        return bs.cardinality();
    })
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
.run({ 'async': false });
}

function QueryBench() {
    console.log("starting query benchmark");
    var b = new FastBitSet();
    var bs = new BitSet();
    for(var i = 0 ; i < 1024  ; i++) {
        b.add(3*i+5);
        bs = bs.set(3*i+5,true);
    }
    if(bs.cardinality() != b.size() ) throw "something is off";
    var suite = new Benchmark.Suite();
    // add tests
    var ms = suite.add('FastBitSet', function() {
        return b.has(122);
    }  )
    .add('BitSet', function() {
        return bs.get(122);
    })
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
.run({ 'async': false });
}


var main = function() {
    CardBench();
    CreateBench();
    QueryBench();
}

if (require.main === module) {
    main();
}

