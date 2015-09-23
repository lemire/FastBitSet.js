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
ccc.intersection(b); // c will only contain elements that are in both c and b
c = b.clone(); // create a (deep) copy of b and assign it to c.
c.equals(b); // checks whether c and b are equal
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

starting difference query benchmark
FastBitSet (creates new bitset) x 1,350,470 ops/sec ±0.70% (92 runs sampled)
infusion.BitSet.js (creates new bitset) x 270,749 ops/sec ±0.18% (101 runs sampled)
tdegrunt.BitSet (inplace) x 3,354,404 ops/sec ±0.14% (103 runs sampled)
FastBitSet (inplace) x 5,936,672 ops/sec ±0.03% (103 runs sampled)
Fastest is FastBitSet (inplace)

starting intersection query benchmark
FastBitSet (creates new bitset) x 1,294,126 ops/sec ±0.70% (94 runs sampled)
infusion.BitSet.js (creates new bitset) x 460,626 ops/sec ±0.10% (99 runs sampled)
tdegrunt.BitSet (inplace) x 770,186 ops/sec ±0.05% (103 runs sampled)
FastBitSet (inplace) x 9,200,442 ops/sec ±0.01% (103 runs sampled)
mattkrick.fast-bitset x 1,037,943 ops/sec ±1.89% (76 runs sampled)
Fastest is FastBitSet (inplace)

starting union query benchmark
FastBitSet (creates new bitset) x 864,617 ops/sec ±0.39% (84 runs sampled)
infusion.BitSet.js (creates new bitset) x 32,713 ops/sec ±0.05% (103 runs sampled)
tdegrunt.BitSet (inplace) x 2,389,462 ops/sec ±0.01% (100 runs sampled)
FastBitSet (inplace) x 5,132,563 ops/sec ±0.26% (98 runs sampled)
mattkrick.fast-bitset x 1,015,149 ops/sec ±1.37% (75 runs sampled)
Fastest is FastBitSet (inplace)

starting cardinality benchmark
FastBitSet x 3,129,286 ops/sec ±0.01% (99 runs sampled)
infusion.BitSet.js x 840,577 ops/sec ±0.02% (104 runs sampled)
tdegrunt.BitSet x 52,787 ops/sec ±0.03% (102 runs sampled)
mattkrick.fast-bitset x 3,017,909 ops/sec ±0.03% (103 runs sampled)
Fastest is FastBitSet

starting dynamic bitmap creation benchmark
FastBitSet x 149,263 ops/sec ±0.71% (95 runs sampled)
infusion.BitSet.js x 136 ops/sec ±0.17% (89 runs sampled)
tdegrunt.BitSet x 81,576 ops/sec ±0.27% (101 runs sampled)
Fastest is FastBitSet

starting query benchmark
FastBitSet x 98,863,835 ops/sec ±0.76% (100 runs sampled)
infusion.BitSet.js x 66,693,854 ops/sec ±0.34% (100 runs sampled)
tdegrunt.BitSet x 85,174,406 ops/sec ±1.05% (100 runs sampled)
mattkrick.fast-bitset x 66,428,690 ops/sec ±0.01% (103 runs sampled)
Fastest is FastBitSet

starting array extraction benchmark
FastBitSet x 110,147 ops/sec ±0.07% (99 runs sampled)
mattkrick.fast-bitset x 39,115 ops/sec ±0.08% (103 runs sampled)
Fastest is FastBitSet

starting intersection cardinality query benchmark
FastBitSet (creates new bitset) x 695,762 ops/sec ±0.79% (97 runs sampled)
infusion.BitSet.js (creates new bitset) x 86,596 ops/sec ±0.09% (101 runs sampled)
FastBitSet (fast way) x 2,992,401 ops/sec ±0.01% (103 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 351,309 ops/sec ±1.87% (91 runs sampled)
Fastest is FastBitSet (fast way)

starting difference cardinality query benchmark
FastBitSet (creates new bitset) x 267,774 ops/sec ±1.51% (93 runs sampled)
infusion.BitSet.js (creates new bitset) x 34,177 ops/sec ±0.04% (102 runs sampled)
FastBitSet (fast way) x 2,837,819 ops/sec ±0.01% (103 runs sampled)
Fastest is FastBitSet (fast way)

starting union cardinality query benchmark
FastBitSet (creates new bitset) x 256,716 ops/sec ±1.55% (95 runs sampled)
infusion.BitSet.js (creates new bitset) x 30,536 ops/sec ±0.05% (103 runs sampled)
FastBitSet (fast way) x 1,570,416 ops/sec ±0.01% (99 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 347,972 ops/sec ±1.85% (91 runs sampled)
Fastest is FastBitSet (fast way)
```


