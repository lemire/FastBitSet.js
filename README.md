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
FastBitSet (creates new bitset) x 1,362,972 ops/sec ±1.10% (95 runs sampled)
infusion.BitSet.js (creates new bitset) x 269,766 ops/sec ±0.23% (100 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting intersection query benchmark
FastBitSet (creates new bitset) x 1,441,799 ops/sec ±0.96% (97 runs sampled)
infusion.BitSet.js (creates new bitset) x 469,505 ops/sec ±0.06% (103 runs sampled)
mattkrick.fast-bitset x 1,019,280 ops/sec ±1.86% (73 runs sampled)
Fastest is FastBitSet (creates new bitset)

starting union query benchmark
FastBitSet (creates new bitset) x 853,290 ops/sec ±0.55% (86 runs sampled)
infusion.BitSet.js (creates new bitset) x 32,853 ops/sec ±0.13% (103 runs sampled)
mattkrick.fast-bitset x 1,015,855 ops/sec ±1.47% (84 runs sampled)
Fastest is mattkrick.fast-bitset

starting cardinality benchmark
FastBitSet x 3,090,980 ops/sec ±0.02% (99 runs sampled)
infusion.BitSet.js x 838,591 ops/sec ±0.01% (103 runs sampled)
tdegrunt.BitSet x 49,891 ops/sec ±1.03% (102 runs sampled)
mattkrick.fast-bitset x 3,005,428 ops/sec ±0.14% (96 runs sampled)
Fastest is FastBitSet

starting dynamic bitmap creation benchmark
FastBitSet x 126,911 ops/sec ±0.71% (97 runs sampled)
infusion.BitSet.js x 137 ops/sec ±0.11% (90 runs sampled)
tdegrunt.BitSet x 82,037 ops/sec ±0.43% (103 runs sampled)
Fastest is FastBitSet

starting query benchmark
FastBitSet x 102,233,719 ops/sec ±0.15% (102 runs sampled)
infusion.BitSet.js x 70,532,879 ops/sec ±0.03% (97 runs sampled)
tdegrunt.BitSet x 86,785,551 ops/sec ±0.49% (100 runs sampled)
mattkrick.fast-bitset x 66,365,457 ops/sec ±0.09% (104 runs sampled)
Fastest is FastBitSet

starting array extraction benchmark
FastBitSet x 110,708 ops/sec ±0.07% (99 runs sampled)
mattkrick.fast-bitset x 39,184 ops/sec ±0.07% (104 runs sampled)
Fastest is FastBitSet

starting intersection cardinality query benchmark
FastBitSet (creates new bitset) x 686,508 ops/sec ±0.73% (95 runs sampled)
infusion.BitSet.js (creates new bitset) x 86,017 ops/sec ±0.09% (101 runs sampled)
FastBitSet (fast way) x 3,001,023 ops/sec ±0.01% (103 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 347,947 ops/sec ±1.99% (88 runs sampled)
Fastest is FastBitSet (fast way)

starting difference cardinality query benchmark
FastBitSet (creates new bitset) x 272,176 ops/sec ±1.26% (99 runs sampled)
infusion.BitSet.js (creates new bitset) x 33,460 ops/sec ±0.27% (101 runs sampled)
FastBitSet (fast way) x 2,861,384 ops/sec ±0.01% (98 runs sampled)
Fastest is FastBitSet (fast way)

starting union cardinality query benchmark
FastBitSet (creates new bitset) x 256,153 ops/sec ±1.54% (94 runs sampled)
infusion.BitSet.js (creates new bitset) x 30,531 ops/sec ±0.06% (104 runs sampled)
FastBitSet (fast way) x 1,569,892 ops/sec ±0.01% (102 runs sampled)
mattkrick.fast-bitset (creates new bitset) x 349,363 ops/sec ±1.85% (92 runs sampled)
Fastest is FastBitSet (fast way)

```


