 "use strict";

var FastBitSet = require("../FastBitSet.js");


function testSet() {
	console.log("Testing set/get/clear");
	var mb = new FastBitSet();
	var N = 1024;
	for(var i = 0  ; i < N ; i ++) {
	   mb.set(i);
	   if(!mb.get(i)) throw "set did not register";
	   if(mb.cardinality() != i+1) throw ("cardinality bug "+ i +" "+ mb.cardinality());
	   for(var j = 0 ; j <= i; j++) {
	     if(!mb.get(j)) throw "bad get";
	   }
	   for(var j = i+1 ; j < N; j++) {
	     if(mb.get(j)) throw "bad get";
	   }
	}
	for(var i = N - 1  ; i >= 0  ; i --) {
	   mb.clear(i);
	   if(mb.get(i)) throw "clear did not register";
	   if(mb.cardinality() != i) throw ("cardinality bug "+ i +" "+ mb.cardinality());
	   for(var j = 0 ; j < i; j++) {
	     if(!mb.get(j)) throw "bad get";
	   }
	   for(var j = i ; j < N; j++) {
	     if(mb.get(j)) throw "bad get";
	   }
	}
}

var main = function(){
    testSet();
}

if (require.main === module) {
    main();
}
