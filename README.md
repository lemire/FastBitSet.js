# FastBitSet.js : a speed-optimized BitSet implementation
[![Build Status](https://travis-ci.org/lemire/FastBitSet.js.png)](https://travis-ci.org/lemire/FastBitSet.js) 


A BitSet  (also called Bitmap or bit vector) is an ideal data structure to implement a
set when values being stored are reasonably small integers. It can be orders of magnitude
faster than a generic set implementation. Moreover, a BitSet has fast support for set
operations (union, difference, intersection).

The FastBitSet.js implementation optimizes for speed, leveraging commonly available features
like typed arrays. It can be several times faster than competitive alternatives. It should be supported by most of the modern browsers and JavaScript
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

Platform: linux 3.13.0-37-generic x64
Intel(R) Core(TM) i7-4770 CPU @ 3.40GHz
Node version 0.12.7, v8 version 3.28.71.19

starting union query benchmark
FastBitSet (creates new bitset) x 1,126,113 ops/sec ±1.63% (91 runs sampled)
infusion.BitSet.js (creates new bitset) x 113,010 ops/sec ±0.21% (103 runs sampled)
mattkrick.fast-bitset x 982,417 ops/sec ±1.36% (85 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting difference query benchmark
FastBitSet (creates new bitset) x 1,185,454 ops/sec ±0.92% (87 runs sampled)
infusion.BitSet.js (creates new bitset) x 268,052 ops/sec ±0.11% (99 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting intersection query benchmark
FastBitSet (creates new bitset) x 1,288,108 ops/sec ±0.68% (96 runs sampled)
infusion.BitSet.js (creates new bitset) x 473,104 ops/sec ±0.08% (102 runs sampled)
mattkrick.fast-bitset x 1,038,004 ops/sec ±1.59% (72 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting cardinality benchmark
FastBitSet x 3,125,424 ops/sec ±0.01% (101 runs sampled)
infusion.BitSet.js x 887,036 ops/sec ±0.01% (101 runs sampled)
tdegrunt.BitSet x 50,380 ops/sec ±0.12% (103 runs sampled)
mattkrick.fast-bitset x 3,008,909 ops/sec ±0.01% (101 runs sampled)
Fastest is FastBitSet

starting dynamic bitmap creation benchmark
FastBitSet x 101,167 ops/sec ±0.83% (96 runs sampled)
infusion.BitSet.js x 136 ops/sec ±0.23% (89 runs sampled)
tdegrunt.BitSet x 81,699 ops/sec ±0.32% (101 runs sampled)
Fastest is FastBitSet

starting query benchmark
FastBitSet x 96,509,705 ops/sec ±0.16% (100 runs sampled)
infusion.BitSet.js x 66,382,869 ops/sec ±0.01% (102 runs sampled)
tdegrunt.BitSet x 85,143,830 ops/sec ±0.00% (104 runs sampled)
mattkrick.fast-bitset x 66,533,843 ops/sec ±0.03% (103 runs sampled)
Fastest is FastBitSet

starting array extraction benchmark
FastBitSet x 120,811 ops/sec ±0.03% (104 runs sampled)
mattkrick.fast-bitset x 39,281 ops/sec ±0.07% (103 runs sampled)
Fastest is FastBitSet

starting intersection cardinality query benchmark
FastBitSet (creates new bitset) x 838,230 ops/sec ±0.89% (94 runs sampled)
infusion.BitSet.js (creates new bitset) x 86,757 ops/sec ±0.07% (101 runs sampled)
FastBitSet (fast way) x 2,980,066 ops/sec ±0.02% (104 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 353,979 ops/sec ±1.87% (90 runs sampled)
Fastest is FastBitSet (fast way)

starting difference cardinality query benchmark
FastBitSet (creates new bitset) x 269,864 ops/sec ±1.54% (94 runs sampled)
infusion.BitSet.js (creates new bitset) x 33,962 ops/sec ±0.08% (104 runs sampled)
FastBitSet (fast way) x 2,862,954 ops/sec ±0.03% (102 runs sampled)
Fastest is FastBitSet (fast way)

starting union cardinality query benchmark
FastBitSet (creates new bitset) x 259,224 ops/sec ±1.56% (94 runs sampled)
infusion.BitSet.js (creates new bitset) x 30,562 ops/sec ±0.14% (104 runs sampled)
FastBitSet (fast way) x 1,567,215 ops/sec ±0.01% (100 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 373,414 ops/sec ±1.64% (98 runs sampled)
Fastest is FastBitSet (fast way)

starting forEach benchmark
FastBitSet x 62,065 ops/sec ±0.12% (104 runs sampled)
FastBitSet (via array) x 13,531 ops/sec ±0.02% (103 runs sampled)
mattkrick.fast-bitset x 37,866 ops/sec ±0.02% (90 runs sampled)
Fastest is FastBitSet

```


