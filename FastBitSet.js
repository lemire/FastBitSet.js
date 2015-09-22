/**
 * FastBitSet.js : a fast bit set implementation in JavaScript.
 * (c) the authors
 * Licensed under the Apache License, Version 2.0.
 *
 * Speed-optimized BitSet implementation for modern browsers and JavaScript engines.
 *
 * A BitSet is an ideal data structure to implement a Set when values being stored are
 * reasonably small integers. It can be orders of magnitude faster than an generic Set implementation.
 * The FastBitSet implementation optimizes for speed, leveraging commonly available features
 * like typed arrays.
 *
 * Simple usage :
 *
 *  var b = new FastBitSet();// initially empty
 *         // will throw exception if typed arrays are not supported
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
 */
"use strict";

function isIterable(obj) {
    if (obj == null) {
        return false
    }
    return obj[Symbol.iterator] !== undefined
}
// you can provide an iterable
// an exception is thrown if typed arrays are not supported
function FastBitSet (iterable) {
    if(typeof Uint32Array === 'function') {
        this.count = 0|0;
        if(isIterable(iterable)) {
            this.words = new Uint32Array(4);
            for (var key of iterable) {
                this.add(key);
            }
        } else {
            this.words = new Uint32Array(0);
        }
    } else {
        console.log("Your JavaScript engine does not support typed arrays.");
        throw "Uint32Array unsupported";
    }
}
FastBitSet.prototype[Symbol.iterator] = 1;



FastBitSet.prototype.WORD_SIZE = 32|0;



// Set the bit at index to true
FastBitSet.prototype.add = function(index) {
    if(this.count * this.WORD_SIZE <= index) {
        this.resize(index)
    }
    this.words[(index / this.WORD_SIZE)|0] |= 1 << (index % this.WORD_SIZE);
};

// Remove all values
FastBitSet.prototype.clear = function() {
    this.count = 0|0;
    this.words = new Uint32Array(count);
};


// Set the bit at index to false
FastBitSet.prototype.remove = function(index) {
    if(this.count * this.WORD_SIZE <= index) {
        this.resize(index)
    }
    this.words[(index / this.WORD_SIZE)|0] &= ~(1 << (index % this.WORD_SIZE));
};

// Return true if no bit is set
FastBitSet.prototype.isEmpty = function(index) {
    for( var  i = 0; i < this.count; i++) {
        if(this.words[i] !== 0) return false;
    }
    return true;
};




// Is the bit at index true or false? Returns a boolean
FastBitSet.prototype.has = function(index) {
    if(this.count * this.WORD_SIZE <= index) {
        return false;
    }
    var mask = (1 << (index % this.WORD_SIZE))|0;
    return (this.words[(index / this.WORD_SIZE)|0] & mask) !== 0;
};

// Resize the bitset so that we can write a value at index
FastBitSet.prototype.resize = function(index) {
    if(this.count * this.WORD_SIZE > index) {
        return; //nothing to do
    }
    this.count = (index + this.WORD_SIZE) / this.WORD_SIZE | 0;
    if(this.words.length * this.WORD_SIZE <= index) {
        var newsize  = this.count;
        if(newsize  < 1024) {
            newsize  = newsize  * 2;
        } else if(newsize  < 4096) {
            newsize  = 3 * newsize  / 2;
        } else {
            newsize  = 4 * newsize  / 5;
        }
        var newwords = new Uint32Array(newsize);
        newwords.set(this.words);
        this.words = newwords;
    }

};


// fast function to compute the Hamming weight of a 32-bit unsigned integer
FastBitSet.prototype.hamming_weight = function(x) {
    x = x | 0;
    x -= ((x >>> 1) & 0x55555555);
    var m2 = 0x33333333;
    x = (x & m2) + ((x >> 2) & m2);
    x = (x + (x >> 4)) & 0x0f0f0f0f;
    x += x >> 8;
    x += x >> 16;
    return x & 0x3f;
}

// How many set bits?
FastBitSet.prototype.size = function() {
    var answer = 0|0;
    var c = this.count|0;
    for( var  i = 0|0; i < c; i++) {
        var x = this.words[i];
        x -= ((x >>> 1) & (0x55555555|0));
        var m2 = (0x33333333|0);
        x = (x & m2) + ((x >> 2) & m2);
        x = (x + (x >> 4)) & (0x0f0f0f0f|0);
        x += x >> 8;
        x += x >> 16;
        answer += x & 0x3f;
    }
    return answer;
};

// Return an array with the set bit locations (values)
// an iterator would be preferable but JavaScript is still too immature
FastBitSet.prototype.array = function() {
    var answer = new Array(this.size());
    var pos = 0|0;
    var c = this.count|0;
    for (var k = 0|0; k < c; ++k) {
        var w =  this.words[k];
        while (w != 0) {
            var t = w & -w;
            // could be faster by inlining hamming_weight
            answer[pos++] = k * this.WORD_SIZE + this.hamming_weight(t - 1);
            w ^= t;
        }
    }
    return answer;
};


// Computes the intersection between this bitset and another one,
// the current bitmap is modified
FastBitSet.prototype.clone = function() {
    var clone = Object.create(FastBitSet.prototype);
    clone.count = this.count;
    clone.words = new Uint32Array(this.words);
    return clone;
};

// Computes the intersection between this bitset and another one,
// the current bitmap is modified
FastBitSet.prototype.intersection = function(otherbitmap) {
    var newcount = Math.min(this.count,otherbitmap.count);
    for (var k = 0|0; k < newcount; ++k) {
        this.words[k] &= otherbitmap.words[k];
    }
    for (var k = newcount; k < this.count; ++k) {
        this.words[k] = 0;
    }
    this.count = newcount;
};

// Computes the size of the intersection between this bitset and another one
FastBitSet.prototype.intersection_size = function(otherbitmap) {
    var newcount = Math.min(this.count,otherbitmap.count);
    var answer = 0|0;
    for (var k = 0|0; k < newcount; ++k) {
        // could run faster by inlining hamming_weight
        answer += this.hamming_weight(this.words[k] & otherbitmap.words[k]);
    }
    return answer;
};

// Computes the intersection between this bitset and another one,
// the current bitmap is modified
FastBitSet.prototype.equals = function(otherbitmap) {
    if(this.count != otherbitmap.count) return false;
    for (var k = 0|0; k < this.count; ++k) {
        if(this.words[k] != otherbitmap.words[k]) return false;
    }
    return true;
};


// Computes the difference between this bitset and another one,
// the current bitset is modified
FastBitSet.prototype.difference = function(otherbitmap) {
    var newcount = Math.min(this.count,otherbitmap.count);
    for (var k = 0|0; k < newcount; ++k) {
        this.words[k] &= ~otherbitmap.words[k];
    }
};

// Returns a string representation
FastBitSet.prototype.toString = function() {
    return "{"+this.array().join(",")+"}";
};

// Computes the union between this bitset and another one,
// the current bitset is modified
FastBitSet.prototype.union = function(otherbitmap) {
    var mcount = Math.min(this.count,otherbitmap.count);
    for (var k = 0|0; k < mcount; ++k) {
        this.words[k] |= otherbitmap.words[k];
    }
    if(this.count < otherbitmap.count) {
        this.resize(otherbitmap.count * this.WORD_SIZE - 1);
        var sl = otherbitmap.words.subarray(mcount,otherbitmap.count);
        this.words.set(sl,mcount);
        this.count = otherbitmap.count;
    }
};
// Computes the size union between this bitset and another one
FastBitSet.prototype.union_size = function(otherbitmap) {
    var mcount = Math.min(this.count,otherbitmap.count);
    var answer = 0|0;
    for (var k = 0|0; k < mcount; ++k) {
        // could run faster by inlining hamming_weight
        answer += this.hamming_weight(this.words[k] | otherbitmap.words[k]);
    }
    if(this.count < otherbitmap.count) {
        for(var k = mcount ; k < otherbitmap.count; ++k) {
            // could inline hamming weight call for speed
            answer += this.hamming_weight(otherbitmap.words[k]);
        }
    } else {
        for(var k = mcount ; k < this.count; ++k) {
            // could inline hamming weight for speed
            answer += this.hamming_weight(this.words[k]);
        }
    }
    return answer;
};


module['exports'] = FastBitSet;
