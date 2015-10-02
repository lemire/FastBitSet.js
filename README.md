# FastBitSet.js : a speed-optimized BitSet implementation
[![Build Status](https://travis-ci.org/lemire/FastBitSet.js.png)](https://travis-ci.org/lemire/FastBitSet.js) 


A BitSet  (also called Bitmap or bit vector) is an ideal data structure to implement a
set when values being stored are reasonably small integers. It can be orders of magnitude
faster than a generic set implementation. In particular, a BitSet has fast support for set
operations (union, difference, intersection).

The FastBitSet.js implementation optimizes for speed, leveraging commonly available features
like typed arrays. It can be several times faster than competitive alternatives.It is also entirely dynamic, and has functions to minimize the memory usage. It should be supported by most of the modern browsers and JavaScript
engines.  It is ideal for maintaining sets of integers when performance matters.

License: Apache License 2.0



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
var out1 = c.new_union(b); // creates a new bitmap that contains everything in c and b 
var out2 = c.new_intersection(b); // creates a new bitmap that contains everything that is in both c and b 
var s1 = c.intersection_size(b);// compute the size of the intersection (bitsets are unchanged)
var s3 = c.difference_size(b);// compute the size of the difference (bitsets are unchanged)
c.intersection(b); // c will only contain elements that are in both c and b
c = b.clone(); // create a (deep) copy of b and assign it to c.
c.equals(b); // checks whether c and b are equal
c.forEach(fnc); // execute fnc on each value stored in c
c.trim(); // reduce the memory usage of the bitmap if possible, the content remains the same 
```

If you are using node.js, you need to import the module:

```javascript
var FastBitSet = require("fastbitset");
var b = new FastBitSet();// initially empty
         // will throw exception if typed arrays are not supported
b.set(1);// add the value "1"
```
npm install
===

      $ npm install fastbitset

Testing
===

Using node.js (npm), you can test the code as follows...

      $ npm install mocha
      $ npm test



Is it faster?
===

It can be quite fast compared to competitive alternatives :

```bash
FastBitSet.js/benchmark$ nodejs test.js

Benchmarking against:
infusion.BitSet.js from https://github.com/infusion/BitSet.js
tdegrunt.BitSet from https://github.com/tdegrunt/bitset
mattkrick.fast-bitset from https://github.com/mattkrick/fast-bitset
standard Set object from JavaScript

Platform: linux 3.13.0-37-generic x64
Intel(R) Core(TM) i7-4770 CPU @ 3.40GHz
Node version 0.12.7, v8 version 3.28.71.19

starting union query benchmark
FastBitSet (creates new bitset) x 1,059,329 ops/sec ±1.63% (94 runs sampled)
infusion.BitSet.js (creates new bitset) x 111,575 ops/sec ±0.23% (98 runs sampled)
mattkrick.fast-bitset x 963,081 ops/sec ±1.48% (85 runs sampled)
Set x 4,299 ops/sec ±0.86% (103 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting difference query benchmark
FastBitSet (creates new bitset) x 1,134,221 ops/sec ±2.08% (87 runs sampled)
infusion.BitSet.js (creates new bitset) x 262,910 ops/sec ±0.22% (100 runs sampled)
Set x 4,484 ops/sec ±5.63% (97 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting intersection query benchmark
FastBitSet (creates new bitset) x 1,195,934 ops/sec ±6.30% (82 runs sampled)
infusion.BitSet.js (creates new bitset) x 461,049 ops/sec ±0.21% (102 runs sampled)
mattkrick.fast-bitset x 1,106,872 ops/sec ±3.13% (85 runs sampled)
Set x 6,996 ops/sec ±4.13% (72 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting cardinality benchmark
FastBitSet x 1,858,399 ops/sec ±76.97% (93 runs sampled)
infusion.BitSet.js x 631,213 ops/sec ±52.27% (97 runs sampled)
tdegrunt.BitSet x 46,242 ops/sec ±12.42% (81 runs sampled)
mattkrick.fast-bitset x 1,744,646 ops/sec ±68.94% (62 runs sampled)
Fastest is FastBitSet

starting dynamic bitmap creation benchmark
FastBitSet x 100,637 ops/sec ±13.72% (96 runs sampled)
infusion.BitSet.js x 77.31 ops/sec ±56.82% (63 runs sampled)
tdegrunt.BitSet x 67,604 ops/sec ±21.10% (89 runs sampled)
Set x 13,169 ops/sec ±2.83% (44 runs sampled)
Fastest is FastBitSet

starting query benchmark
FastBitSet x 97,013,268 ops/sec ±2.12% (96 runs sampled)
infusion.BitSet.js x 66,277,157 ops/sec ±0.08% (100 runs sampled)
tdegrunt.BitSet x 8,687,183 ops/sec ±175.32% (98 runs sampled)
mattkrick.fast-bitset x 2,394,261 ops/sec ±135.91% (101 runs sampled)
Set x 3,843,593 ops/sec ±166.85% (72 runs sampled)
Fastest is FastBitSet

starting array extraction benchmark
FastBitSet x 114,345 ops/sec ±10.30% (98 runs sampled)
mattkrick.fast-bitset x 37,012 ops/sec ±8.92% (98 runs sampled)
Fastest is FastBitSet

starting intersection cardinality query benchmark
FastBitSet (creates new bitset) x 581,507 ops/sec ±23.37% (83 runs sampled)
infusion.BitSet.js (creates new bitset) x 77,373 ops/sec ±10.72% (96 runs sampled)
FastBitSet (fast way) x 2,986,941 ops/sec ±0.09% (100 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 215,548 ops/sec ±56.41% (61 runs sampled)
Set x 9,387 ops/sec ±18.73% (92 runs sampled)
Fastest is FastBitSet (fast way)

starting difference cardinality query benchmark
FastBitSet (creates new bitset) x 267,307 ops/sec ±2.73% (94 runs sampled)
infusion.BitSet.js (creates new bitset) x 31,072 ops/sec ±11.81% (95 runs sampled)
FastBitSet (fast way) x 2,390,630 ops/sec ±0.10% (103 runs sampled)
Set x 10,716 ops/sec ±0.14% (102 runs sampled)
Fastest is FastBitSet (fast way)

starting union cardinality query benchmark
FastBitSet (creates new bitset) x 213,982 ops/sec ±35.74% (87 runs sampled)
infusion.BitSet.js (creates new bitset) x 24,536 ops/sec ±29.03% (102 runs sampled)
FastBitSet (fast way) x 1,026,235 ops/sec ±53.50% (99 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 251,787 ops/sec ±38.72% (58 runs sampled)
Set x 9,418 ops/sec ±22.39% (100 runs sampled)
Fastest is FastBitSet (fast way)

starting forEach benchmark
FastBitSet x 59,769 ops/sec ±4.36% (102 runs sampled)
FastBitSet (via array) x 12,943 ops/sec ±6.45% (102 runs sampled)
mattkrick.fast-bitset x 36,461 ops/sec ±6.84% (100 runs sampled)
Set x 35,978 ops/sec ±8.19% (100 runs sampled)
Fastest is FastBitSet
```

You might also like...
===

If you like this library, you might also like https://github.com/lemire/FastPriorityQueue.js
