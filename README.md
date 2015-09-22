# FastBitSet.js : a speed-optimized BitSet implementation

A BitSet  (also called Bitmap or bit vector) is an ideal data structure to implement a
set when values being stored are reasonably small integers. It can be orders of magnitude
faster than an generic set implementation. Moreover, a BitSet has fast support for set
operations (union, difference, intersection).

The FastBitSet.js implementation optimizes for speed, leveraging commonly available features
like typed arrays. It should be supported by most of the modern browsers and JavaScript
engines.  It is ideal for maintaining sets of integers when performance matters.


Is it faster?
===

It can be quite fast compared to competitive alternatives :

     FastBitSet.js/benchmark$ nodejs test.js

     starting difference query benchmark
     FastBitSet x 1,446,097 ops/sec ±1.17% (93 runs sampled)
     BitSet x 270,655 ops/sec ±0.25% (102 runs sampled)
     Fastest is FastBitSet

     starting intersection query benchmark
     FastBitSet x 1,197,440 ops/sec ±1.67% (90 runs sampled)
     BitSet x 481,867 ops/sec ±0.06% (103 runs sampled)
     Fastest is FastBitSet

     starting union query benchmark
     FastBitSet x 465,480 ops/sec ±2.61% (73 runs sampled)
     BitSet x 112,931 ops/sec ±0.35% (104 runs sampled)
     Fastest is FastBitSet
     
     starting cardinality benchmark
     FastBitSet x 2,619,372 ops/sec ±0.02% (101 runs sampled)
     BitSet x 886,358 ops/sec ±0.21% (100 runs sampled)
     Fastest is FastBitSet
     
     starting bitmap creation benchmark
     FastBitSet x 95,298 ops/sec ±0.18% (99 runs sampled)
     BitSet x 137 ops/sec ±0.75% (23 runs sampled)
     Fastest is FastBitSet

     starting query benchmark     
     FastBitSet x 80,480,295 ops/sec ±0.23% (104 runs sampled)
     BitSet x 64,405,701 ops/sec ±0.34% (93 runs sampled)
     Fastest is FastBitSet

(The BitSet package is available at https://github.com/infusion/BitSet.js.) 

Usage
===

```javascript
var b = new FastBitSet();// initially empty
         // will throw exception if typed arrays are not supported
b.set(1);// add the value "1"
b.has(1); // check that the value is present! (will return true)
b.add(2);
console.log(""+b);// should display {1,2}
b.add(10);
b.array(); // would return [1,2,10]
var c = new FastBitSet([1,2,3,10]); // create bitset initialized with values 1,2,3,10
c.difference(b); // from c, remove elements that are in b
var su = c.union_size(b);// compute the size of the union (bitsets are unchanged)
c.union(b); // c will contain all elements that are in c and b
var s1 = c.intersection_size(b);// compute the size of the intersection (bitsets are unchanged)
c.intersection(b); // c will only contain elements that are in both c and b
c = b.clone(); // create a (deep) copy of b and assign it to c.
c.equals(b); // check whether c and b are equal
```

If you are using node.js, you need to import the module:

```javascript
var FastBitSet = require("FastBitSet");
var b = new FastBitSet();// initially empty
         // will throw exception if typed arrays are not supported
b.set(1);// add the value "1"
```
npm install
===

      $ npm install fastbitset

Testing
===

Using node.js, you can test the code as follows...

      $ nodejs unit/basictests.js



