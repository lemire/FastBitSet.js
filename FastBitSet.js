/**
 * FastBitSet.js : a fast bit set implementation in JavaScript.
 * (c) the authors
 * Licensed under the Apache License, Version 2.0.
 *
 * Speed-optimized BitSet implementation for modern browsers and JavaScript engines.
 *
 * Simple usage :
 *
 *  var b = new FastBitSet();// initially empty
 *         // will throw exception if typed arrays are not supported
 *  b.set(1);// add the value "1"
 *  b.get(1); // check that the value is present! (will return true)
 *
 */
 "use strict";

 // size in bits of the bitset (or nothing for default)
 // an exception is thrown if typed arrays are not supported
 function FastBitSet (size) {
 	size = typeof size !== 'undefined' ? size : this.WORD_SIZE;
 	this.count = ((size + this.WORD_SIZE - 1) / this.WORD_SIZE) | 0; // number of words in use
 	if(typeof Uint32Array === 'function') {
 	    this.words = new Uint32Array(this.count);
 	} else {
 	    console.log("Your JavaScript engine does not support typed arrays.");
 	    throw "Uint32Array unsupported";
 	}
 }

 FastBitSet.prototype.WORD_SIZE = 32|0;



 // Set the bit at index to true
 FastBitSet.prototype.set = function(index) {
 	if(this.count * this.WORD_SIZE <= index) {
 		this.resize(index)
 	}
 	this.words[(index / this.WORD_SIZE)|0] |= 1 << (index % this.WORD_SIZE);
 };

 // Set the bit at index to false
 FastBitSet.prototype.clear = function(index) {
 	if(this.count * this.WORD_SIZE <= index) {
 		this.resize(index)
 	}
 	this.words[(index / this.WORD_SIZE)|0] &= ~(1 << (index % this.WORD_SIZE));
 };

 // Return true if no bit is set
 FastBitSet.prototype.isEmpty = function(index) {
     for( var i = 0; i < this.count; i++) {
         if(this.words[i] !== 0) return false;
     }
     return true;
 };


 // Is the bit at index true or false? Returns a boolean
 FastBitSet.prototype.get = function(index) {
 	if(this.count * this.WORD_SIZE <= index) {
 		return false;
 	}
 	var mask = (1 << (index % this.WORD_SIZE))|0;
 	return (this.words[(index / this.WORD_SIZE)|0] & mask) !== 0;
 };

 // Resize the bitset so that we can write a value at index
 FastBitSet.prototype.resize = function(index) {
 	if(this.count * this.WORD_SIZE <= index) {
 		var newcount = (index + this.WORD_SIZE) / this.WORD_SIZE;
 		if(newcount < 1024) {
 			newcount = newcount * 2;
 		} else if(newcount < 4096){
 			newcount = 3 * newcount / 2;
 		} else {
 			newcount = 4 * newcount / 5;
 		}
 		var newwords = new Uint32Array(newcount);
 		newwords.set(this.words);
 		this.words = newwords;
 		this.count = newcount;
 	}
 };


 // fast function to compute the Hamming weight of a 32-bit unsigned integer
 FastBitSet.prototype.HammingWeight = function(x) {
     x = x | 0;
     x -= ((x >>> 1) & 0x55555555);
     var m2 = 0x33333333;
     x = (x & m2) + ((x >> 2) & m2);
     x = (x + (x >> 4)) & 0x0f0f0f0f;
     x += x >> 8; x += x >> 16;
     return x & 0x3f;
 }

 // How many set bits?
 FastBitSet.prototype.cardinality = function(index) {
     var answer = 0|0;
     for( var i = 0; i < this.count; i++) {
         answer += this.HammingWeight(this.words[i]);
     }
     return answer;
 };

module['exports'] = FastBitSet;
