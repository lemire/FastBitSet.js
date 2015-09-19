// "use strict";

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

var main = function(){
  testSet();
  testInit();
  testValues();
  console.log("Hopefully, your code is ok.");
}

if (require.main === module) {
    main();
}
