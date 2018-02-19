/**
 * FastBitSet.js : a fast bit set implementation in JavaScript.
 * (c) the authors
 * Licensed under the Apache License, Version 2.0.
 *
 * Speed-optimized BitSet implementation for modern browsers and JavaScript engines.
 *
 * A BitSet is an ideal data structure to implement a Set when values being stored are
 * reasonably small integers. It can be orders of magnitude faster than a generic set implementation.
 * The FastBitSet implementation optimizes for speed, leveraging commonly available features
 * like typed arrays.
 *
 * Simple usage :
 *  // var FastBitSet = require("fastbitset");// if you use node
 *  var b = new FastBitSet();// initially empty
 *  b.add(1);// add the value "1"
 *  b.has(1); // check that the value is present! (will return true)
 *  b.add(2);
 *  console.log(""+b);// should display {1,2}
 *  b.add(10);
 *  b.array(); // would return [1,2,10]
 *
 *  var c = new FastBitSet([1,2,3,10]); // create bitset initialized with values 1,2,3,10
 *  c.difference(b); // from c, remove elements that are in b
 *  var su = c.union_size(b);// compute the size of the union (bitsets are unchanged)
 * c.union(b); // c will contain all elements that are in c and b
 * var s1 = c.intersection_size(b);// compute the size of the intersection (bitsets are unchanged)
 * c.intersection(b); // c will only contain elements that are in both c and b
 * c = b.clone(); // create a (deep) copy of b and assign it to c.
 * c.equals(b); // check whether c and b are equal
 *
 *   See README.md file for a more complete description.
 *
 * You can install the library under node with the command line
 *   npm install fastbitset
 */
'use strict';

function isIterable(obj) {
  if (obj == null) {
    return false;
  }
  return obj[Symbol.iterator] !== undefined;
}

// you can provide an iterable
function FastBitSet(iterable) {
  this.words = []
  if (isIterable(iterable)) {
    for (var key of iterable) {
      this.add(key);
    }
  }
}

// Add the value (Set the bit at index to true)
FastBitSet.prototype.add = function(index) {
  this.resize(index);
  this.words[index >>> 5] |= 1 << index ;
};

// If the value was not in the set, add it, otherwise remove it (flip bit at index)
FastBitSet.prototype.flip = function(index) {
  this.resize(index);
  this.words[index >>> 5] ^= 1 << index ;
};

// Remove all values, reset memory usage
FastBitSet.prototype.clear = function() {
  this.words = []
};

// Set the bit at index to false
FastBitSet.prototype.remove = function(index) {
  this.resize(index);
  this.words[index  >>> 5] &= ~(1 << index);
};

// Return true if no bit is set
FastBitSet.prototype.isEmpty = function(index) {
  var c = this.words.length;
  for (var  i = 0; i < c; i++) {
    if (this.words[i] !== 0) return false;
  }
  return true;
};

// Is the value contained in the set? Is the bit at index true or false? Returns a boolean
FastBitSet.prototype.has = function(index) {
  return (this.words[index  >>> 5] & (1 << index)) !== 0;
};

// Tries to add the value (Set the bit at index to true), return 1 if the
// value was added, return 0 if the value was already present
FastBitSet.prototype.checkedAdd = function(index) {
  this.resize(index);
  var word = this.words[index  >>> 5]
  var newword = word | (1 << index)
  this.words[index >>> 5] = newword
  return (newword ^ word) >>> index
};


// Reduce the memory usage to a minimum
FastBitSet.prototype.trim = function(index) {
  var nl = this.words.length
  while ((nl > 0) && (this.words[nl - 1] === 0)) {
      nl--;
  }
  this.words = this.words.slice(0,nl);
};


// Resize the bitset so that we can write a value at index
FastBitSet.prototype.resize = function(index) {
  var count = (index + 32) >>> 5;// just what is needed
  for(var i = this.words.length; i < count; i++) this.words[i] = 0;
};

// fast function to compute the Hamming weight of a 32-bit unsigned integer
FastBitSet.prototype.hammingWeight = function(v) {
  v -= ((v >>> 1) & 0x55555555);// works with signed or unsigned shifts
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
};


// fast function to compute the Hamming weight of four 32-bit unsigned integers
FastBitSet.prototype.hammingWeight4 = function(v1,v2,v3,v4) {
  v1 -= ((v1 >>> 1) & 0x55555555);// works with signed or unsigned shifts
  v2 -= ((v2 >>> 1) & 0x55555555);// works with signed or unsigned shifts
  v3 -= ((v3 >>> 1) & 0x55555555);// works with signed or unsigned shifts
  v4 -= ((v4 >>> 1) & 0x55555555);// works with signed or unsigned shifts

  v1 = (v1 & 0x33333333) + ((v1 >>> 2) & 0x33333333);
  v2 = (v2 & 0x33333333) + ((v2 >>> 2) & 0x33333333);
  v3 = (v3 & 0x33333333) + ((v3 >>> 2) & 0x33333333);
  v4 = (v4 & 0x33333333) + ((v4 >>> 2) & 0x33333333);

  v1 = v1 + (v1 >>> 4) & 0xF0F0F0F;
  v2 = v2 + (v2 >>> 4) & 0xF0F0F0F;
  v3 = v3 + (v3 >>> 4) & 0xF0F0F0F;
  v4 = v4 + (v4 >>> 4) & 0xF0F0F0F;
  return (( (v1 + v2 + v3 + v4) * 0x1010101) >>> 24);
};

// How many values stored in the set? How many set bits?
FastBitSet.prototype.size = function() {
  var answer = 0;
  var c = this.words.length;
  var w = this.words;
  var i = 0;
  for (; i < c; i++) {
    answer += this.hammingWeight(w[i]);
  }
  return answer;
};

// Return an array with the set bit locations (values)
FastBitSet.prototype.array = function() {
  var answer = new Array(this.size());
  var pos = 0 | 0;
  var c = this.words.length;
  for (var k = 0; k < c; ++k) {
    var w =  this.words[k];
    while (w != 0) {
      var t = w & -w;
      answer[pos++] = (k << 5) + this.hammingWeight((t - 1) | 0);
      w ^= t;
    }
  }
  return answer;
};


// Return an array with the set bit locations (values)
FastBitSet.prototype.forEach = function(fnc) {
  var c = this.words.length;
  for (var k = 0; k < c; ++k) {
    var w =  this.words[k];
    while (w != 0) {
      var t = w & -w;
      fnc((k << 5) + this.hammingWeight((t - 1) | 0));
      w ^= t;
    }
  }
};

// Creates a copy of this bitmap
FastBitSet.prototype.clone = function() {
  var clone = Object.create(FastBitSet.prototype);
  clone.words = this.words.slice();
  return clone;
};

// Check if this bitset intersects with another one,
// no bitmap is modified
FastBitSet.prototype.intersects = function(otherbitmap) {
  var newcount = Math.min(this.words.length,otherbitmap.words.length);
  for (var k = 0 | 0; k < newcount; ++k) {
    if ((this.words[k] & otherbitmap.words[k]) !== 0) return true;
  }
  return false;
};

// Computes the intersection between this bitset and another one,
// the current bitmap is modified  (and returned by the function)
FastBitSet.prototype.intersection = function(otherbitmap) {
  var newcount = Math.min(this.words.length,otherbitmap.words.length);
  var k = 0 | 0;
  for (; k + 7 < newcount; k += 8) {
    this.words[k] &= otherbitmap.words[k];
    this.words[k + 1] &= otherbitmap.words[k + 1];
    this.words[k + 2] &= otherbitmap.words[k + 2];
    this.words[k + 3] &= otherbitmap.words[k + 3];
    this.words[k + 4] &= otherbitmap.words[k + 4];
    this.words[k + 5] &= otherbitmap.words[k + 5];
    this.words[k + 6] &= otherbitmap.words[k + 6];
    this.words[k + 7] &= otherbitmap.words[k + 7];
  }
  for (; k < newcount; ++k) {
    this.words[k] &= otherbitmap.words[k];
  }
  var c = this.words.length;
  for (var k = newcount; k < c; ++k) {
    this.words[k] = 0;
  }
  return this;
};

// Computes the size of the intersection between this bitset and another one
FastBitSet.prototype.intersection_size = function(otherbitmap) {
  var newcount = Math.min(this.words.length,otherbitmap.words.length);
  var answer = 0 | 0;
  for (var k = 0 | 0; k < newcount; ++k) {
    answer += this.hammingWeight(this.words[k] & otherbitmap.words[k]);
  }

  return answer;
};

// Computes the intersection between this bitset and another one,
// a new bitmap is generated
FastBitSet.prototype.new_intersection = function(otherbitmap) {
  var answer = Object.create(FastBitSet.prototype);
  var count = Math.min(this.words.length,otherbitmap.words.length);
  answer.words = new Array(count);
  var c = count;
  var k = 0 | 0;
  for (; k + 7  < c; k += 8) {
      answer.words[k] = this.words[k] & otherbitmap.words[k];
      answer.words[k+1] = this.words[k+1] & otherbitmap.words[k+1];
      answer.words[k+2] = this.words[k+2] & otherbitmap.words[k+2];
      answer.words[k+3] = this.words[k+3] & otherbitmap.words[k+3];
      answer.words[k+4] = this.words[k+4] & otherbitmap.words[k+4];
      answer.words[k+5] = this.words[k+5] & otherbitmap.words[k+5];
      answer.words[k+6] = this.words[k+6] & otherbitmap.words[k+6];
      answer.words[k+7] = this.words[k+7] & otherbitmap.words[k+7];
  }
  for (; k < c; ++k) {
    answer.words[k] = this.words[k] & otherbitmap.words[k];
  }
  return answer;
};

// Computes the intersection between this bitset and another one,
// the current bitmap is modified
FastBitSet.prototype.equals = function(otherbitmap) {
  var mcount = Math.min(this.words.length , otherbitmap.words.length);
  for (var k = 0 | 0; k < mcount; ++k) {
    if (this.words[k] != otherbitmap.words[k]) return false;
  }
  if (this.words.length < otherbitmap.words.length) {
    var c = otherbitmap.words.length;
    for (var k = this.words.length; k < c; ++k) {
      if (otherbitmap.words[k] != 0) return false;
    }
  } else if (otherbitmap.words.length < this.words.length) {
    var c = this.words.length;
    for (var k = otherbitmap.words.length; k < c; ++k) {
      if (this.words[k] != 0) return false;
    }
  }
  return true;
};

// Computes the difference between this bitset and another one,
// the current bitset is modified (and returned by the function)
FastBitSet.prototype.difference = function(otherbitmap) {
  var newcount = Math.min(this.words.length,otherbitmap.words.length);
  var k = 0 | 0;
  for (; k + 7 < newcount; k += 8) {
    this.words[k] &= ~otherbitmap.words[k];
    this.words[k + 1] &= ~otherbitmap.words[k + 1];
    this.words[k + 2] &= ~otherbitmap.words[k + 2];
    this.words[k + 3] &= ~otherbitmap.words[k + 3];
    this.words[k + 4] &= ~otherbitmap.words[k + 4];
    this.words[k + 5] &= ~otherbitmap.words[k + 5];
    this.words[k + 6] &= ~otherbitmap.words[k + 6];
    this.words[k + 7] &= ~otherbitmap.words[k + 7];
  }
  for (; k < newcount; ++k) {
    this.words[k] &= ~otherbitmap.words[k];
  }
  return this;
};

// Computes the size of the difference between this bitset and another one
FastBitSet.prototype.difference_size = function(otherbitmap) {
  var newcount = Math.min(this.words.length,otherbitmap.words.length);
  var answer = 0 | 0;
  var k = 0 | 0;
  for (; k < newcount; ++k) {
    answer += this.hammingWeight(this.words[k] & (~otherbitmap.words[k]));
  }
  var c = this.words.length;
  for (; k < c; ++k) {
    answer += this.hammingWeight(this.words[k]);
  }
  return answer;
};

// Returns a string representation
FastBitSet.prototype.toString = function() {
  return '{' + this.array().join(',') + '}';
};

// Computes the union between this bitset and another one,
// the current bitset is modified  (and returned by the function)
FastBitSet.prototype.union = function(otherbitmap) {
  var mcount = Math.min(this.words.length,otherbitmap.words.length);
  var k = 0 | 0;
  for (; k + 7  < mcount; k += 8) {
    this.words[k] |= otherbitmap.words[k];
    this.words[k + 1] |= otherbitmap.words[k + 1];
    this.words[k + 2] |= otherbitmap.words[k + 2];
    this.words[k + 3] |= otherbitmap.words[k + 3];
    this.words[k + 4] |= otherbitmap.words[k + 4];
    this.words[k + 5] |= otherbitmap.words[k + 5];
    this.words[k + 6] |= otherbitmap.words[k + 6];
    this.words[k + 7] |= otherbitmap.words[k + 7];
  }
  for (; k < mcount; ++k) {
    this.words[k] |= otherbitmap.words[k];
  }
  if (this.words.length < otherbitmap.words.length) {
    this.resize((otherbitmap.words.length  << 5) - 1);
    var c = otherbitmap.words.length;
    for (var k = mcount; k < c; ++k) {
      this.words[k] = otherbitmap.words[k];
    }
  }
  return this;
};

FastBitSet.prototype.new_union = function(otherbitmap) {
  var answer = Object.create(FastBitSet.prototype);
  var count = Math.max(this.words.length,otherbitmap.words.length);
  answer.words = new Array(count);
  var mcount = Math.min(this.words.length,otherbitmap.words.length)
  var k = 0;
  for (; k + 7  < mcount; k += 8) {
      answer.words[k] = this.words[k] | otherbitmap.words[k];
      answer.words[k+1] = this.words[k+1] | otherbitmap.words[k+1];
      answer.words[k+2] = this.words[k+2] | otherbitmap.words[k+2];
      answer.words[k+3] = this.words[k+3] | otherbitmap.words[k+3];
      answer.words[k+4] = this.words[k+4] | otherbitmap.words[k+4];
      answer.words[k+5] = this.words[k+5] | otherbitmap.words[k+5];
      answer.words[k+6] = this.words[k+6] | otherbitmap.words[k+6];
      answer.words[k+7] = this.words[k+7] | otherbitmap.words[k+7];
  }
  for (; k < mcount; ++k) {
      answer.words[k] = this.words[k] | otherbitmap.words[k];
  }
  var c = this.words.length;
  for (var k = mcount; k < c; ++k) {
      answer.words[k] = this.words[k] ;
  }
  var c2 = otherbitmap.words.length;
  for (var k = mcount; k < c2; ++k) {
      answer.words[k] = otherbitmap.words[k] ;
  }
  return answer;
};


// Computes the difference between this bitset and another one,
// a new bitmap is generated
FastBitSet.prototype.new_difference = function(otherbitmap) {
  return this.clone().difference(otherbitmap);// should be fast enough
};

// Computes the size union between this bitset and another one
FastBitSet.prototype.union_size = function(otherbitmap) {
  var mcount = Math.min(this.words.length,otherbitmap.words.length);
  var answer = 0 | 0;
  for (var k = 0 | 0; k < mcount; ++k) {
    answer += this.hammingWeight(this.words[k] | otherbitmap.words[k]);
  }
  if (this.words.length < otherbitmap.words.length) {
    var c = otherbitmap.words.length;
    for (var k = this.words.length ; k < c; ++k) {
      answer += this.hammingWeight(otherbitmap.words[k] | 0);
    }
  } else {
    var c = this.words.length;
    for (var k = otherbitmap.words.length ; k < c; ++k) {
      answer += this.hammingWeight(this.words[k] | 0);
    }
  }
  return answer;
};




///////////////

module.exports = FastBitSet;
