# FastBitSet.js : a speed-optimized BitSet implementation

A BitSet  (also called Bitmap or bit vector) is an ideal data structure to implement a
set when values being stored are reasonably small integers. It can be orders of magnitude
faster than a generic set implementation. Moreover, a BitSet has fast support for set
operations (union, difference, intersection).

The FastBitSet.js implementation optimizes for speed, leveraging commonly available features
like typed arrays. It can be several times faster than competitive alternatives. It should be supported by most of the modern browsers and JavaScript
engines.  It is ideal for maintaining sets of integers when performance matters.

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
FastBitSet (creates new bitset) x 1,137,548 ops/sec ±2.12% (95 runs sampled)
infusion.BitSet.js (creates new bitset) x 111,214 ops/sec ±0.43% (98 runs sampled)
mattkrick.fast-bitset x 938,172 ops/sec ±1.51% (85 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting difference query benchmark
FastBitSet (creates new bitset) x 1,219,467 ops/sec ±1.30% (88 runs sampled)
infusion.BitSet.js (creates new bitset) x 263,423 ops/sec ±0.12% (101 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting intersection query benchmark
FastBitSet (creates new bitset) x 1,270,896 ops/sec ±0.75% (94 runs sampled)
infusion.BitSet.js (creates new bitset) x 467,202 ops/sec ±0.11% (101 runs sampled)
mattkrick.fast-bitset x 967,824 ops/sec ±1.53% (84 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting cardinality benchmark
FastBitSet x 3,081,983 ops/sec ±0.03% (101 runs sampled)
infusion.BitSet.js x 878,217 ops/sec ±0.45% (100 runs sampled)
tdegrunt.BitSet x 50,023 ops/sec ±0.95% (102 runs sampled)
mattkrick.fast-bitset x 2,956,988 ops/sec ±0.12% (100 runs sampled)
Fastest is FastBitSet

starting dynamic bitmap creation benchmark
FastBitSet x 131,584 ops/sec ±0.80% (97 runs sampled)
infusion.BitSet.js x 138 ops/sec ±0.19% (91 runs sampled)
tdegrunt.BitSet x 79,739 ops/sec ±0.14% (103 runs sampled)
Fastest is FastBitSet

starting query benchmark
FastBitSet x 73,827,003 ops/sec ±0.33% (101 runs sampled)
infusion.BitSet.js x 55,090,584 ops/sec ±0.13% (104 runs sampled)
tdegrunt.BitSet x 63,382,411 ops/sec ±0.76% (101 runs sampled)
mattkrick.fast-bitset x 55,103,593 ops/sec ±0.10% (104 runs sampled)
Fastest is FastBitSet

starting array extraction benchmark
FastBitSet x 110,514 ops/sec ±0.26% (101 runs sampled)
mattkrick.fast-bitset x 39,521 ops/sec ±0.06% (104 runs sampled)
Fastest is FastBitSet

starting intersection cardinality query benchmark
FastBitSet (creates new bitset) x 785,111 ops/sec ±0.84% (91 runs sampled)
infusion.BitSet.js (creates new bitset) x 87,160 ops/sec ±0.20% (103 runs sampled)
FastBitSet (fast way) x 2,992,881 ops/sec ±0.02% (103 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 344,781 ops/sec ±2.00% (91 runs sampled)
Fastest is FastBitSet (fast way)

starting difference cardinality query benchmark
FastBitSet (creates new bitset) x 282,152 ops/sec ±1.33% (96 runs sampled)
infusion.BitSet.js (creates new bitset) x 34,128 ops/sec ±0.20% (104 runs sampled)
FastBitSet (fast way) x 2,828,535 ops/sec ±0.01% (104 runs sampled)
Fastest is FastBitSet (fast way)

starting union cardinality query benchmark
FastBitSet (creates new bitset) x 262,217 ops/sec ±1.72% (90 runs sampled)
infusion.BitSet.js (creates new bitset) x 30,510 ops/sec ±0.28% (101 runs sampled)
FastBitSet (fast way) x 1,570,118 ops/sec ±0.02% (102 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 345,827 ops/sec ±1.86% (88 runs sampled)
Fastest is FastBitSet (fast way)
```


